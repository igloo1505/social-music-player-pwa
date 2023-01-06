import { createRoot } from "react-dom/client";
import React, { useRef, useState, Fragment, Suspense } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Sphere, useTexture, Float, useGLTF } from "@react-three/drei";
import { AnimationClip, VectorKeyframeTrack } from "three";
import GetThreeJsInfo from "./GetThreeJsInfo";

const modelPath = "/threeJs/Earth.gltf";
const earthTexturePath = "/threeJs/Earth-texture.jpeg";
const rotationPeriod = 120;
const Earth = (props: any) => {
	const model = useGLTF(modelPath);
	const earthRef = useRef();
	const texture = useTexture(earthTexturePath);
	GetThreeJsInfo();
	useFrame(({ clock }) => {
		const cycle = (Math.PI * 2) / rotationPeriod;
		const elapsedTime = clock.getElapsedTime();
		const rotate = cycle * elapsedTime;
		console.log("elapsedTime: ", elapsedTime);
		console.log("rotate: ", rotate);
		/// @ts-ignore
		earthRef.current.rotation.y = rotate;
	});
	return (
		<Suspense>
			<group ref={earthRef} {...props} dispose={null}>
				<Float
					speed={1} // Animation speed, defaults to 1
					rotationIntensity={0} // XYZ rotation intensity, defaults to 1
					floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
					floatingRange={[-0.05, 0.05]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
				>
					<Sphere castShadow receiveShadow rotation={[0.43, 0, 0]}>
						<meshStandardMaterial map={texture} />
					</Sphere>
				</Float>
			</group>
		</Suspense>
	);
};

export default Earth;
