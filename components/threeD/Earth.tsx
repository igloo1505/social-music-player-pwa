import React, { useRef, useEffect } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { Sphere, Float } from "@react-three/drei";
import { TextureLoader, DoubleSide, Group, Mesh } from "three";
import IlluminatedCities from "./IlluminatedCities";
import EarthTexture_import from "../../public/threeJs/Earth_compressed/Earth-texture.jpg";
import EarthNormal_import from "../../public/threeJs/Earth_compressed/Earth_NormalNRM_6k.jpg";

import EarthGloss_import from "../../public/threeJs/Earth_compressed/Earth_Glossiness_6k.jpg";
import EarthSpecular_import from "../../public/threeJs/Earth_compressed/Earth_specular.jpg";
import Earth_Clouds_import from "../../public/threeJs/Earth_compressed/Earth_Clouds_6K.jpg";

const rotationPeriod = 240;
const cycle = (Math.PI * 2) / rotationPeriod;

const Earth = (props: any) => {
	const earthRef = useRef<Group>(null!);
	const cloudsRef = useRef<Mesh>(null!);
	const citiesRef = useRef();
	console.log("EarthTexture_import.src: ", EarthTexture_import.src);
	const [colorMap, normalMap, specularMap, cloudsMap, glossMap] = useLoader(
		TextureLoader,
		[
			EarthTexture_import.src,
			EarthNormal_import.src,
			EarthSpecular_import.src,
			Earth_Clouds_import.src,
			EarthGloss_import.src,
		]
	);

	useFrame(({ clock }) => {
		const elapsedTime = clock.getElapsedTime();
		const rotate = cycle * elapsedTime;
		earthRef.current.rotation.y = rotate;
		cloudsRef.current.rotation.y = rotate * 0.3;
	});

	return (
		<group ref={earthRef} {...props} dispose={null}>
			<Float
				speed={1}
				rotationIntensity={0}
				floatIntensity={1}
				floatingRange={[-0.05, 0.05]}
			>
				<IlluminatedCities ref={citiesRef} />
				<Sphere receiveShadow args={[101.5, 32, 32]} ref={cloudsRef}>
					<meshPhongMaterial
						map={cloudsMap}
						opacity={0.4}
						depthWrite={true}
						transparent={true}
						side={DoubleSide}
					/>
				</Sphere>
				<Sphere receiveShadow args={[100, 64, 32]}>
					<meshPhongMaterial specularMap={specularMap} />
					<meshStandardMaterial
						map={colorMap}
						normalMap={normalMap}
						metalnessMap={glossMap}
					/>
				</Sphere>
			</Float>
		</group>
	);
};

export default Earth;

// useLoader.preload(TextureLoader, [
// 	EarthTexture,
// 	EarthNormal,
// 	EarthSpecular,
// 	Earth_Clouds,
// 	EarthGloss,
// ]);
