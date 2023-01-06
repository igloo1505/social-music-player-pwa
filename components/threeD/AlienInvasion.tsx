import { createRoot } from "react-dom/client";
import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Preload, Grid } from "@react-three/drei";
import Earth from "./Earth";
import { Light } from "three";
import { Renderer } from "three";
interface AlienInvasionProps {}

const AlienInvasion = ({}: AlienInvasionProps) => {
	// const renderer =

	return (
		<Canvas>
			<Suspense fallback={null}>
				<Preload all />
				<PerspectiveCamera makeDefault position={[0, 0, 2.5]} />
				<directionalLight intensity={1} position={[-3, 1.4, 0]} />
				<Earth />
			</Suspense>
		</Canvas>
	);
};

export default AlienInvasion;
