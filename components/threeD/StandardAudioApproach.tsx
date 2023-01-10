import { useEffect, useState } from "react";
import { AudioLoader, Event } from "three";
import { Object3D, Scene, PositionalAudio, AudioListener } from "three";
import { useThree, RootState, useLoader } from "@react-three/fiber";
import { audioEnum, positionEnum, hoverPosition } from "./CuriousSpaceship";
import { connect } from "react-redux";
import { RootState as AppRootState } from "../../state/store";

const defaultAudioIndex = 6;
const connector = connect((state: AppRootState, props) => ({
	muted: state.three.audioMuted,
}));

const getPositionalAudioElement = (
	three: RootState
): PositionalAudio | undefined => {
	const positionalAudio = three.scene.getObjectByName("positional-audio");
	return positionalAudio as PositionalAudio | undefined;
};

export const setBuffer = ({
	three,
	buffers,
	bufferIndex,
	bufferPath,
	positionalAudio,
}: {
	three: RootState;
	buffers: AudioBuffer[];
	bufferIndex?: number;
	bufferPath?: audioEnum;
	positionalAudio?: PositionalAudio;
}) => {
	console.log("Setting buffer: ", bufferPath);
	let audio = positionalAudio;
	if (!audio) {
		audio = getPositionalAudioElement(three);
	}
	let buffer = bufferIndex
		? buffers[bufferIndex]
		: bufferPath
		? buffers[Object.values(audioEnum).indexOf(bufferPath)]
		: buffers[defaultAudioIndex];
	console.log("selected buffer: ", buffer);
	audio?.setBuffer(buffer);
	//TODO:  Unfinished, needws testing
};

export const audioShouldPlay = (shouldPlay: boolean, three: RootState) => {
	// let em = getAudioElement();
	let positionalAudio = getPositionalAudioElement(three);
	// if (!em) return;
	if (shouldPlay) {
		// em.play();
		console.log("Setting play to true");
		positionalAudio?.play();
	}
	if (!shouldPlay) {
		// em.pause();
		console.log("Setting play to false");
		positionalAudio?.pause();
	}
};

export const initAudio = (three: RootState, buffers: AudioBuffer[]) => {
	console.log("buffers: ", buffers);
	const audioListener = new AudioListener();
	three.camera.add(audioListener);
	const positionalAudio = new PositionalAudio(audioListener);
	positionalAudio.name = "positional-audio";
	positionalAudio.autoplay = false;
	positionalAudio.loop = true;
	positionalAudio.setBuffer(buffers[defaultAudioIndex]);
	positionalAudio.setRefDistance(1);
	positionalAudio.setRolloffFactor(20);
	positionalAudio.setMaxDistance(100);
	let spaceShip = three.scene.getObjectByName("curious-spaceShip");
	spaceShip?.add(positionalAudio);
};

interface AudioManagerProps {
	muted: boolean;
	currentState: positionEnum;
	positions: {
		curiouslyHover: hoverPosition;
		upClose: hoverPosition;
		pauseBeforeTakeoff: hoverPosition;
		goProbePeople: hoverPosition;
		hideDarkside: hoverPosition;
	};
}

export const AudioManager = connector(
	({ muted, positions, currentState }: AudioManagerProps) => {
		const three = useThree();
		const [allBuffers, setAllBuffers] = useState<AudioBuffer[]>(null!);
		const allBufferPaths = Object.values(audioEnum);
		const _allBuffers = useLoader(AudioLoader, allBufferPaths);
		useEffect(() => {
			if (currentState === positionEnum.stay) return;
			let position = positions[currentState];
			if (!position) return;
			// debugger;
			const defaultSetBufferProps = {
				three: three,
				buffers: allBuffers,
			};
			if (position.audioProps?.entranceAudioPath) {
				setBuffer({
					...defaultSetBufferProps,
					bufferPath: position.audioProps.entranceAudioPath,
				});
				setTimeout(() => {
					if (position.audioProps?.mainAudioPath) {
						setBuffer({
							...defaultSetBufferProps,
							bufferPath: position.audioProps.mainAudioPath,
						});
					}
				}, position.audioProps.entranceAudioPeriod || position.entranceDuration || 1000);
			}
			if (
				position.audioProps?.preExitAudioPath &&
				position.audioProps?.preExitPeriod
			) {
				setTimeout(() => {
					setBuffer({
						...defaultSetBufferProps,
						bufferPath: position.audioProps?.preExitAudioPath,
					});
				}, position.audioProps?.preExitPeriod);
			}
			if (
				position.audioProps?.exitAudioPath &&
				position.audioProps.exitAudioPeriod
			) {
				setTimeout(() => {
					setBuffer({
						...defaultSetBufferProps,
						bufferPath: position.audioProps?.exitAudioPath,
					});
				}, position.audioProps?.exitAudioPeriod);
			}
		}, [currentState]);
		useEffect(() => {
			if (_allBuffers) {
				console.log("Setting all buffers");
				setAllBuffers(_allBuffers);
			}
		}, [_allBuffers]);
		useEffect(() => {
			if (allBuffers) {
				console.log("initializing audio");
				initAudio(three, allBuffers);
			}
		}, [allBuffers]);
		useEffect(() => {
			audioShouldPlay(!muted, three);
		}, [muted]);
		return <group></group>;
	}
);
