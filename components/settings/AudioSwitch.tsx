import React, { useState, useEffect, useRef, Fragment } from "react";
import Spline from "@splinetool/react-spline";
export const aspectRatio = 0.656;
import { connect, useDispatch } from "react-redux";
import { RootState } from "../../state/store";
import clsx from "clsx";
import gsap from "gsap";
const connector = connect((state: RootState, props) => ({
	audioMuted: state.three.audioMuted,
}));
interface AudioSwitchProps {
	audioMuted: boolean;
}
enum listenerEnum {
	top = "leftListener",
	bottom = "rightListener",
}

// "https://draft.spline.design/76V4I1FiuUgx5YPq/scene.splinecode";

const switchPath = "/assets/spline/verticalSwitch.splinecode";

const AudioSwitch = connector(({ audioMuted = true }: AudioSwitchProps) => {
	const currentHeight = 64;
	const dispatch = useDispatch();
	const audioSwitch = useRef();
	useEffect(() => {
		if (typeof window === "undefined") return;
		// let audioLabel = document.getElementById("audio-label");
		// let muteLabel = document.getElementById("mute-label");
		// if (!audioLabel || !muteLabel) {
		// }
		let tl = gsap.timeline();
		tl.to(audioMuted ? "#mute-label" : "#audio-label", {
			x: audioMuted ? 30 : -30,
			opacity: 0,
			duration: 0.5,
			ease: "power4.out",
		});
		tl.fromTo(
			audioMuted ? "#audio-label" : "#mute-label",
			{
				x: audioMuted ? -30 : 30,
				opacity: 0,
				duration: 0.5,
				ease: "power4.out",
			},
			{
				x: 0,
				opacity: 1,
				duration: 0.5,
				ease: "power4.out",
			},
			"-=0.2"
		);
	}, [audioMuted]);
	const handleSize = () => {
		let canvas = document.getElementById("audio-switch-canvas");
		let container = document.getElementById("audio-switch-container");
		if (!canvas || !container) return;
		let containerRect = container.getBoundingClientRect();
		canvas.style.height = `${Math.floor(containerRect.height)}px`;
		canvas.style.width = `${Math.floor(containerRect.height * aspectRatio)}px`;
	};

	const onLoad = (splineApp: any) => {
		console.log("splineApp: ", splineApp);
		audioSwitch.current = splineApp;
		if (typeof window === "undefined") return;
		handleSize();
	};

	const handleListenerClick = (listenerName: listenerEnum) => {
		if (!audioSwitch.current) return;
		/// @ts-ignore
		const object = audioSwitch.current.findObjectByName(listenerName);
		if (object) {
			object.emitEvent("mouseUp");
		}
		dispatch({
			type: "SET-AUDIO-MUTED",
			payload: listenerName === "leftListener",
		});
	};
	return (
		<div
			className={clsx(
				"flex flex-row justify-center items-center pl-3 rounded-xl"
				// audioMuted ? "bg-gray-900" : "#581c87ff"
			)}
			style={{
				transition: "background-color 0.3s ease-in-out",
			}}
		>
			<div
				className="text-white relative w-[40px] h-[1rem]"
				style={{
					transform: "translateY(-8px)",
				}}
			>
				<div
					className={clsx("text-gray-500 top-0 right-0 absolute opacity-0")}
					id="audio-label"
				>
					Audio
				</div>
				<div
					className={clsx("text-white top-0 right-0 absolute opacity-0")}
					id="mute-label"
				>
					Mute
				</div>
			</div>
			<div
				className={`relative`}
				id="audio-switch-container"
				style={{
					height: "64px",
					width: `${Math.floor(64 * aspectRatio)}px`,
				}}
			>
				<Spline
					scene={switchPath}
					className="absolute"
					style={{
						top: "50%",
						left: "50%",
						transform: `translate(-50%, -50%)`,
					}}
					width={48 * aspectRatio}
					height={48}
					id={"audio-switch-canvas"}
					onLoad={onLoad}
				/>
				<div
					style={{
						width: `${currentHeight * aspectRatio * 0.6}px`,
						height: "75%",
						position: "absolute",
						display: "grid",
						gridTemplateRows: "1fr 1fr",
						top: "50%",
						left: "50%",
						transform: `translate(-50%, -50%)`,
					}}
				>
					<div
						id="audio-switch-listener-top"
						style={{
							width: "100%",
							height: "100%",
							borderRadius: "50%",
							cursor: "pointer",
						}}
						onClick={() => handleListenerClick(listenerEnum.top)}
					/>
					<div
						id="audio-switch-listener-bottom"
						style={{
							width: "100%",
							height: "100%",
							borderRadius: "50%",
							cursor: "pointer",
						}}
						onClick={() => handleListenerClick(listenerEnum.bottom)}
					/>
				</div>
			</div>
		</div>
	);
});

export default AudioSwitch;
