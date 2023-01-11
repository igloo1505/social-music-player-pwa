import { useEffect, useState } from "react";
import { AudioLoader } from "three";
import { PositionalAudio, AudioListener } from "three";
import { useThree, RootState, useLoader } from "@react-three/fiber";
import { connect } from "react-redux";
import { RootState as AppRootState } from "../../state/store";
import store from "../../state/store";
import Position from "../../types/Position";
import { audioEnum, positionEnum } from "../../state/positionArray";

const connector = connect((state: AppRootState, props) => ({
	muted: state.three.audioMuted,
}));

const getPositionalAudioElement = (
	three: RootState,
	currentAudioBuffer: audioEnum
): PositionalAudio | undefined => {
	const audioKeys = Object.keys(audioEnum);
	const audioValues = Object.values(audioEnum);
	const positionalAudio = three.scene.getObjectByName(
		`positional-audio-${audioKeys[audioValues.indexOf(currentAudioBuffer)]}`
	);
	console.log(
		"positionalAudio in questionable indexing method: ",
		positionalAudio
	);
	return positionalAudio as PositionalAudio | undefined;
};

export const audioShouldPlay = (
	shouldPlay: boolean,
	three: RootState,
	currentAudioBuffer: audioEnum,
	previousAudioBuffer: audioEnum,
	shouldLoop: boolean
) => {
	// TODO: loop through array and mute all PositionalAudioElements incase a transition occurs at an awkward time and results in multiple playing at once.
	// let em = getAudioElement();
	// TODO: handle looping appropriately here
	const loop = typeof shouldLoop === "undefined" ? false : shouldLoop;
	let curPositionalAudio = getPositionalAudioElement(three, currentAudioBuffer);
	let prevPositionalAudio = getPositionalAudioElement(
		three,
		previousAudioBuffer
	);
	// debugger;
	// if (!em) return;
	if (shouldPlay) {
		// em.play();
		console.log("Setting play to true");
		prevPositionalAudio?.pause();
		curPositionalAudio && (curPositionalAudio.loop = loop);
		curPositionalAudio?.play();
	}
	if (!shouldPlay) {
		// em.pause();
		console.log("Setting play to false");
		curPositionalAudio?.pause();
		prevPositionalAudio?.pause();
	}
};

const genPositionalAudio = (
	audioListener: AudioListener,
	name: string,
	buffer: AudioBuffer
) => {
	const positionalAudio = new PositionalAudio(audioListener);
	positionalAudio.name = `positional-audio-${name}`;
	positionalAudio.autoplay = false;
	positionalAudio.loop = true;
	positionalAudio.setBuffer(buffer);
	positionalAudio.setRefDistance(1);
	positionalAudio.setRolloffFactor(20);
	positionalAudio.setMaxDistance(100);
	return positionalAudio;
};

export const initAudio = (three: RootState, buffers: AudioBuffer[]) => {
	const audioListener = new AudioListener();
	three.camera.add(audioListener);
	const audioNames = Object.keys(audioEnum);
	buffers.forEach((buffer, i) => {
		const positionalAudio = genPositionalAudio(
			audioListener,
			audioNames[i],
			buffer
		);
		let spaceShip = three.scene.getObjectByName("curious-spaceShip");
		if (spaceShip) {
			spaceShip?.add(positionalAudio);
		}
	});
	store.dispatch({
		type: "SET-AUDIO-INITIALIZED",
	});
};

interface AudioManagerProps {
	muted: boolean;
	currentPosition: Position;
	currentAudioBuffer: audioEnum;
	setBuffer: (bufferKey: audioEnum) => void;
}

export const AudioManager = connector(
	({
		muted,
		currentPosition,
		currentAudioBuffer,
		setBuffer,
	}: AudioManagerProps) => {
		const three = useThree();
		const [allBuffers, setAllBuffers] = useState<AudioBuffer[]>(null!);
		const allBufferPaths = Object.values(audioEnum);
		const _allBuffers = useLoader(AudioLoader, allBufferPaths);
		const [isInitialBuffer, setIsInitialBuffer] = useState(true);
		const [shouldLoop, setShouldLoop] = useState(false);
		const [previousAudioBufferKey, setPreviousAudioBufferKey] =
			useState<audioEnum>(null!);
		useEffect(() => {
			audioShouldPlay(
				!muted,
				three,
				currentAudioBuffer,
				previousAudioBufferKey,
				shouldLoop
			);
			!isInitialBuffer && setPreviousAudioBufferKey(currentAudioBuffer);
			isInitialBuffer && setIsInitialBuffer(false);
		}, [currentAudioBuffer, muted, shouldLoop]);
		useEffect(() => {
			if (currentPosition.stay) return;
			const totalPeriod = currentPosition.getTotalPeriod();
			const periods = {
				...(currentPosition.audioProps?.preExitAudioPath &&
					currentPosition.audioProps?.preExitPeriod && {
						preExit: currentPosition.audioProps?.exitAudioPeriod
							? totalPeriod -
							  currentPosition.audioProps?.preExitPeriod -
							  currentPosition.audioProps.exitAudioPeriod
							: totalPeriod - currentPosition.audioProps?.preExitPeriod,
					}),
				...(currentPosition.audioProps?.exitAudioPath &&
					currentPosition.audioProps?.exitAudioPeriod && {
						exit: totalPeriod - currentPosition.audioProps?.exitAudioPeriod,
					}),
			};
			if (currentPosition.audioProps?.entranceAudioPath) {
				// setTimeout(() => {
				// 	// setBuffer(position.audioProps?.mainAudioPath!);
				// }, periods.entrance);
				setBuffer(currentPosition.audioProps?.entranceAudioPath!);
				typeof currentPosition.audioProps?.loopEntrance !== "undefined" &&
					setShouldLoop(currentPosition.audioProps?.loopEntrance);
			}
			if (periods.preExit) {
				setTimeout(() => {
					setBuffer(currentPosition.audioProps?.preExitAudioPath!);
					typeof currentPosition.audioProps?.loopPreExit !== "undefined" &&
						setShouldLoop(currentPosition.audioProps?.loopPreExit);
				}, periods.preExit as number);
			}
			if (periods.exit) {
				setTimeout(() => {
					setBuffer(currentPosition.audioProps?.exitAudioPath!);
					typeof currentPosition.audioProps?.loopExit !== "undefined" &&
						setShouldLoop(currentPosition.audioProps?.loopExit);
				}, periods.exit);
			}
			if (currentPosition.audioProps?.mainAudioPath) {
				setTimeout(() => {
					setBuffer(currentPosition.audioProps?.mainAudioPath!);
					typeof currentPosition.audioProps?.loopMain !== "undefined" &&
						setShouldLoop(currentPosition.audioProps?.loopMain);
				}, currentPosition.audioProps.entranceAudioPeriod || 0);
			}
		}, [currentPosition]);
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
		return <group></group>;
	}
);
