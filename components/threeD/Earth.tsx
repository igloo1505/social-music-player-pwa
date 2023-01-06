import { createRoot } from "react-dom/client";
import React, { useRef, useState, Fragment, Suspense } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Sphere, useTexture, Float, useGLTF } from "@react-three/drei";
import { TextureLoader, DoubleSide } from "three";
import GetThreeJsInfo from "./GetThreeJsInfo";
// import EarthTexture from "../../public/threeJs/Earth-texture.jpeg";
// import EarthNormal from "../../public/threeJs/Earth_NormalNRM_6k.jpg";
// import EarthGloss from "../../public/threeJs/Earth_Glossiness_6k.jpg";
// import EarthSpecular from "../../public/threeJs/Earth_specular.jpg";
// import Earth_Clouds from "../../public/threeJs/Earth_Clouds_6K.jpg";
const EarthTexture = "/threeJs/Earth-texture.jpeg";
const EarthNormal = "/threeJs/Earth_NormalNRM_6k.jpg";
const EarthGloss = "/threeJs/Earth_Glossiness_6k.jpg";
const EarthSpecular = "/threeJs/Earth_specular.jpg";
const Earth_Clouds = "/threeJs/Earth_Clouds_6K.jpg";
const rotationPeriod = 180;

const Earth = (props: any) => {
	const earthRef = useRef();
	const cloudsRef = useRef();
	const [colorMap, normalMap, specularMap, cloudsMap, glossMap] = useLoader(
		TextureLoader,
		[EarthTexture, EarthNormal, EarthSpecular, Earth_Clouds, EarthGloss]
	);
	GetThreeJsInfo();
	useFrame(({ clock }) => {
		const cycle = (Math.PI * 2) / rotationPeriod;
		const elapsedTime = clock.getElapsedTime();
		const rotate = cycle * elapsedTime;
		/// @ts-ignore
		earthRef.current.rotation.y = rotate;
		/// @ts-ignore
		cloudsRef.current.rotation.y = rotate * 0.3;
	});
	return (
		<Suspense fallback={null}>
			<group ref={earthRef} {...props} dispose={null}>
				<Float
					speed={1} // Animation speed, defaults to 1
					rotationIntensity={0} // XYZ rotation intensity, defaults to 1
					floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
					floatingRange={[-0.05, 0.05]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
				>
					<Sphere receiveShadow args={[1.01, 32, 32]} ref={cloudsRef}>
						<meshPhongMaterial
							map={cloudsMap}
							opacity={0.4}
							depthWrite={true}
							transparent={true}
							side={DoubleSide}
						/>
					</Sphere>
					<Sphere receiveShadow args={[1, 64, 32]}>
						<meshPhongMaterial specularMap={specularMap} />
						<meshStandardMaterial
							map={colorMap}
							normalMap={normalMap}
							metalnessMap={glossMap}
						/>
					</Sphere>
				</Float>
			</group>
		</Suspense>
	);
};

export default Earth;

// useTexture.preload(textures);
