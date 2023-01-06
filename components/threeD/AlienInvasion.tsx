import React, { Fragment, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Preload, Grid } from "@react-three/drei";
import { Loader } from "@react-three/drei";
import { useDispatch } from "react-redux";
// import Earth from "./Earth";
import dynamic from "next/dynamic";

const Earth = dynamic(() => import("./Earth"), {
	ssr: false,
});
interface AlienInvasionProps {}
const AlienInvasion = ({}: AlienInvasionProps) => {
	const dispatch = useDispatch();
	const handleCanvasLoaded = () => {
		dispatch({
			type: "SET_CANVAS_RENDERED",
			payload: true,
		});
	};
	return (
		<Fragment>
			<Canvas
				gl={{ logarithmicDepthBuffer: true }}
				onCreated={handleCanvasLoaded}
			>
				<PerspectiveCamera makeDefault position={[0, 0, 2.5]} />
				<directionalLight intensity={1} position={[-3, 1.4, 0]} />
				<Earth />
				<Preload all />
			</Canvas>
			<Loader />
		</Fragment>
	);
};

export default AlienInvasion;
