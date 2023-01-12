import { RootState } from "@react-three/fiber";
import { AudioListener, PositionalAudio } from "three";
import store from "../state/store";
import Position from "./Position";

export enum phaseEnum {
	entrance = "entrance",
	main = "main",
	preExit = "preExit",
}

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
	three: RootState;
	constructor(currentPosition: Position, three: RootState) {
		this.currentPosition = currentPosition;
		this.three = three;
	}
	updateBufferKey(bufferKey: audioEnum) {
		this.mute();
		const playEm = this.getPositionalAudioElement(bufferKey);
		playEm && playEm.play();
	}
	updateLoopState(bufferKey: audioEnum, loop: boolean = false) {
		const em = this.getPositionalAudioElement(bufferKey);
		em && (em.loop = loop);
	}
	updateAnimationPhase(phase: phaseEnum) {
		const path = this.currentPosition?.audioProps?.[`${phase}AudioPath`];
		if (path) {
			this.updateLoopState(path!, this.getLoopState(phase));
			this.updateBufferKey(path!);
		}
	}
	updateCurrentPosition(position: Position) {
		this.isInitialBuffer = false;
		this.currentPosition = position;
		this.__setLoopContext();
		this.updateAnimationPhase(phaseEnum.entrance);
	}
	setAudioBuffers(buffers: AudioBuffer[]) {
		this.buffers = buffers;
		this.initAudio();
	}
	getPositionalAudioElement(bufferKey: audioEnum): PositionalAudio | undefined {
		const positionalAudio = this.three.scene.getObjectByName(
			`positional-audio-${this.audioKeys[this.audioValues.indexOf(bufferKey)]}`
		);
		return positionalAudio as PositionalAudio | undefined;
	}
	__setLoopContext() {
		this.loop = {
			preExit: this.currentPosition.audioProps?.preExitLoop || false,
			entrance: this.currentPosition.audioProps?.entranceLoop || false,
			exit: this.currentPosition.audioProps?.exitLoop || false,
			main: this.currentPosition.audioProps?.mainLoop || false,
		};
	}
	getLoopState(phase: phaseEnum) {
		/// @ts-ignore
		return this.loop[phase] as boolean;
	}
	// 	// TODO: loop through array and mute all PositionalAudioElements incase a transition occurs at an awkward time and results in multiple playing at once.
	// 	// TODO: handle looping appropriately here

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
	initAudio() {
		const audioListener = new AudioListener();
		this.three.camera.add(audioListener);
		const audioNames = Object.keys(audioEnum);
		if (!this.buffers) {
			console.log("No buffers to initialize audioHandler");
			return;
		}
		let spaceShip = this.three.scene.getObjectByName("curious-spaceShip");
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
