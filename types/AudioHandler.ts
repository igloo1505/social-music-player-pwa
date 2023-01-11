import { RootState } from "@react-three/fiber";
import { AudioListener, PositionalAudio } from "three";
import store from "../state/store";
import Position from "./Position";

export enum audioEnum {
	// decompress = "threeJs/audio/ChamberDecompressing.mp3",
	laserBlast = "threeJs/audio/LaserBlasts.mp3",
	powerUp = "threeJs/audio/Power-Up.mp3",
	// takeoff = "threeJs/audio/Spaceship_Takeoff.mp3",
	// cruising = "threeJs/audio/spaceship-cruising.mp3",
	// landing = "threeJs/audio/ufo-landing.mp3",
	ufoSoundEffect = "threeJs/audio/ufo-sound-effect.mp3",
	pulse = "threeJs/audio/ufo_pulse.mp3",
}

// type AudioHandlerType = {
// 	buffers?: AudioBuffer[];
// 	currentBufferKey?: audioEnum;
// 	previousBufferKey?: audioEnum;
// 	currentPosition: Position;
// 	positionalAudioElements?: PositionalAudio[];
// 	isInitialBuffer?: boolean;
// };

class AudioHandler {
	buffers?: AudioBuffer[];
	currentBufferKey?: audioEnum;
	previousBufferKey?: audioEnum;
	protected positionalAudioElements?: PositionalAudio[] = [];
	protected isInitialBuffer?: boolean = true;
	loop?: {
		preExit?: boolean;
		exit?: boolean;
		entrance?: boolean;
		main?: boolean;
	};
	currentPosition: Position;
	audioKeys = Object.keys(audioEnum);
	audioValues = Object.values(audioEnum);
	constructor(currentPosition: Position) {
		this.currentPosition = currentPosition;
	}
	updateCurrentPosition(position: Position) {
		this.isInitialBuffer = false;
		this.currentPosition = position;
		this.__setLoopContext();
	}
	setAudioBuffers(buffers: AudioBuffer[], three: RootState) {
		this.buffers = buffers;
		this.initAudio(three);
	}
	getPositionalAudioElement(
		three: RootState,
		currentAudioBuffer: audioEnum
	): PositionalAudio | undefined {
		const positionalAudio = three.scene.getObjectByName(
			`positional-audio-${
				this.audioKeys[this.audioValues.indexOf(currentAudioBuffer)]
			}`
		);
		console.log(
			"positionalAudio in questionable indexing method: ",
			positionalAudio
		);
		return positionalAudio as PositionalAudio | undefined;
	}
	__setLoopContext() {
		this.loop = {
			preExit: this.currentPosition.audioProps?.loopPreExit,
			entrance: this.currentPosition.audioProps?.loopEntrance,
			exit: this.currentPosition.audioProps?.loopExit,
			main: this.currentPosition.audioProps?.loopMain,
		};
	}
	// setAudioShouldPlay(
	// 	shouldPlay: boolean,
	// 	three: RootState,
	// 	currentAudioBuffer: audioEnum,
	// 	previousAudioBuffer: audioEnum
	// ) {
	// 	// TODO: loop through array and mute all PositionalAudioElements incase a transition occurs at an awkward time and results in multiple playing at once.
	// 	// let em = getAudioElement();
	// 	// TODO: handle looping appropriately here
	// 	// const loop = shouldLoop;
	// 	let curPositionalAudio = this.getPositionalAudioElement(
	// 		three,
	// 		currentAudioBuffer
	// 	);
	// 	let prevPositionalAudio = this.getPositionalAudioElement(
	// 		three,
	// 		previousAudioBuffer
	// 	);
	// 	if (shouldPlay) {
	// 		console.log("Setting play to true");
	// 		prevPositionalAudio?.pause();
	// 		curPositionalAudio && (curPositionalAudio.loop = this.loop);
	// 		curPositionalAudio?.play();
	// 	}
	// 	if (!shouldPlay) {
	// 		// em.pause();
	// 		console.log("Setting play to false");
	// 		curPositionalAudio?.pause();
	// 		prevPositionalAudio?.pause();
	// 	}
	// }
	mute() {
		this.positionalAudioElements?.forEach((p) => {
			p.pause();
		});
	}
	play() {}
	genPositionalAudio(
		audioListener: AudioListener,
		name: string,
		buffer: AudioBuffer
	) {
		const positionalAudio = new PositionalAudio(audioListener);
		positionalAudio.name = `positional-audio-${name}`;
		positionalAudio.autoplay = false;
		positionalAudio.loop = true;
		positionalAudio.setBuffer(buffer);
		positionalAudio.setRefDistance(1);
		positionalAudio.setRolloffFactor(20);
		positionalAudio.setMaxDistance(100);
		return positionalAudio;
	}
	initAudio(three: RootState) {
		const audioListener = new AudioListener();
		three.camera.add(audioListener);
		const audioNames = Object.keys(audioEnum);
		if (!this.buffers) {
			console.log("No buffers to initialize audioHandler");
			return;
		}
		let spaceShip = three.scene.getObjectByName("curious-spaceShip");
		this.buffers.forEach((buffer, i) => {
			const positionalAudio = this.genPositionalAudio(
				audioListener,
				audioNames[i],
				buffer
			);
			if (spaceShip) {
				spaceShip?.add(positionalAudio);
			}
			this.positionalAudioElements?.push(positionalAudio);
		});
		store.dispatch({
			type: "SET-AUDIO-INITIALIZED",
		});
	}
}

export default AudioHandler;
