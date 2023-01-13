import { RootState } from "@react-three/fiber";
import { AudioListener, Group, Object3D, PositionalAudio } from "three";
import store from "../state/store";
import Position from "./Position";
import { MutableRefObject } from "react";
import { PositionalAudioSource } from "./PositionalAudioSource";
import AlienInvasionManager from "./AlienInvasionManager";

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

interface PositionalAudioSourceProps {
	path: audioEnum;
	name: string;
	loop?: boolean;
}

export const audioSources: PositionalAudioSourceProps[] = [
	{
		name: "laserBlast",
		path: audioEnum.laserBlast,
		loop: false,
	},
	{
		name: "powerUp",
		path: audioEnum.powerUp,
		loop: false,
	},
	{
		name: "ufoSoundEffect",
		path: audioEnum.ufoSoundEffect,
		loop: true,
	},
	{
		name: "pulse",
		path: audioEnum.pulse,
		loop: false,
	},
];

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
	manager: AlienInvasionManager;
	muted: boolean = true;
	constructor(
		three: RootState,
		shipRef: MutableRefObject<Group>,
		audioRefs: MutableRefObject<PositionalAudioSource>[],
		manager: AlienInvasionManager
	) {
		this.three = three;
		this.shipRef = shipRef;
		this.manager = manager;
		const audioListener = new AudioListener();
		this.three.camera.add(audioListener);
		let spaceShip = this.three.scene.getObjectByName(
			"curious-spaceShip"
		) as Object3D;
		console.log("spaceShip: ", spaceShip);
		audioSources.forEach((s, i) => {
			const positionalAudio = new PositionalAudioSource(
				s.path,
				s.name,
				s.loop,
				audioListener,
				this.shipRef,
				audioRefs[i]
			);
			spaceShip.add(positionalAudio);
			this.elements.push(positionalAudio);
		});
		store.dispatch({
			type: "SET-AUDIO-INITIALIZED",
		});
		this.manager.pushInitialized();
	}
	private overlapShouldPlay(
		ems: PositionalAudioSource[],
		emsShouldPlay: PositionalAudioSourceProps[]
	) {
		const names = ems.map((m) => m.name);
		return emsShouldPlay.filter((j) => names.indexOf(j.name) >= 0);
	}
	private mapShouldPlay(
		ems: PositionalAudioSource[],
		emsShouldPlay: PositionalAudioSourceProps[]
	) {
		const names = emsShouldPlay.map((m) => `audio-${m.name}`);
		console.log("names: ", names);
		console.log("ems[0].name: ", ems[0].name);
		ems.forEach((j) => {
			console.log("j: ", j);
			console.log("names.indexOf(j.name): ", names.indexOf(j.name));
			names.indexOf(j.name) >= 0 ? j.play() : j.pause();
		});
	}
	updateCurrentPosition(
		position: Position,
		phase: phaseEnum,
		overrideMute: boolean = false
	) {
		this.isInitialBuffer && (this.isInitialBuffer = false);
		console.log("phase: ", phase);
		console.log("position: ", position.name);
		const ems = position.audioProps[phase];
		if ((!this.muted || overrideMute) && ems) {
			this.mapShouldPlay(this.elements, ems);
		}
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
		this.muted = true;
	}
	unMute() {
		// BUG: Handle unmuting of appropriate components here...
		this.muted = false;
		this.updateCurrentPosition(
			this.manager.currentPosition,
			this.manager.currentPosition.phase,
			true
		);
	}
	// play() {}
}

export default AudioHandler;
