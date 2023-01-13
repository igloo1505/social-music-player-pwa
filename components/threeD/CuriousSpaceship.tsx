import { useGLTF, PositionalAudio as PositionalSound } from "@react-three/drei";
import {
	useFrame,
	useLoader,
	useThree,
	RootState as ThreeState,
} from "@react-three/fiber";
import React, {
	useRef,
	Ref,
	Fragment,
	MutableRefObject,
	forwardRef,
	ForwardedRef,
} from "react";
import { AudioManager } from "./StandardAudioApproach";
import { Group, Vector3 } from "three";
import { RootState } from "../../state/store";
import { connect } from "react-redux";
import { positionEnum } from "../../state/positionArray";
import AlienInvasionManager from "../../types/AlienInvasionManager";
import Spaceship from "./Spaceship_Standalone";

const modelPath = "/threeJs/UFO_compressed_3.gltf";

const connector = connect(
	(state: RootState, props) => ({
		muted: state.three.audioMuted,
		hasRendered: state.three.canvasRendered,
	}),
	null,
	null,
	{
		forwardRef: true,
	}
);

interface CuriousSpaceshipProps {
	muted: boolean;
	hasRendered: boolean;
	manager: AlienInvasionManager;
}

// TODO: clean up unnecessary muted import once audioComponent is functioning
const CuriousSpaceship = connector(
	forwardRef<Group, CuriousSpaceshipProps>(
		({ muted, hasRendered, manager }, ref) => {
			const model = useGLTF(modelPath);

			model.scene.children[0].children[0].children.map((m) => {
				if (m.name === "Ufo_Ufo_Engine_2001") {
					m.visible = false;
				}
			});
			useFrame((threeState: ThreeState) => {
				if (!manager.isInitialized) return;
				manager.useFrame(threeState);
			});

			return (
				<Fragment>
					<AudioManager manager={manager} />
					<Spaceship
						position={[102, 0, 0]}
						scale={0.2}
						rotation={[Math.PI * 0.1, -Math.PI * 0.1, Math.PI * 0]}
						ref={ref}
						name="curious-spaceShip"
					/>
				</Fragment>
			);
		}
	)
);

export default CuriousSpaceship;

useGLTF.preload(modelPath);
