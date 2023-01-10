import { useGLTF, PositionalAudio as PositionalSound } from "@react-three/drei";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import React, {
	useState,
	useEffect,
	MutableRefObject,
	useRef,
	Ref,
	Fragment,
} from "react";
import { AudioManager } from "./StandardAudioApproach";
import { Vector3 } from "three";
import gsap from "gsap";
import { RootState } from "../../state/store";
const modelPath = "/threeJs/UFO.gltf";
import { connect } from "react-redux";
import { audioShouldPlay, initAudio } from "./StandardAudioApproach";

const connector = connect((state: RootState, props) => ({
	muted: state.three.audioMuted,
	hasRendered: state.three.canvasRendered,
}));

interface CuriousSpaceshipProps {
	muted: boolean;
	hasRendered: boolean;
}

export enum positionEnum {
	curiouslyHover = "curiouslyHover",
	upClose = "upClose",
	pauseBeforeTakeoff = "pauseBeforeTakeoff",
	goProbePeople = "goProbePeople",
	hideDarkside = "hideDarkside",
	stay = "stay",
}

export enum audioEnum {
	decompress = "threeJs/audio/ChamberDecompressing.mp3",
	laserBlast = "threeJs/audio/LaserBlasts.mp3",
	powerUp = "threeJs/audio/Power-Up.mp3",
	takeoff = "threeJs/audio/Spaceship_Takeoff.mp3",
	cruising = "threeJs/audio/spaceship-cruising.mp3",
	landing = "threeJs/audio/ufo-landing.mp3",
	ufoSoundEffect = "threeJs/audio/ufo-sound-effect.mp3",
	pulse = "threeJs/audio/ufo_pulse.mp3",
}

interface audioProps {
	mainAudioPath: audioEnum;
	entranceAudioPath?: audioEnum;
	exitAudioPath?: audioEnum;
	preExitAudioPath?: audioEnum;
	exitAudioPeriod?: number;
	entranceAudioPeriod?: number;
	preExitPeriod?: number;
}

export interface hoverPosition {
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
	audioProps?: audioProps;
	rotationDuration?: number;
	stayPeriod: number;
	nextInSequence: positionEnum;
}

export const positions: {
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
		audioProps: {
			mainAudioPath: audioEnum.ufoSoundEffect,
			entranceAudioPath: audioEnum.laserBlast,
			entranceAudioPeriod: 1000,
			preExitAudioPath: audioEnum.powerUp,
			preExitPeriod: 2000,
		},
		stayPeriod: 7000,
		nextInSequence: positionEnum.upClose,
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
		audioProps: {
			mainAudioPath: audioEnum.ufoSoundEffect,
			preExitAudioPath: audioEnum.powerUp,
			preExitPeriod: 2000,
			exitAudioPath: audioEnum.pulse,
			exitAudioPeriod: 3000,
		},
		entranceDuration: 350,
		stayPeriod: 5000,
		nextInSequence: positionEnum.pauseBeforeTakeoff,
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
		// audioPath: audioEnum.powerUp,
		audioProps: {
			mainAudioPath: audioEnum.ufoSoundEffect,
		},
		entranceEase: "power3.out",
		entranceDuration: 1000,
		stayPeriod: 10000,
		nextInSequence: positionEnum.goProbePeople,
	},
	goProbePeople: {
		position: { x: -102, y: 0, z: 0 },
		rotation: { x: Math.PI * -0.35, y: Math.PI * 0.3, z: Math.PI * -0.35 },
		animation: {},
		entranceEase: "power3.out",
		entranceDuration: 3000,
		positionDelay: 1000,
		// audioPath: audioEnum.laserBlast,
		stayPeriod: 8000,
		audioProps: {
			mainAudioPath: audioEnum.laserBlast,
			preExitAudioPath: audioEnum.powerUp,
		},
		nextInSequence: positionEnum.stay,
	},
	hideDarkside: {
		position: { x: 102, y: 0, z: 0 },
		rotation: { x: 0, y: 0, z: 0 },
		animation: {},
		entranceEase: "power3.out",
		stayPeriod: 3000,
		nextInSequence: positionEnum.curiouslyHover,
	},
};

