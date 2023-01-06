import React, { useRef, useEffect, useState, MutableRefObject } from "react";
import { Sphere, useTexture } from "@react-three/drei";

interface IlluminatedCitiesProps {
	ref: MutableRefObject<any>;
}

const IlluminatedCities = ({ ref }: IlluminatedCitiesProps) => {
	const citiesMap = useTexture("/threeJs/Earth_Illumination_6K.jpg");
	return (
		<Sphere receiveShadow args={[1.01, 32, 32]} ref={ref}>
			<meshPhysicalMaterial
				emissiveMap={citiesMap}
				emissiveIntensity={8}
				emissive={"#fff"}
				// metalness={10}
				opacity={0.35}
				// depthWrite={true}
				transparent={true}
			/>
		</Sphere>
	);
};

export default IlluminatedCities;
