import { RootState } from "@react-three/fiber";
import { phaseEnum } from "../../types/AudioHandler";
import { periodsInterface, vectorObject } from "../../types/Position";
import gsap from "gsap";
import { MutableRefObject } from "react";
import { positionEnum } from "../../state/positionArray";

interface ShipAnimatedProps {
	main: (elapased: number, ref: MutableRefObject<any>) => void;
	entrance: (elapased: number, ref: MutableRefObject<any>) => void;
	preExit: (elapased: number, ref: MutableRefObject<any>) => void;
	name: positionEnum;
}

class ShipAnimated {
	ref?: MutableRefObject<any>;
	main: (elapased: number, ref: MutableRefObject<any>) => void;
	entrance: (elapased: number, ref: MutableRefObject<any>) => void;
	preExit: (elapased: number, ref: MutableRefObject<any>) => void;
	phase: phaseEnum;
	name: positionEnum;
	constructor({ main, entrance, preExit, name }: ShipAnimatedProps) {
		this.main = main;
		this.preExit = preExit;
		this.entrance = entrance;
		this.phase = phaseEnum.entrance;
		this.name = name;
	}
	setRef(ref: MutableRefObject<any>) {
		this.ref = ref;
	}
	useFrame(state: RootState, currentPosition: positionEnum) {
		const elapsed = state.clock.getElapsedTime();
		if (currentPosition !== this.name) {
			debugger;
		}
		if (!this.ref) return;
		// console.log("this.phase: ", this.phase);
		// console.log("elapsed: ", elapsed);
		if (this.phase === phaseEnum.entrance && this?.entrance) {
			this.entrance(elapsed, this.ref);
		}
		if (this.phase === phaseEnum.main && this?.main) {
			this.main(elapsed, this.ref);
		}
		if (this.phase === phaseEnum.preExit && this?.preExit) {
			this.preExit(elapsed, this.ref);
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
		if (position) {
			/// @ts-ignore
			gsap.to(this.ref.current?.position, {
				x: position.x,
				y: position.y,
				z: position.z,
				delay: periods.positionDelay / 1000,
				/// @ts-ignore
				duration: periods.entrance / 1000,
				ease: entranceEase || "power3.out",
			});
		}
		if (rotation) {
			/// @ts-ignore
			gsap.to(this.ref.current?.rotation, {
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
