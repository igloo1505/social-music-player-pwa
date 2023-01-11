import { MutableRefObject } from "react";
import { audioEnum, positionEnum } from "../state/positionArray";

interface audioProps {
	mainAudioPath: audioEnum;
	entranceAudioPath?: audioEnum;
	exitAudioPath?: audioEnum;
	preExitAudioPath?: audioEnum;
	exitAudioPeriod?: number;
	entranceAudioPeriod?: number;
	preExitPeriod?: number;
	loopMain?: boolean;
	loopEntrance?: boolean;
	loopExit?: boolean;
	loopPreExit?: boolean;
}

type PositionType = {
	name: string;
	stayPeriod: number;
	nextInSequence: positionEnum;
	position?: { x: number; y: number; z: number };
	rotation?: { x: number; y: number; z: number };
	animation?: {
		static?: (elapsed: number, ref: MutableRefObject<any>) => void;
		enter?: (elapsed: number, ref: MutableRefObject<any>) => void;
		exit?: (elapsed: number, ref: MutableRefObject<any>) => void;
	};
	entranceEase?: string;
	entranceDuration?: number;
	positionDelay?: number;
	audioProps?: audioProps;
	rotationDuration?: number;
};

class Position implements PositionType {
	stayPeriod: number;
	stay?: boolean;
	name: string;
	nextInSequence: positionEnum;
	position?: { x: number; y: number; z: number };
	rotation?: { x: number; y: number; z: number };
	animation?: {
		static?: (elapsed: number, ref: MutableRefObject<any>) => void;
		enter?: (elapsed: number, ref: MutableRefObject<any>) => void;
		exit?: (elapsed: number, ref: MutableRefObject<any>) => void;
	};
	entranceEase?: string;
	entranceDuration?: number;
	positionDelay?: number;
	audioProps?: audioProps;
	rotationDuration?: number;
	constructor({
		name,
		stayPeriod,
		nextInSequence,
		position,
		rotation,
		animation,
		entranceEase,
		entranceDuration,
		positionDelay,
		audioProps,
		rotationDuration,
	}: PositionType) {
		this.name = name;
		this.stay = nextInSequence === positionEnum.stay;
		this.stayPeriod = stayPeriod;
		this.nextInSequence = nextInSequence;
		this.position = position;
		this.rotation = rotation;
		this.animation = animation;
		this.entranceEase = entranceEase;
		this.entranceDuration = entranceDuration;
		this.positionDelay = positionDelay;
		this.audioProps = audioProps;
		this.rotationDuration = rotationDuration;
	}
	getTotalPeriod() {
		let _delay = this.stayPeriod;
		this.entranceDuration && (_delay += this.entranceDuration);
		this.positionDelay && (_delay += this.positionDelay);
		return _delay;
	}
	getNextInSequence(positionArray: this[]) {
		const next = positionArray.filter((d) => d.name === this.nextInSequence);
		return next.length > 0 ? next[0] : null;
	}
}

export default Position;
