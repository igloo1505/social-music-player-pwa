import Position from "../types/Position";
import { MutableRefObject } from "react";
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
export enum positionEnum {
	curiouslyHover = "curiouslyHover",
	upClose = "upClose",
	pauseBeforeTakeoff = "pauseBeforeTakeoff",
	goProbePeople = "goProbePeople",
	hideDarkside = "hideDarkside",
	stay = "stay",
}
const data: Position[] = [
	new Position({
		name: "curiouslyHover",
		position: { x: 0, y: 0, z: 247 },
		rotation: { x: 0, y: 0, z: 0 },
		animation: {
			static: (elapsed: number, ref: MutableRefObject<any>) => {
				const scaleFactor = 0.75;
				/// @ts-ignore
				ref.current.rotation.y = Math.PI * elapsed * scaleFactor;
				/// @ts-ignore
				ref.current.rotation.x = Math.cos(Math.PI * elapsed) * 0.25;
				ref.current.position.y = Math.cos(Math.PI * 0.2 * elapsed) * 0.1;
			},
		},
		audioProps: {
			mainAudioPath: audioEnum.ufoSoundEffect,
			entranceAudioPath: audioEnum.laserBlast,
			entranceAudioPeriod: 2000,
			// preExitAudioPath: audioEnum.powerUp,
			// preExitPeriod: 2000,
			exitAudioPath: audioEnum.laserBlast,
			exitAudioPeriod: 2000,
			loopExit: false,
			loopEntrance: false,
			loopMain: true,
		},
		stayPeriod: 7000,
		// Maybe set this back to positionEnum.upClose
		nextInSequence: positionEnum.upClose,
		// nextInSequence: positionEnum.pauseBeforeTakeoff,
	}),
	new Position({
		name: "upClose",
		position: { x: 0, y: 0, z: 248.75 },
		rotation: { x: 0, y: 0, z: 0 },
		animation: {
			static: (elapsed: number, ref: MutableRefObject<any>) => {
				const scaleFactor = 0.05;
				ref.current.rotation.y = Math.cos(Math.PI * elapsed) * scaleFactor;
				ref.current.rotation.z = Math.cos(Math.PI * elapsed) * scaleFactor;
				ref.current.rotation.x = Math.cos(Math.PI * elapsed) * scaleFactor;
				ref.current.position.y = Math.cos(Math.PI * 0.5 * elapsed) * 0.03;
				ref.current.position.x = Math.cos(Math.PI * 0.5 * elapsed) * 0.01;
			},
		},
		audioProps: {
			mainAudioPath: audioEnum.ufoSoundEffect,
			preExitAudioPath: audioEnum.powerUp,
			preExitPeriod: 2000,
			exitAudioPath: audioEnum.pulse,
			exitAudioPeriod: 3000,
		},
		entranceDuration: 350,
		stayPeriod: 5000,
		nextInSequence: positionEnum.pauseBeforeTakeoff,
	}),
	new Position({
		name: "pauseBeforeTakeoff",
		// rotation: { x: 0, y: 0, z: 0 },
		animation: {
			static: (elapsed: number, ref: MutableRefObject<any>) => {
				const scaleFactor = 0.005;
				ref.current.rotation.y = Math.cos(Math.PI * elapsed) * scaleFactor;
				ref.current.rotation.z = Math.cos(Math.PI * elapsed) * scaleFactor;
				ref.current.rotation.x = Math.cos(Math.PI * elapsed) * scaleFactor;
			},
		},
		// audioPath: audioEnum.powerUp,
		audioProps: {
			mainAudioPath: audioEnum.ufoSoundEffect,
		},
		entranceEase: "power3.out",
		entranceDuration: 1000,
		stayPeriod: 2000,
		nextInSequence: positionEnum.goProbePeople,
	}),
	new Position({
		name: "goProbePeople",
		position: { x: -102, y: 0, z: 0 },
		rotation: { x: Math.PI * -0.35, y: Math.PI * 0.3, z: Math.PI * -0.35 },
		animation: {},
		entranceEase: "power3.out",
		entranceDuration: 3000,
		positionDelay: 1000,
		// audioPath: audioEnum.laserBlast,
		stayPeriod: 8000,
		audioProps: {
			mainAudioPath: audioEnum.laserBlast,
			preExitAudioPath: audioEnum.powerUp,
		},
		nextInSequence: positionEnum.stay,
	}),
	new Position({
		name: "hideDarkside",
		position: { x: 102, y: 0, z: 0 },
		rotation: { x: 0, y: 0, z: 0 },
		animation: {},
		entranceEase: "power3.out",
		stayPeriod: 5000,
		nextInSequence: positionEnum.curiouslyHover,
	}),
];

class PositionArray {
	data: Position[] = data;
	constructor() {}
	getPositionFromEnumKey(query: positionEnum): Position {
		return this.data.filter((d) => d.name === query)[0];
	}
	asObject() {
		let ob = {};
		for (let i = 0; i < this.data.length; i++) {
			/// @ts-ignore
			// TODO: Deal with this typescript error later
			ob[this.data[i].name] = this.data[i];
		}
		return ob;
	}
}

export default PositionArray;
