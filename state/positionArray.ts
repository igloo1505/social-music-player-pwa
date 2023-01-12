import { MutableRefObject } from "react";
import { audioEnum } from "../types/AudioHandler";
export enum positionEnum {
	curiouslyHover = "curiouslyHover",
	upClose = "upClose",
	pauseBeforeTakeoff = "pauseBeforeTakeoff",
	goProbePeople = "goProbePeople",
	hideDarkside = "hideDarkside",
	stay = "stay",
}

const positions = [
	{
		name: positionEnum.curiouslyHover,
		position: { x: 0, y: 0, z: 247 },
		rotation: { x: 0, y: 0, z: 0 },
		animation: {
			main: (elapsed: number, ref: MutableRefObject<any>) => {
				const scaleFactor = 0.75;
				/// @ts-ignore
				ref.current.rotation.y = Math.PI * elapsed * scaleFactor;
				/// @ts-ignore
				ref.current.rotation.x = Math.cos(Math.PI * elapsed) * 0.25;
				ref.current.position.y = Math.cos(Math.PI * 0.2 * elapsed) * 0.1;
			},
			entrance: (elapsed: number, ref: MutableRefObject<any>) => {
				const scaleFactor = 0.75;
				/// @ts-ignore
				ref.current.rotation.y = Math.PI * elapsed * scaleFactor;
				/// @ts-ignore
				ref.current.rotation.x = Math.cos(Math.PI * elapsed) * 0.25;
				ref.current.position.y = Math.cos(Math.PI * 0.2 * elapsed) * 0.1;
			},
			preExit: (elapsed: number, ref: MutableRefObject<any>) => {
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
			exitAudioPath: audioEnum.laserBlast,
			exitLoop: false,
			entranceLoop: false,
			mainLoop: true,
		},
		periods: {
			entrance: 3000,
			main: 7000,
			preExit: 0,
			positionDelay: 0,
		},
		nextInSequence: positionEnum.upClose,
	},
	{
		name: positionEnum.goProbePeople,
		position: { x: -102, y: 0, z: 0 },
		rotation: { x: Math.PI * -0.35, y: Math.PI * 0.3, z: Math.PI * -0.35 },
		animation: {
			main: (elapsed: number, ref: MutableRefObject<any>) => {},
			entrance: (elapsed: number, ref: MutableRefObject<any>) => {},
			preExit: (elapsed: number, ref: MutableRefObject<any>) => {},
		},
		entranceEase: "power3.out",
		// audioPath: audioEnum.laserBlast,
		periods: {
			entrance: 2000,
			main: 2000,
			preExit: 0,
			positionDelay: 1000,
		},
		audioProps: {
			mainAudioPath: audioEnum.laserBlast,
			preExitAudioPath: audioEnum.powerUp,
		},
		nextInSequence: positionEnum.stay,
	},
	{
		name: positionEnum.hideDarkside,
		position: { x: 102, y: 0, z: 0 },
		rotation: { x: 0, y: 0, z: 0 },
		animation: {
			main: (elapsed: number, ref: MutableRefObject<any>) => {},
			entrance: (elapsed: number, ref: MutableRefObject<any>) => {},
			preExit: (elapsed: number, ref: MutableRefObject<any>) => {},
		},
		entranceEase: "power3.out",
		nextInSequence: positionEnum.curiouslyHover,
		periods: {
			entrance: 1500,
			main: 2000,
			preExit: 0,
			positionDelay: 0,
		},
	},
	{
		name: positionEnum.upClose,
		position: { x: 0, y: 0, z: 248.75 },
		// rotation: { x: 0, y: 0, z: 0 },
		animation: {
			main: (elapsed: number, ref: MutableRefObject<any>) => {
				const scaleFactor = 0.05;
				ref.current.rotation.y = Math.cos(Math.PI * elapsed) * scaleFactor;
				ref.current.rotation.z = Math.cos(Math.PI * elapsed) * scaleFactor;
				ref.current.rotation.x = Math.cos(Math.PI * elapsed) * scaleFactor;
				ref.current.position.y = Math.cos(Math.PI * 0.5 * elapsed) * 0.03;
				ref.current.position.x = Math.cos(Math.PI * 0.5 * elapsed) * 0.01;
			},
			exit: (elapsed: number, ref: MutableRefObject<any>) => {
				const scaleFactor = 0.05;
				ref.current.rotation.y = Math.cos(Math.PI * elapsed) * scaleFactor;
				ref.current.rotation.z = Math.cos(Math.PI * elapsed) * scaleFactor;
				ref.current.rotation.x = Math.cos(Math.PI * elapsed) * scaleFactor;
				ref.current.position.y = Math.cos(Math.PI * 0.5 * elapsed) * 0.03;
				ref.current.position.x = Math.cos(Math.PI * 0.5 * elapsed) * 0.01;
			},
			preExit: (elapsed: number, ref: MutableRefObject<any>) => {
				const scaleFactor = 0.05;
				ref.current.rotation.y = Math.cos(Math.PI * elapsed) * scaleFactor;
				ref.current.rotation.z = Math.cos(Math.PI * elapsed) * scaleFactor;
				ref.current.rotation.x = Math.cos(Math.PI * elapsed) * scaleFactor;
				ref.current.position.y = Math.cos(Math.PI * 0.5 * elapsed) * 0.03;
				ref.current.position.x = Math.cos(Math.PI * 0.5 * elapsed) * 0.01;
			},
			entrance: (elapsed: number, ref: MutableRefObject<any>) => {
				const scaleFactor = 0.05;
				// debugger;
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
			exitAudioPath: audioEnum.pulse,
		},
		periods: {
			entrance: 750,
			main: 5000,
			preExit: 0,
			positionDelay: 0,
		},
		nextInSequence: positionEnum.goProbePeople,
	},
];

export default positions;

// new Position({
// 	name: positionEnum.pauseBeforeTakeoff,
// 	// rotation: { x: 0, y: 0, z: 0 },
// 	animation: {
// 		main: (elapsed: number, ref: MutableRefObject<any>) => {
// 			const scaleFactor = 0.005;
// 			ref.current.rotation.y = Math.cos(Math.PI * elapsed) * scaleFactor;
// 			ref.current.rotation.z = Math.cos(Math.PI * elapsed) * scaleFactor;
// 			ref.current.rotation.x = Math.cos(Math.PI * elapsed) * scaleFactor;
// 		},
// 		preExit: (elapsed: number, ref: MutableRefObject<any>) => {
// 			const scaleFactor = 0.005;
// 			ref.current.rotation.y = Math.cos(Math.PI * elapsed) * scaleFactor;
// 			ref.current.rotation.z = Math.cos(Math.PI * elapsed) * scaleFactor;
// 			ref.current.rotation.x = Math.cos(Math.PI * elapsed) * scaleFactor;
// 		},
// 		entrance: (elapsed: number, ref: MutableRefObject<any>) => {
// 			const scaleFactor = 0.005;
// 			ref.current.rotation.y = Math.cos(Math.PI * elapsed) * scaleFactor;
// 			ref.current.rotation.z = Math.cos(Math.PI * elapsed) * scaleFactor;
// 			ref.current.rotation.x = Math.cos(Math.PI * elapsed) * scaleFactor;
// 		},
// 	},
// 	// audioPath: audioEnum.powerUp,
// 	audioProps: {
// 		mainAudioPath: audioEnum.ufoSoundEffect,
// 	},
// 	entranceEase: "power3.out",
// 	periods: {
// 		entrance: 1000,
// 		main: 2000,
// 		preExit: 0,
// 		positionDelay: 0,
// 	},
// 	nextInSequence: positionEnum.goProbePeople,
// }),
