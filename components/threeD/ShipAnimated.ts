import { RootState } from "@react-three/fiber";
import { phaseEnum } from "../../types/AudioHandler";
import { periodsInterface, vectorObject } from "../../types/Position";
import gsap from "gsap";
import { MutableRefObject } from "react";
import { positionEnum } from "../../state/positionArray";
import { Group } from "three";

interface ShipAnimatedProps {
	main: (elapsed: number, ref: MutableRefObject<Group>) => void;
	entrance: (elapsed: number, ref: MutableRefObject<Group>) => void;
	preExit: (elapsed: number, ref: MutableRefObject<Group>) => void;
	name: positionEnum;
	shipRef: MutableRefObject<Group>;
}

class ShipAnimated {
	main: (elapsed: number, ref: MutableRefObject<Group>) => void;
	entrance: (elapsed: number, ref: MutableRefObject<Group>) => void;
	preExit: (elapsed: number, ref: MutableRefObject<Group>) => void;
	phase: phaseEnum;
	name: positionEnum;
	shipRef: MutableRefObject<Group>;
	constructor({ main, entrance, preExit, name, shipRef }: ShipAnimatedProps) {
		this.main = main;
		this.preExit = preExit;
		this.entrance = entrance;
		this.phase = phaseEnum.entrance;
		this.name = name;
		this.shipRef = shipRef;
	}
	useFrame(state: RootState, currentPosition: positionEnum) {
		const elapsed = state.clock.getElapsedTime();
		// debugger;
		if (currentPosition !== this.name) {
			debugger;
		}
		console.log("this.shipRef: ", this.shipRef.current);
		if (!this.shipRef.current) return;
		// console.log("this.phase: ", this.phase);
		// console.log("elapsed: ", elapsed);
		if (this.phase === phaseEnum.entrance && this?.entrance) {
			this.entrance(elapsed, this.shipRef);
		}
		if (this.phase === phaseEnum.main && this?.main) {
			this.main(elapsed, this.shipRef);
		}
		if (this.phase === phaseEnum.preExit && this?.preExit) {
			this.preExit(elapsed, this.shipRef);
		}
	}
	toPosition({
		position,
		rotation,
		periods,
		entranceEase,
	}: {
		position: vectorObject;
		rotation?: vectorObject;
		periods: periodsInterface;
		entranceEase?: string;
	}) {
		if (position && this.shipRef?.current?.position) {
			/// @ts-ignore
			gsap.to(this.shipRef.current?.position, {
				x: position.x,
				y: position.y,
				z: position.z,
				delay: periods.positionDelay / 1000,
				/// @ts-ignore
				duration: periods.entrance / 1000,
				ease: entranceEase || "power3.out",
			});
		}
		if (rotation && this.shipRef?.current?.rotation) {
			/// @ts-ignore
			gsap.to(this.shipRef.current?.rotation, {
				x: rotation.x,
				y: rotation.y,
				z: rotation.z,
				duration: (periods.entrance - periods.positionDelay) / 1000,
				ease: entranceEase || "power3.out",
			});
		}
	}
}

export default ShipAnimated;
