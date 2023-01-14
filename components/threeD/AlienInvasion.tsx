import React, { Fragment, useRef, useEffect } from "react";
import { PerspectiveCamera, Preload, Grid } from "@react-three/drei";
import { useDispatch } from "react-redux";
import dynamic from "next/dynamic";
import AlienInvasionManager from "../../types/AlienInvasionManager";
import { Vector3, useThree } from "@react-three/fiber";
import {
	Camera,
	Group,
	PerspectiveCamera as _PerspectiveCamera,
	PositionalAudio,
} from "three";
// TODO: Come back and handle scroll based camera movement here.
import CuriousSpaceship from "./CuriousSpaceship";
import { PositionalAudioSource } from "../../types/PositionalAudioSource";
import { handleScrollPosition } from "../../animation/scrollEarth";
const Earth = dynamic(() => import("./Earth"), {
	ssr: false,
});

const initialCameraPosition = [0, 0, 250] as Vector3;
interface AlienInvasionProps {}

const AlienInvasion = ({}: AlienInvasionProps) => {
	const three = useThree();
	const ref = useRef<Group>(null!);
	const camera = useRef<_PerspectiveCamera>(null!);
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

	useEffect(() => {
		if (typeof window === "undefined") return;
		window.addEventListener("scroll", (e) => handleScrollPosition(e, camera));
	}, []);

	return (
		<Fragment>
			<PerspectiveCamera
				makeDefault
				position={initialCameraPosition}
				ref={camera}
			/>
			<directionalLight intensity={1} position={[-300, 140, 0]} />
			<Earth />
			<CuriousSpaceship manager={manager} ref={ref} />
			<Preload all />
		</Fragment>
	);
};

export default AlienInvasion;
