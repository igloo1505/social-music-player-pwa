import React, { useRef, useEffect } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { Sphere, Float } from "@react-three/drei";
import { TextureLoader, DoubleSide, Group, Mesh } from "three";
// import GetThreeJsInfo from "./GetThreeJsInfo";
import IlluminatedCities from "./IlluminatedCities";
import AlienInvasionManager from "../../types/AlienInvasionManager";

// compressed
const EarthTexture = "/threeJs/Earth_compressed/Earth-texture.jpg";
const EarthNormal = "/threeJs/Earth_compressed/Earth_NormalNRM_6k.jpg";
const EarthGloss = "/threeJs/Earth_compressed/Earth_Glossiness_6k.jpg";
const EarthSpecular = "/threeJs/Earth_compressed/Earth_specular.jpg";
const Earth_Clouds = "/threeJs/Earth_compressed/Earth_Clouds_6K.jpg";
const rotationPeriod = 240;
const cycle = (Math.PI * 2) / rotationPeriod;

const Earth = (props: any) => {
	const earthRef = useRef<Group>(null!);
	const cloudsRef = useRef<Mesh>(null!);
	const citiesRef = useRef();
	const [colorMap, normalMap, specularMap, cloudsMap, glossMap] = useLoader(
		TextureLoader,
		[EarthTexture, EarthNormal, EarthSpecular, Earth_Clouds, EarthGloss]
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

useLoader.preload(TextureLoader, [
	EarthTexture,
	EarthNormal,
	EarthSpecular,
	Earth_Clouds,
	EarthGloss,
]);
