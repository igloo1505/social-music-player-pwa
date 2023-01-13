import { useGLTF, PositionalAudio as PositionalSound } from "@react-three/drei";
import { useFrame, RootState as ThreeState } from "@react-three/fiber";
import React, { Fragment, forwardRef, useEffect } from "react";
import { Group } from "three";
import { RootState } from "../../state/store";
import { connect } from "react-redux";
import AlienInvasionManager from "../../types/AlienInvasionManager";
import Spaceship from "./Spaceship_Standalone";

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
			useFrame((threeState: ThreeState) => {
				if (!manager.isInitialized) return;
				manager.useFrame(threeState);
			});
			useEffect(() => {
			muted && manager.audio.mute()
			!muted && manager.audio.unMute()
			}, [muted])

			return (
				<Fragment>
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
