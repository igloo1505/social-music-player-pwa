import { MutableRefObject } from "react";
import { positionEnum } from "../state/positionArray";
import { audioEnum, phaseEnum } from "./AudioHandler";
import gsap from "gsap";
import { RootState } from "@react-three/fiber";
import ShipAnimated from "../components/threeD/ShipAnimated";
import AlienInvasionManager from "./AlienInvasionManager";

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
	ref?: MutableRefObject<any>;
	phase: phaseEnum = phaseEnum.main;
	manager: AlienInvasionManager;
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
	}: PositionType) {
		this.manager = manager;
		this.name = name;
		this.stay = nextInSequence === positionEnum.stay;
		this.nextInSequence = nextInSequence;
		this.position = position;
		this.rotation = rotation;
		this.animation = new ShipAnimated({
			entrance: animation.entrance,
			main: animation.main,
			preExit: animation.preExit,
			phase: phaseEnum.entrance,
		});
		this.entranceEase = entranceEase;
		this.audioProps = audioProps;
		this.rotationDuration = rotationDuration;
		this.periods = periods;
		this.totalPeriod = periods.entrance + periods.main + periods.preExit;
		this.phase = phaseEnum.entrance;
		// this.sequentialTimeouts = this.getSequentialTimeouts();
	}
	setRef(ref: MutableRefObject<any>) {
		this.ref = ref;
		this.animation.setRef(ref);
	}

	getNextInSequence(_positionArray?: Position[]) {
		return this.manager.positions.filter(
			(d) => d.name === this.nextInSequence
		)[0];
		// return next.length > 0 ? next[0] : null;
	}
	getTimeoutPeriods() {
		const totalPeriod = this.totalPeriod;
		const periods = this.periods;
		let preMain = 0;
		this.periods.entrance && (preMain += this.periods.entrance);
		// this.periods.positionDelay && (preMain += this.periods.positionDelay);
		const timeoutPeriods = {
			pre_main: preMain,
			pre_preExit: totalPeriod - periods.preExit,
			total: totalPeriod,
		};
		return timeoutPeriods;
	}
	// private getSequentialTimeouts() {
	// 	const timeouts = [];
	// 	if (this.periods.entrance !== 0) {
	// 		timeouts.push(this.entranceTimeout);
	// 	}
	// 	if (this.periods.main !== 0) {
	// 		timeouts.push(this.mainTimeout);
	// 	}
	// 	if (this.periods.preExit !== 0) {
	// 		timeouts.push(this.preExitTimeout);
	// 	}
	// }
	private setAnimationPhase(phase: phaseEnum) {
		console.log(`Position: ${this.name}, Phase: ${phase}`);
		this.phase = phase;
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
		console.log("init preExitTimeout");
		if (this.nextInSequence !== positionEnum.stay) {
			setTimeout(() => {
				this.manager.nextPositionCallback(this.nextInSequence);
			}, this.periods.preExit);
		}
	}
	private mainTimeout() {
		console.log("init mainTimeout");
		setTimeout(() => {
			this.setAnimationPhase(phaseEnum.preExit);
		}, this.periods.main);
	}
	private entranceTimeout() {
		console.log("init entranceTimeout");
		setTimeout(() => {
			this.setAnimationPhase(phaseEnum.main);
		}, this.periods.entrance);
	}

	activate() {
		console.log(`Activated ${this.name}`);
		this.animation.toPosition({
			position: this.position,
			rotation: this.rotation,
			periods: this.periods,
			entranceEase: this.entranceEase,
		});
		this.setAnimationPhase(phaseEnum.entrance);
	}
	// animate(ref) {}
}

export default Position;
