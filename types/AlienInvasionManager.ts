import { RootState } from "@react-three/fiber";
import AudioHandler from "./AudioHandler";
import Position from "./Position";
import PositionArray from "../state/positionArray";
import { MutableRefObject } from "react";

class AlienInvasionManager {
	audio: AudioHandler;
	three: RootState;
	positionArray: PositionArray;
	currentPosition: Position;
	previousPositions: Position[] = [];
	shipRef?: MutableRefObject<any>;
	constructor({
		initialPosition,
		three,
	}: {
		initialPosition?: Position;
		three: RootState;
	}) {
		this.positionArray = new PositionArray();
		let _initialPosition = initialPosition || this.positionArray.data[0];
		this.audio = new AudioHandler(_initialPosition);
		this.currentPosition = _initialPosition;
		this.three = three;
	}
	setShipRef(shipRef: MutableRefObject<any>) {
		this.shipRef = shipRef;
		this.setRefs();
	}
	private setNewPosition(position: Position) {
		this.previousPositions.push(this.currentPosition);
		this.currentPosition = position;
		this.audio.updateCurrentPosition(position);
		this.handleTimeout();
	}
	private setRefs() {
		this.shipRef &&
			this.positionArray.data.forEach((p) => p.setRef(this.shipRef!));
	}
	private handleTimeout() {
		// this.audio.
		let totalPeriod = this.currentPosition.getTotalPeriod();
		let nextPos = this.currentPosition.getNextInSequence(
			this.positionArray.data
		);
		if (nextPos) {
			//TODO: Add whatever that timeout handler api was called here in the AM.
			setTimeout(() => {
				this.setNewPosition(nextPos!);
			}, totalPeriod);
		}
	}
}

export default AlienInvasionManager;
