import React, { Fragment, useRef } from "react";
import { PerspectiveCamera, Preload, Grid } from "@react-three/drei";
import { useDispatch } from "react-redux";
import dynamic from "next/dynamic";
import AlienInvasionManager from "../../types/AlienInvasionManager";
import { useThree } from "@react-three/fiber";
// TODO: Come back and handle scroll based camera movement here.
const CuriousSpaceship = dynamic(() => import("./CuriousSpaceship"), {
	ssr: false,
});

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
	const manager = new AlienInvasionManager({
		three: three,
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
			<CuriousSpaceship manager={manager} />
			<Preload all />
		</Fragment>
	);
};

export default AlienInvasion;
