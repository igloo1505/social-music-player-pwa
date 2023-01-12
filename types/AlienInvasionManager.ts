import { RootState } from "@react-three/fiber";
import AudioHandler from "./AudioHandler";
import Position from "./Position";
import positionArray, { positionEnum } from "../state/positionArray";
import { MutableRefObject } from "react";

class AlienInvasionManager {
	audio: AudioHandler;
	three: RootState;
	initialPositionKey: positionEnum = positionEnum.hideDarkside;
	positions: Position[] = positionArray.map(
		(d) =>
			new Position({
				...d,
				manager: this,
			})
	);
	currentPosition: Position;
	previousPosition: positionEnum;
	shipRef?: MutableRefObject<any>;
	constructor({
		initialPosition,
		three,
	}: {
		initialPosition?: Position;
		three: RootState;
	}) {
		this.three = three;
		let _initialPosition =
			this.getPositionFromEnum(positionEnum.hideDarkside) || this.positions[0];
		this.audio = new AudioHandler(_initialPosition, three);
		this.currentPosition = _initialPosition;
	}
	setShipRef(shipRef: MutableRefObject<any>) {
		// debugger;
		this.shipRef = shipRef;
		this.setRefs();
	}
	nextPositionCallback(p: positionEnum) {
		const newPosition = this.getPositionFromEnum(p);
		console.log("newPosition: ", newPosition);
		this.setNewPosition(newPosition);
	}
	getPositionFromEnum(query: positionEnum) {
		return this.positions.filter((d) => d.name === query)[0];
	}
	private setNewPosition(position: Position) {
		console.log("setNewPosition: ", position);
		this.currentPosition = position;
		this.audio.updateCurrentPosition(position);
		// this.currentPosition.activate();
	}
	private setRefs() {
		this.shipRef &&
			this.positions.forEach((p) => {
				p.setRef(this.shipRef!);
			});
		this.beginSequence();
	}
	private beginSequence() {
		this.setNewPosition(this.currentPosition);
	}
	useFrame(state: RootState) {
		console.log(this.currentPosition.name);
		if (!this.currentPosition.activated) {
			this.currentPosition.activate();
		}
		this.currentPosition.animation.useFrame(state, this.currentPosition.name);
	}
}

export default AlienInvasionManager;
