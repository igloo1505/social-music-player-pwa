import { useGLTF, PositionalAudio as PositionalSound } from "@react-three/drei";
import {
	useFrame,
	useLoader,
	useThree,
	RootState as ThreeState,
} from "@react-three/fiber";
import React, { useRef, Ref, Fragment } from "react";
import { AudioManager } from "./StandardAudioApproach";
import { Vector3 } from "three";
import { RootState } from "../../state/store";
import { connect } from "react-redux";
import { positionEnum } from "../../state/positionArray";
import AlienInvasionManager from "../../types/AlienInvasionManager";

const modelPath = "/threeJs/UFO_compressed_3.gltf";

const connector = connect((state: RootState, props) => ({
	muted: state.three.audioMuted,
	hasRendered: state.three.canvasRendered,
}));

interface CuriousSpaceshipProps {
	muted: boolean;
	hasRendered: boolean;
	manager: AlienInvasionManager;
}

// Currently in use:
// laserBlast
// powerUp
// ufoSoundEffect

const initialShipState: positionEnum = positionEnum.hideDarkside;
// const initialWaitPeriod: number = 5000;
// TODO: clean up unnecessary muted import once audioComponent is functioning
const CuriousSpaceship = connector(
	({ muted, hasRendered, manager }: CuriousSpaceshipProps) => {
		const model = useGLTF(modelPath);
		const shipRef = useRef();
		manager.setShipRef(shipRef);
		console.log("model: ", model);

		model.scene.children[0].children[0].children.map((m) => {
			if (m.name === "Ufo_Ufo_Engine_2001") {
				m.visible = false;
			}
		});
		useFrame((threeState: ThreeState) => {
			manager.useFrame(threeState);
			// const elapsed = clock.getElapsedTime();
			// if (currentPosition.animation?.static) {
			// 	/// @ts-ignore
			// 	currentPosition.animation.static(elapsed, shipRef);
			// }
		});

		return (
			<Fragment>
				<AudioManager manager={manager} />
				<group
					position={
						Object.values(
							manager.getPositionFromEnum(initialShipState).position!
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
