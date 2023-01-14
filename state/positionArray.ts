import { MutableRefObject } from "react";
import { audioEnum } from "../types/AudioHandler";
import { Group } from "three";

export enum positionEnum {
	curiouslyHover = "curiouslyHover",
	upClose = "upClose",
	pauseBeforeTakeoff = "pauseBeforeTakeoff",
	goProbePeople = "goProbePeople",
	hideDarkside = "hideDarkside",
	stay = "stay",
}

interface audioInterface {
	path: audioEnum;
	name: string;
	loop?: boolean;
}

export interface audioProps {
	main: audioInterface[];
	entrance: audioInterface[];
	preExit: audioInterface[];
}

const curiouslyHoverAudio: audioProps = {
	main: [
		{
			path: audioEnum.ufoSoundEffect,
			name: "ufoSoundEffect",
			loop: true,
		},
	],
	entrance: [
		{
			path: audioEnum.laserBlast,
			name: "laserBlast",
			loop: false,
		},
	],
	preExit: [
		{
			path: audioEnum.powerUp,
			name: "powerUp",
			loop: false,
		},
	],
};
const goProbePeopleAudio: audioProps = {
	main: [],
	entrance: [
		// {
		// 	path: audioEnum.pulse,
		// 	name: "pulse",
		// 	loop: false,
		// },
		{
			path: audioEnum.takeoff,
			name: "takeoff",
			loop: false,
		},
	],
	preExit: [
		{
			path: audioEnum.powerUp,
			name: "powerUp",
			loop: false,
		},
	],
};

const hideDarksideAudio: audioProps = {
	main: [],
	entrance: [],
	preExit: [],
};

const upCloseAudio: audioProps = {
	main: [
		{
			path: audioEnum.ufoSoundEffect,
			name: "ufoSoundEffect",
			loop: true,
		},
	],
	entrance: [
		{
			path: audioEnum.laserBlast,
			name: "laserBlast",
			loop: false,
		},
	],
	preExit: [
		{
			path: audioEnum.takeoff,
			name: "takeoff",
			loop: false,
		},
	],
};

const positions = [
	{
		name: positionEnum.curiouslyHover,
		position: { x: 0, y: 0, z: 247 },
		rotation: { x: 0, y: 0, z: 0 },
		animation: {
			main: (elapsed: number, ref: MutableRefObject<Group>) => {
				const scaleFactor = 0.75;
				ref.current.rotation.y = Math.PI * elapsed * scaleFactor;
				ref.current.rotation.x = Math.cos(Math.PI * elapsed) * 0.25;
				ref.current.position.y = Math.cos(Math.PI * 0.2 * elapsed) * 0.1;
			},
			entrance: (elapsed: number, ref: MutableRefObject<Group>) => {
				const scaleFactor = 0.75;
				ref.current.rotation.y = Math.PI * elapsed * scaleFactor;
				ref.current.rotation.x = Math.cos(Math.PI * elapsed) * 0.25;
				ref.current.position.y = Math.cos(Math.PI * 0.2 * elapsed) * 0.1;
			},
			preExit: (elapsed: number, ref: MutableRefObject<Group>) => {
				const scaleFactor = 0.75;
				ref.current.rotation.y = Math.PI * elapsed * scaleFactor;
				ref.current.rotation.x = Math.cos(Math.PI * elapsed) * 0.25;
				ref.current.position.y = Math.cos(Math.PI * 0.2 * elapsed) * 0.1;
			},
		},
		audioProps: curiouslyHoverAudio,
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
		position: { x: -110, y: 20, z: 0 },
		rotation: { x: Math.PI * -0.35, y: Math.PI * 0.3, z: Math.PI * -0.35 },
		animation: {
			main: (elapsed: number, ref: MutableRefObject<Group>) => {},
			entrance: (elapsed: number, ref: MutableRefObject<Group>) => {},
			preExit: (elapsed: number, ref: MutableRefObject<Group>) => {},
		},
		entranceEase: "power3.out",
		periods: {
			entrance: 2000,
			main: 2000,
			preExit: 0,
			positionDelay: 1000,
		},
		audioProps: goProbePeopleAudio,
		nextInSequence: positionEnum.stay,
	},
	{
		name: positionEnum.hideDarkside,
		position: { x: 102, y: 0, z: 0 },
		rotation: { x: 0, y: 0, z: 0 },
		animation: {
			main: (elapsed: number, ref: MutableRefObject<Group>) => {},
			entrance: (elapsed: number, ref: MutableRefObject<Group>) => {},
			preExit: (elapsed: number, ref: MutableRefObject<Group>) => {},
		},
		entranceEase: "power3.out",
		nextInSequence: positionEnum.curiouslyHover,
		audioProps: hideDarksideAudio,
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
			main: (elapsed: number, ref: MutableRefObject<Group>) => {
				const scaleFactor = 0.05;
				ref.current.rotation.y = Math.cos(Math.PI * elapsed) * scaleFactor;
				ref.current.rotation.z = Math.cos(Math.PI * elapsed) * scaleFactor;
				ref.current.rotation.x = Math.cos(Math.PI * elapsed) * scaleFactor;
				ref.current.position.y = Math.cos(Math.PI * 0.5 * elapsed) * 0.03;
				ref.current.position.x = Math.cos(Math.PI * 0.5 * elapsed) * 0.01;
			},
			exit: (elapsed: number, ref: MutableRefObject<Group>) => {
				const scaleFactor = 0.05;
				ref.current.rotation.y = Math.cos(Math.PI * elapsed) * scaleFactor;
				ref.current.rotation.z = Math.cos(Math.PI * elapsed) * scaleFactor;
				ref.current.rotation.x = Math.cos(Math.PI * elapsed) * scaleFactor;
				ref.current.position.y = Math.cos(Math.PI * 0.5 * elapsed) * 0.03;
				ref.current.position.x = Math.cos(Math.PI * 0.5 * elapsed) * 0.01;
			},
			preExit: (elapsed: number, ref: MutableRefObject<Group>) => {
				const scaleFactor = 0.05;
				ref.current.rotation.y = Math.cos(Math.PI * elapsed) * scaleFactor;
				ref.current.rotation.z = Math.cos(Math.PI * elapsed) * scaleFactor;
				ref.current.rotation.x = Math.cos(Math.PI * elapsed) * scaleFactor;
				ref.current.position.y = Math.cos(Math.PI * 0.5 * elapsed) * 0.03;
				ref.current.position.x = Math.cos(Math.PI * 0.5 * elapsed) * 0.01;
			},
			entrance: (elapsed: number, ref: MutableRefObject<Group>) => {
				const scaleFactor = 0.05;
				// debugger;
				ref.current.rotation.y = Math.cos(Math.PI * elapsed) * scaleFactor;
				ref.current.rotation.z = Math.cos(Math.PI * elapsed) * scaleFactor;
				ref.current.rotation.x = Math.cos(Math.PI * elapsed) * scaleFactor;
				ref.current.position.y = Math.cos(Math.PI * 0.5 * elapsed) * 0.03;
				ref.current.position.x = Math.cos(Math.PI * 0.5 * elapsed) * 0.01;
			},
		},
		audioProps: upCloseAudio,
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
