import { RootState } from "@react-three/fiber";
import AudioHandler, { phaseEnum } from "./AudioHandler";
import Position from "./Position";
import positionArray, { positionEnum } from "../state/positionArray";
import { MutableRefObject } from "react";
import { Group } from "three";
import { PositionalAudioSource } from "./PositionalAudioSource";

class AlienInvasionManager {
	audio: AudioHandler;
	three: RootState;
	initialPositionKey: positionEnum = positionEnum.hideDarkside;
	positions: Position[];
	currentPosition: Position;
	previousPosition: positionEnum | null = null;
	shipRef: MutableRefObject<any>;
	isInitialized: boolean = false;
	initializedPositions: boolean[] = [];
	constructor({
		three,
		shipRef,
		audioRefs,
	}: {
		three: RootState;
		shipRef: MutableRefObject<Group>;
		audioRefs: MutableRefObject<PositionalAudioSource>[];
	}) {
		this.three = three;
		this.shipRef = shipRef;
		this.positions = positionArray.map(
			(d) =>
				new Position({
					...d,
					manager: this,
					shipRef: shipRef,
				})
		);
		let _initialPosition =
			this.getPositionFromEnum(positionEnum.hideDarkside) || this.positions[0];
		this.audio = new AudioHandler(three, shipRef, audioRefs, this);
		this.currentPosition = _initialPosition;
		this.beginSequence();
	}
	pushInitialized() {
		this.initializedPositions.push(true);
		// NOTE: + 1 to account for all positions plus audioManager
		if (this.initializedPositions.length === positionArray.length + 1) {
			// TODO: Make sure audio is initlialized here as well...
			this.isInitialized = true;
		}
	}
	nextPositionCallback(p: positionEnum) {
		const newPosition = this.getPositionFromEnum(p);
		this.setNewPosition(newPosition);
	}
	getPositionFromEnum(query: positionEnum) {
		return this.positions.filter((d) => d.name === query)[0];
	}
	private setNewPosition(position: Position) {
		this.audio.updateCurrentPosition(position, phaseEnum.entrance);
		this.currentPosition = position;
	}
	private beginSequence() {
		if (!this.isInitialized) {
			return setTimeout(() => {
				this.beginSequence();
			}, 250);
		}
		this.setNewPosition(this.currentPosition);
	}
	useFrame(state: RootState) {
		!this.currentPosition.activated && this.currentPosition.activate();
		this.currentPosition.animation.useFrame(state, this.currentPosition.name);
	}
}

export default AlienInvasionManager;
