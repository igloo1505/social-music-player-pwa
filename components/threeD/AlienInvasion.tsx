import React, { Fragment, useRef } from "react";
import { PerspectiveCamera, Preload, Grid } from "@react-three/drei";
import { useDispatch } from "react-redux";
import dynamic from "next/dynamic";
import AlienInvasionManager from "../../types/AlienInvasionManager";
import { useThree } from "@react-three/fiber";
import { Group, PositionalAudio } from "three";
// TODO: Come back and handle scroll based camera movement here.
import CuriousSpaceship from "./CuriousSpaceship";
import { PositionalAudioSource } from "../../types/PositionalAudioSource";

const Earth = dynamic(() => import("./Earth"), {
	ssr: false,
});

const initialCameraPosition: { x: number; y: number; z: number } = {
	x: 0,
	y: 0,
	z: 250,
};

interface AlienInvasionProps {}

const AlienInvasion = ({}: AlienInvasionProps) => {
	const three = useThree();
	const ref = useRef<Group>(null!);
	// PositionalAudioRefs
	const positionalAudioRef0 = useRef<PositionalAudioSource>(null!);
	const positionalAudioRef1 = useRef<PositionalAudioSource>(null!);
	const positionalAudioRef2 = useRef<PositionalAudioSource>(null!);
	const positionalAudioRef3 = useRef<PositionalAudioSource>(null!);
	const positionalAudioRef4 = useRef<PositionalAudioSource>(null!);
	const audioRefs = [
		positionalAudioRef0,
		positionalAudioRef1,
		positionalAudioRef2,
		positionalAudioRef3,
		positionalAudioRef4,
	];
	const manager = new AlienInvasionManager({
		three: three,
		shipRef: ref,
		audioRefs: audioRefs,
	});
	return (
		<Fragment>
			<PerspectiveCamera
				makeDefault
				position={
					Object.values(initialCameraPosition) as [number, number, number]
				}
			/>
			<directionalLight intensity={1} position={[-300, 140, 0]} />
			<Earth />
			<CuriousSpaceship manager={manager} ref={ref} />
			<Preload all />
		</Fragment>
	);
};

export default AlienInvasion;
