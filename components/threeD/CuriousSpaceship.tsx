import { Float, PositionalAudio, useGLTF, useTexture } from "@react-three/drei";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import React, {
	forwardRef,
	useState,
	useEffect,
	MutableRefObject,
	useRef,
	Ref,
} from "react";
import { AudioListener, AudioLoader, Vector3 } from "three";
import gsap from "gsap";
import { RootState } from "../../state/store";
const modelPath = "/threeJs/UFO.gltf";
import { connect } from "react-redux";
const connector = connect((state: RootState, props) => ({
	muted: state.UI.audioMuted,
}));

interface CuriousSpaceshipProps {
	muted: boolean;
}

enum positionEnum {
	curiouslyHover = "curiouslyHover",
	upClose = "upClose",
	pauseBeforeTakeoff = "pauseBeforeTakeoff",
	goProbePeople = "goProbePeople",
	hideDarkside = "hideDarkside",
}

enum audioEnum {
	decompress = "/threeJs/audio/ChambeDecompressing.mp3",
	laserBlast = "/threeJs/audio/LaserBlasts.mp3",
	powerUp = "/threeJs/audio/Power-Up.mp3",
	takeoff = "/threeJs/audio/Spaceship_Takeoff.mp3",
	cruising = "/threeJs/audio/spaceship-cruising.mp3",
	landing = "/threeJs/audio/ufo-landing.mp3",
	ufoSoundEffect = "/threeJs/audio/ufo-sound-effect.mp3",
	pulse = "/threeJs/audio/ufo_pulse.mp3",
}

interface hoverPosition {
	position: { x: number; y: number; z: number };
	rotation: { x: number; y: number; z: number };
	animation: {
		static?: (elapsed: number, ref: MutableRefObject<any>) => void;
		enter?: (elapsed: number, ref: MutableRefObject<any>) => void;
		exit?: (elapsed: number, ref: MutableRefObject<any>) => void;
	};
	entranceEase?: string;
	entranceDuration?: number;
	positionDelay?: number;
	audioPath?: audioEnum;
}

const positions: {
	curiouslyHover: hoverPosition;
	upClose: hoverPosition;
	pauseBeforeTakeoff: hoverPosition;
	goProbePeople: hoverPosition;
	hideDarkside: hoverPosition;
} = {
	curiouslyHover: {
		position: { x: 0, y: 0, z: 247 },
		rotation: { x: 0, y: 0, z: 0 },
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
		position: { x: 0, y: 0, z: 248.75 },
		rotation: { x: 0, y: 0, z: 0 },
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
		position: { x: 0, y: 0, z: 248.75 },
		rotation: { x: 0, y: 0, z: 0 },
		animation: {
			static: (elapsed: number, ref: MutableRefObject<any>) => {
				const scaleFactor = 0.005;
				ref.current.rotation.y = Math.cos(Math.PI * elapsed) * scaleFactor;
				ref.current.rotation.z = Math.cos(Math.PI * elapsed) * scaleFactor;
				ref.current.rotation.x = Math.cos(Math.PI * elapsed) * scaleFactor;
			},
		},
		entranceEase: "power3.out",
		entranceDuration: 1,
	},
	goProbePeople: {
		position: { x: -102, y: 0, z: 0 },
		rotation: { x: Math.PI * -0.5, y: Math.PI * 0.2, z: Math.PI * -0.5 },
		animation: {},
		entranceEase: "power3.out",
		entranceDuration: 3,
		positionDelay: 0.5,
	},
	hideDarkside: {
		position: { x: 102, y: 0, z: 0 },
		rotation: { x: 0, y: 0, z: 0 },
		animation: {},
		entranceEase: "power3.out",
		entranceDuration: 3,
		positionDelay: 0.5,
	},
};

const initialShipState: positionEnum = positionEnum.hideDarkside;
const initialWaitPeriod: number = 5000;

const CuriousSpaceship = connector(({ muted }: CuriousSpaceshipProps) => {
	const audioRef = useRef();
	const audioContext = new AudioContext();

	const model = useGLTF(modelPath);
	const three = useThree();
	const [
		decompress,
		laserBlast,
		powerUp,
		takeoff,
		cruising,
		landing,
		ufoSoundEffect,
		pulse,
	] = useLoader(AudioLoader, Object.values(audioEnum));
	const [currentState, setCurrentState] = useState<positionEnum>(
		positionEnum.hideDarkside
	);
	const [audioListener, setAudioListener] = useState<AudioListener>(
		new AudioListener()
	);
	const shipRef = useRef();
	console.log("model: ", model.scene.children[0].children[0].children);
	model.scene.children[0].children[0].children.map((m) => {
		if (m.name === "Ufo_Ufo_Engine_2001") {
			m.visible = false;
		}
	});
	useEffect(() => {
		console.log("Playing sound...");
		audioRef?.current?.setBuffer(ufoSoundEffect);
		audioRef?.current?.setRefDistance(1);
		audioRef?.current?.setLoop(true);
		audioRef?.current?.play();
		/// @ts-ignore
		gsap.to(shipRef.current.position, {
			x: positions[currentState].position.x,
			y: positions[currentState].position.y,
			z: positions[currentState].position.z,
			delay: positions[currentState].positionDelay || 0,
			/// @ts-ignore
			duration: positions?.[currentState]?.entranceDuration * 0.2 || 1,
			ease: positions[currentState].entranceEase || "power3.out",
		});
		/// @ts-ignore
		gsap.to(shipRef.current.rotation, {
			x: positions[currentState].rotation.x,
			y: positions[currentState].rotation.y,
			z: positions[currentState].rotation.z,
			duration: positions[currentState].entranceDuration || 1,
			ease: positions[currentState].entranceEase || "power3.out",
		});
	}, [currentState]);
	useEffect(() => {
		// const audioListener = new AudioListener();
		if (typeof window === "undefined") return;
		let context = three.gl.getContext();
		three.camera.add(audioListener);
		audioContext.createBufferSource(audioRef.current);
		setTimeout(() => {
			setCurrentState(positionEnum.curiouslyHover);
		}, initialWaitPeriod);
		setTimeout(() => {
			setCurrentState(positionEnum.pauseBeforeTakeoff);
		}, initialWaitPeriod + 5000);
		setTimeout(() => {
			setCurrentState(positionEnum.goProbePeople);
		}, initialWaitPeriod + 9000);
	}, []);

	useFrame(({ clock, ...threeState }) => {
		// console.log("clock: ", clock);
		// console.log("threeState: ", threeState);
		const elapsed = clock.getElapsedTime();
		if (positions?.[currentState].animation?.static) {
			/// @ts-ignore
			positions[currentState].animation.static(elapsed, shipRef);
		}
	});

	return (
		<group
			position={
				Object.values(
					positions[initialShipState].position
				) as unknown as Vector3
			}
			scale={0.2}
			rotation={[Math.PI * 0.1, -Math.PI * 0.1, Math.PI * 0]}
			ref={shipRef as Ref<any>}
		>
			<PositionalAudio
				ref={audioRef}
				url={positions[currentState].audioPath || audioEnum.ufoSoundEffect}
				distance={10000}
				position={
					Object.values(
						positions[initialShipState].position
					) as unknown as Vector3
				}
				autoplay={false}
				loop
				args={[audioListener]}
			/>
			<primitive object={model.scene} />
		</group>
	);
});

export default CuriousSpaceship;

useGLTF.preload(modelPath);
// useLoader.preload(TextureLoader, textures);
