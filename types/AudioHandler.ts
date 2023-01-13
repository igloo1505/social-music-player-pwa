import { RootState } from "@react-three/fiber";
import { AudioListener, Group, PositionalAudio } from "three";
import store from "../state/store";
import Position from "./Position";
import { MutableRefObject } from "react";
import { PositionalAudioSource, audioSources } from "./PositionalAudioSource";

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

class AudioHandler {
	buffers?: AudioBuffer[];
	currentBufferKey?: audioEnum;
	previousBufferKey?: audioEnum;
	protected elements: PositionalAudioSource[] = [];
	protected isInitialBuffer?: boolean = true;
	audioKeys = Object.keys(audioEnum);
	audioValues = Object.values(audioEnum);
	three: RootState;
	shipRef: MutableRefObject<Group>;
	constructor(
		three: RootState,
		shipRef: MutableRefObject<Group>,
		audioRefs: MutableRefObject<PositionalAudioSource>[]
	) {
		this.three = three;
		this.shipRef = shipRef;
		// initAudio()
		const audioListener = new AudioListener();
		this.three.camera.add(audioListener);
		let spaceShip = this.three.scene.getObjectByName("curious-spaceShip");
		audioSources.forEach((s, i) => {
			const positionalAudio = new PositionalAudioSource(
				s.path,
				s.name,
				s.loop,
				audioListener,
				this.shipRef,
				audioRefs[i]
			);
			spaceShip?.add(positionalAudio);
			this.elements.push(positionalAudio);
		});
		store.dispatch({
			type: "SET-AUDIO-INITIALIZED",
		});
	}
	updateCurrentPosition(position: Position, phase: phaseEnum) {
		this.isInitialBuffer && (this.isInitialBuffer = false);
	}
	getPositionalAudioElement(bufferKey: audioEnum): PositionalAudio | undefined {
		const name = this.audioKeys[this.audioValues.indexOf(bufferKey)];
		const element = this.elements.filter((f) => f.name === `audio-${name}`)[0];
		return element as PositionalAudio | undefined;
	}
	// 	// TODO: loop through array and mute all PositionalAudioElements incase a transition occurs at an awkward time and results in multiple playing at once.
	// 	// TODO: handle looping appropriately here
	mute() {
		this.elements.forEach((p) => {
			p.pause();
		});
	}
	// play() {}
}

export default AudioHandler;
