import { MutableRefObject } from "react";
import { audioEnum } from "./AudioHandler";
import { Group, PositionalAudio, AudioListener, AudioLoader } from "three";
import { extend } from "@react-three/fiber";

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

export class PositionalAudioSource extends PositionalAudio {
	path: audioEnum;
	name: string;
	loop: boolean;
	audioListener: AudioListener;
	shipRef: MutableRefObject<Group>;
	element: PositionalAudio = null!;
	constructor(
		path: audioEnum,
		name: string,
		loop: boolean = false,
		audioListener: AudioListener,
		shipRef: MutableRefObject<Group>
	) {
		super(audioListener);
		this.path = path;
		this.name = name;
		this.loop = loop;
		this.shipRef = shipRef;
		this.audioListener = audioListener;
		// const positionalAudio = new PositionalAudio(this.audioListener);
		const audioLoader = new AudioLoader();
		audioLoader.load(this.path, (buffer) => {
			this.setBuffer(buffer);
		});
		this.name = this.name;
		this.autoplay = false;
		this.loop = this.loop;
		this.setRefDistance(1);
		this.setRolloffFactor(20);
		this.setMaxDistance(100);
	}
	mute() {
		this.pause();
	}
	unmute() {
		this.play();
	}
	setLoopState(loop: boolean) {
		this.loop = loop;
	}
}

extend({ PositionalAudioSource });
