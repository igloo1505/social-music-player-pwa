import React, {
	useRef,
	useEffect,
	useState,
	MutableRefObject,
	forwardRef,
} from "react";
import { TextureLoader } from "three";
import { Sphere } from "@react-three/drei";
import Earth_Illumination_6K from "../../public/threeJs/Earth_compressed/Earth_Illumination_6K.jpg";
import { useLoader } from "@react-three/fiber";
interface IlluminatedCitiesProps {
	ref: MutableRefObject<any>;
}

const IlluminatedCities = forwardRef(
	(props: IlluminatedCitiesProps, ref: MutableRefObject<any> | any) => {
		const citiesMap = useLoader(TextureLoader, Earth_Illumination_6K.src);
		return (
			<Sphere receiveShadow args={[101, 32, 32]} ref={ref}>
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
	}
);

export default IlluminatedCities;
