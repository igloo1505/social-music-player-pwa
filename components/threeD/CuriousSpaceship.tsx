import { useGLTF, PositionalAudio as PositionalSound } from "@react-three/drei";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import React, {
	useState,
	useEffect,
	MutableRefObject,
	useRef,
	Ref,
	Fragment,
} from "react";
import { AudioManager } from "./StandardAudioApproach";
import { Vector3 } from "three";
import gsap from "gsap";
import { RootState } from "../../state/store";
const modelPath = "/threeJs/UFO.gltf";
import { connect } from "react-redux";
import Position from "../../types/Position";
import PositionArray, {
	positionEnum,
	audioEnum,
} from "../../state/positionArray";

const connector = connect((state: RootState, props) => ({
	muted: state.three.audioMuted,
	hasRendered: state.three.canvasRendered,
}));

interface CuriousSpaceshipProps {
	muted: boolean;
	hasRendered: boolean;
}

// Currently in use:
// laserBlast
// powerUp
// ufoSoundEffect

const initialShipState: positionEnum = positionEnum.hideDarkside;
// const initialWaitPeriod: number = 5000;
// TODO: clean up unnecessary muted import once audioComponent is functioning
const CuriousSpaceship = connector(
	({ muted, hasRendered }: CuriousSpaceshipProps) => {
		const model = useGLTF(modelPath);
		const positionArray = new PositionArray();
		const [currentPosition, setCurrentPosition] = useState<Position>(
			positionArray.getPositionFromEnumKey(positionEnum.hideDarkside)
		);
		const [currentAudioBuffer, setCurrentAudioBuffer] = useState<audioEnum>(
			audioEnum.ufoSoundEffect
		);
		const shipRef = useRef();

		model.scene.children[0].children[0].children.map((m) => {
			if (m.name === "Ufo_Ufo_Engine_2001") {
				m.visible = false;
			}
		});
		useEffect(() => {
			if (currentPosition.position) {
				/// @ts-ignore
				gsap.to(shipRef.current.position, {
					x: currentPosition.position.x,
					y: currentPosition.position.y,
					z: currentPosition.position.z,
					delay: currentPosition?.positionDelay
						? currentPosition?.positionDelay / 1000
						: 0,
					/// @ts-ignore
					duration: currentPosition?.entranceDuration / 1000 || 1,
					ease: currentPosition.entranceEase || "power3.out",
				});
			}
			if (currentPosition.rotation) {
				/// @ts-ignore
				gsap.to(shipRef.current.rotation, {
					x: currentPosition.rotation.x,
					y: currentPosition.rotation.y,
					z: currentPosition.rotation.z,
					duration: currentPosition.rotationDuration
						? currentPosition.rotationDuration / 1000
						: 1,
					ease: currentPosition.entranceEase || "power3.out",
				});
			}
		}, [currentPosition]);
		// NOTE: Handle animation timing here:
		useEffect(() => {
			if (typeof window === "undefined") return;
			console.log("Setting state with: ", currentPosition);
			console.log("next in sequence: ", currentPosition.nextInSequence);
			console.log("stay period: ", currentPosition.stayPeriod);
			const _delay = currentPosition.getTotalPeriod();
			setTimeout(() => {
				let next = currentPosition.getNextInSequence(positionArray.data);
				next && setCurrentPosition(next);
			}, _delay);
		}, [currentPosition]);
		useFrame(({ clock, ...threeState }) => {
			// console.log("clock: ", clock);
			// console.log("threeState: ", threeState);
			if (currentPosition.stay) return;
			const elapsed = clock.getElapsedTime();
			if (currentPosition.animation?.static) {
				/// @ts-ignore
				currentPosition.animation.static(elapsed, shipRef);
			}
		});

		return (
			<Fragment>
				<AudioManager
					currentPosition={currentPosition}
					currentAudioBuffer={currentAudioBuffer}
					setBuffer={setCurrentAudioBuffer}
				/>
				<group
					position={
						Object.values(
							positionArray.getPositionFromEnumKey(initialShipState).position!
						) as unknown as Vector3
					}
					scale={0.2}
					rotation={[Math.PI * 0.1, -Math.PI * 0.1, Math.PI * 0]}
					ref={shipRef as Ref<any>}
					name="curious-spaceShip"
				>
					<primitive object={model.scene} />
				</group>
			</Fragment>
		);
	}
);

export default CuriousSpaceship;

useGLTF.preload(modelPath);
