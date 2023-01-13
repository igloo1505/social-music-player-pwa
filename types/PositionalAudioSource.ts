import { MutableRefObject } from "react";
import { audioEnum } from "./AudioHandler";
import { Group, PositionalAudio, AudioListener, AudioLoader } from "three";
import { extend } from "@react-three/fiber";

export class PositionalAudioSource extends PositionalAudio {
	path: audioEnum;
	name: string;
	audioListener: AudioListener;
	shipRef: MutableRefObject<Group>;
	ref: MutableRefObject<PositionalAudioSource>;
	constructor(
		path: audioEnum,
		name: string,
		loop: boolean = false,
		audioListener: AudioListener,
		shipRef: MutableRefObject<Group>,
		ref: MutableRefObject<PositionalAudioSource>
	) {
		super(audioListener);
		this.path = path;
		this.name = `audio-${name}`;
		this.loop = loop;
		this.shipRef = shipRef;
		this.audioListener = audioListener;
		this.ref = ref;
		// const positionalAudio = new PositionalAudio(this.audioListener);
		const audioLoader = new AudioLoader();
		audioLoader.load(this.path, (buffer) => {
			this.setBuffer(buffer);
		});
		this.autoplay = false;
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