const initialShipState: positionEnum = positionEnum.hideDarkside;
const initialWaitPeriod: number = 5000;
// TODO: clean up unnecessary muted import once audioComponent is functioning
const CuriousSpaceship = connector(
	({ muted, hasRendered }: CuriousSpaceshipProps) => {
		const model = useGLTF(modelPath);
		const three = useThree();
		const [currentState, setCurrentState] = useState<positionEnum>(
			positionEnum.hideDarkside
		);
		const shipRef = useRef();

		model.scene.children[0].children[0].children.map((m) => {
			if (m.name === "Ufo_Ufo_Engine_2001") {
				m.visible = false;
			}
		});
		useEffect(() => {
			if (currentState !== positionEnum.stay) {
				const currentPosition = positions[currentState];
				console.log("currentPosition: ", currentState, currentPosition);
				/// @ts-ignore
				gsap.to(shipRef.current.position, {
					x: currentPosition.position.x,
					y: currentPosition.position.y,
					z: currentPosition.position.z,
					delay: currentPosition?.positionDelay
						? currentPosition?.positionDelay / 1000
						: 0,
					/// @ts-ignore
					duration: positions?.[currentState]?.entranceDuration / 1000 || 1,
					ease: currentPosition.entranceEase || "power3.out",
				});
				/// @ts-ignore
				gsap.to(shipRef.current.rotation, {
					x: currentPosition.rotation.x,
					y: currentPosition.rotation.y,
					z: currentPosition.rotation.z,
					duration: currentPosition.rotationDuration
						? currentPosition.rotationDuration / 1000
						: 1,
					ease: currentPosition.entranceEase || "power3.out",
				});
				let audioEm = three.scene.getObjectByName("positional-audio");
				if (audioEm) {
					/// @ts-ignore
					gsap.to(audioEm.position, {
						x: currentPosition.rotation.x,
						y: currentPosition.rotation.y,
						z: currentPosition.rotation.z,
						duration: currentPosition.entranceDuration
							? currentPosition.entranceDuration / 1000
							: 1,
						ease: currentPosition.entranceEase || "power3.out",
					});
				}
			}
		}, [currentState]);
		// NOTE: Handle animation timing here:
		useEffect(() => {
			if (typeof window === "undefined") return;
			if (currentState === positionEnum.stay) return;
			const currentPosition = positions[currentState];
			console.log("Setting state with: ", currentPosition);
			console.log("next in sequence: ", currentPosition.nextInSequence);
			console.log("stay period: ", currentPosition.stayPeriod);
			let _delay = currentPosition.stayPeriod;
			currentPosition.entranceDuration &&
				(_delay += currentPosition.entranceDuration);
			currentPosition.positionDelay &&
				(_delay += currentPosition.positionDelay);
			setTimeout(() => {
				setCurrentState(currentPosition.nextInSequence);
			}, _delay);
		}, [currentState]);

		useFrame(({ clock, ...threeState }) => {
			// console.log("clock: ", clock);
			// console.log("threeState: ", threeState);
			if (currentState === positionEnum.stay) return;
			console.log("Animating currentState ", currentState);
			const elapsed = clock.getElapsedTime();
			if (positions?.[currentState].animation?.static) {
				/// @ts-ignore
				positions[currentState].animation.static(elapsed, shipRef);
			}
		});

		return (
			<Fragment>
				<AudioManager positions={positions} currentState={currentState} />
				<group
					position={
						Object.values(
							positions[initialShipState].position
						) as unknown as Vector3
					}
					scale={0.2}
					rotation={[Math.PI * 0.1, -Math.PI * 0.1, Math.PI * 0]}
					ref={shipRef as Ref<any>}
					name="curious-spaceShip"
				>
					<primitive object={model.scene} />
				</group>
			</Fragment>
		);
	}
);

export default CuriousSpaceship;

useGLTF.preload(modelPath);
