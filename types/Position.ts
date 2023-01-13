import { MutableRefObject } from "react";
import { positionEnum } from "../state/positionArray";
import { audioEnum, phaseEnum } from "./AudioHandler";
import gsap from "gsap";
import { RootState } from "@react-three/fiber";
import ShipAnimated from "../components/threeD/ShipAnimated";
import AlienInvasionManager from "./AlienInvasionManager";
import { Group } from "three";

export interface periodsInterface {
	entrance: number;
	main: number;
	preExit: number;
	positionDelay: number;
}

export interface vectorObject {
	x: number;
	y: number;
	z: number;
}

interface audioProps {
	mainAudioPath: audioEnum;
	entranceAudioPath?: audioEnum;
	exitAudioPath?: audioEnum;
	preExitAudioPath?: audioEnum;
	mainLoop?: boolean;
	entranceLoop?: boolean;
	exitLoop?: boolean;
	preExitLoop?: boolean;
}

type PositionType = {
	name: positionEnum;
	nextInSequence: positionEnum;
	position: vectorObject;
	rotation?: vectorObject;
	periods: periodsInterface;
	shipRef: MutableRefObject<Group>;
	animation: {
		main: (elapsed: number, ref: MutableRefObject<any>) => void;
		entrance: (elapsed: number, ref: MutableRefObject<any>) => void;
		preExit: (elapsed: number, ref: MutableRefObject<any>) => void;
	};
	entranceEase?: string;
	audioProps?: audioProps;
	rotationDuration?: number;
	manager: AlienInvasionManager;
	// sequentialTimeouts: () => void;
	// totalPeriod: number;
};

class Position implements PositionType {
	periods: periodsInterface;
	stay?: boolean;
	name: positionEnum;
	nextInSequence: positionEnum;
	position: vectorObject;
	rotation?: vectorObject;
	animation: ShipAnimated;
	entranceEase?: string;
	audioProps?: audioProps;
	rotationDuration?: number;
	totalPeriod: number;
	shipRef: MutableRefObject<any>;
	phase: phaseEnum = phaseEnum.main;
	manager: AlienInvasionManager;
	activated: boolean = false;

	// timeoutIndex: number = 0;
	// sequentialTimeouts: () => void;

	constructor({
		name,
		nextInSequence,
		position,
		rotation,
		animation,
		entranceEase,
		audioProps,
		rotationDuration,
		periods,
		manager,
		shipRef,
	}: PositionType) {
		this.manager = manager;
		this.name = name;
		this.stay = nextInSequence === positionEnum.stay;
		this.nextInSequence = nextInSequence;
		this.position = position;
		this.rotation = rotation;
		this.shipRef = shipRef;
		this.animation = new ShipAnimated({
			entrance: animation.entrance,
			main: animation.main,
			preExit: animation.preExit,
			name: this.name,
			shipRef: shipRef,
		});
		this.entranceEase = entranceEase;
		this.audioProps = audioProps;
		this.rotationDuration = rotationDuration;
		this.periods = periods;
		this.totalPeriod = periods.entrance + periods.main + periods.preExit;
		this.phase = phaseEnum.entrance;
		this.manager.pushInitialized();
	}
	getNextInSequence(_positionArray?: Position[]) {
		return this.manager.positions.filter(
			(d) => d.name === this.nextInSequence
		)[0];
	}
	private setAnimationPhase(phase: phaseEnum) {
		console.log(`Position: ${this.name}, Phase: ${phase}`);
		this.phase = phase;
		this.animation.phase = phase;
		if (phase === phaseEnum.entrance) {
			this.entranceTimeout();
		}
		if (phase === phaseEnum.main) {
			this.mainTimeout();
		}
		if (phase === phaseEnum.preExit) {
			this.preExitTimeout();
		}
	}
	private preExitTimeout() {
		console.log("init preExitTimeout", this.name);
		if (this.nextInSequence !== positionEnum.stay) {
			setTimeout(() => {
				this.manager.nextPositionCallback(this.nextInSequence);
			}, this.periods.preExit);
		}
	}
	private mainTimeout() {
		console.log("init mainTimeout", this.name);
		setTimeout(() => {
			this.setAnimationPhase(phaseEnum.preExit);
		}, this.periods.main);
	}
	private entranceTimeout() {
		console.log("init entranceTimeout", this.name);
		setTimeout(() => {
			this.setAnimationPhase(phaseEnum.main);
		}, this.periods.entrance);
	}
	activate() {
		console.log(`Activated ${this.name}`);
		this.activated = true;
		this.setAnimationPhase(phaseEnum.entrance);
		this.animation.toPosition({
			position: this.position,
			rotation: this.rotation,
			periods: this.periods,
			entranceEase: this.entranceEase,
		});
	}
	// animate(ref) {}
}

export default Position;
