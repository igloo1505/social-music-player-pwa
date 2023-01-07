import { Float, useGLTF, useTexture } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import React, {
	forwardRef,
	useState,
	useEffect,
	MutableRefObject,
	useRef,
} from "react";
import { TextureLoader } from "three";
const modelPath = "/threeJs/UFO.gltf";

interface CuriousSpaceshipProps {}

interface hoverPosition {
	position: [number, number, number];
	rotation: [number, number, number];
	animation: {
		static: (elapsed: number, ref: MutableRefObject<any>) => void;
		enter?: (elapsed: number, ref: MutableRefObject<any>) => void;
		exit?: (elapsed: number, ref: MutableRefObject<any>) => void;
	};
}

const positions: {
	curiouslyHover: hoverPosition;
	upClose: hoverPosition;
	pauseBeforeTakeoff: hoverPosition;
} = {
	curiouslyHover: {
		position: [0, 0, 247],
		rotation: [0, 0, 0],
		animation: {
			static: (elapsed: number, ref: MutableRefObject<any>) => {
				const scaleFactor = 0.75;
				/// @ts-ignore
				ref.current.rotation.y = Math.PI * elapsed * scaleFactor;
				/// @ts-ignore
				ref.current.rotation.x = Math.cos(Math.PI * elapsed) * 0.25;
				ref.current.position.y = Math.cos(Math.PI * 0.2 * elapsed) * 0.1;
			},
		},
	},
	upClose: {
		position: [0, 0, 249],
		rotation: [0, 0, 0],
		animation: {
			static: (elapsed: number, ref: MutableRefObject<any>) => {
				const scaleFactor = 0.05;
				ref.current.rotation.y = Math.cos(Math.PI * elapsed) * scaleFactor;
				ref.current.rotation.z = Math.cos(Math.PI * elapsed) * scaleFactor;
				ref.current.rotation.x = Math.cos(Math.PI * elapsed) * scaleFactor;
				ref.current.position.y = Math.cos(Math.PI * 0.2 * elapsed) * 0.03;
				ref.current.position.x = Math.cos(Math.PI * 0.2 * elapsed) * 0.01;
			},
		},
	},
	pauseBeforeTakeoff: {
		position: [0, 0, 249],
		rotation: [0, 0, 0],
		animation: {
			static: (elapsed: number, ref: MutableRefObject<any>) => {
				const scaleFactor = 0.01;
				ref.current.rotation.y = Math.cos(Math.PI * elapsed) * scaleFactor;
				ref.current.rotation.z = Math.cos(Math.PI * elapsed) * scaleFactor;
				ref.current.rotation.x = Math.cos(Math.PI * elapsed) * scaleFactor;
			},
		},
	},
};

const CuriousSpaceship = forwardRef((props: CuriousSpaceshipProps) => {
	const model = useGLTF(modelPath);
	const shipRef = useRef();
	console.log("model: ", model.scene.children[0].children[0].children);
	model.scene.children[0].children[0].children.map((m) => {
		if (m.name === "Ufo_Ufo_Engine_2001") {
			m.visible = false;
		}
	});

	useFrame(({ clock, ...threeState }) => {
		console.log("threeState: ", threeState);
		const elapsed = clock.getElapsedTime();
		// positions?.curiouslyHover?.animation?.static(elapsed, shipRef);
		positions?.upClose?.animation?.static(elapsed, shipRef);
		// positions?.pauseBeforeTakeoff?.animation?.static(elapsed, shipRef);
	});

	return (
		<group
			position={positions.upClose.position}
			scale={0.2}
			rotation={[Math.PI * 0.1, -Math.PI * 0.1, Math.PI * 0]}
			/// @ts-ignore
			ref={shipRef}
		>
			<primitive object={model.scene} />
		</group>
	);
});

export default CuriousSpaceship;

useGLTF.preload(modelPath);
// useLoader.preload(TextureLoader, textures);
