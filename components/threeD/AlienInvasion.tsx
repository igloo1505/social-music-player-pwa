import React, { Fragment, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Preload, Grid } from "@react-three/drei";
import { Loader } from "@react-three/drei";
import { useDispatch } from "react-redux";
// import Earth from "./Earth";
import dynamic from "next/dynamic";

const Earth = dynamic(() => import("./Earth"), {
	ssr: false,
});
interface AlienInvasionProps {}
const AlienInvasion = ({}: AlienInvasionProps) => {
	const dispatch = useDispatch();
	const handleCanvasLoaded = () => {
		dispatch({
			type: "SET_CANVAS_RENDERED",
			payload: true,
		});
	};
	const handleAspectRatio = () => {
		if (typeof window === "undefined") return;
		let container = document.getElementById("alien-invasion-canvas");
		let containerRect = container?.getBoundingClientRect();
		if (!container || !containerRect) return;
		let newHeight = `${Math.floor(containerRect.width)}px`;
		let newWidth = "100%";
		if (containerRect.width >= window.innerHeight) {
			newHeight = "100%";
			newWidth = `${Math.floor(containerRect.height)}px`;
		}
		container.style.height = newHeight;
		container.style.width = newWidth;
		console.log("container.style.height: ", container.style.height);
		console.log("${containerRect.width}px: ", `${containerRect.width}px`);
	};
	useEffect(() => {
		if (typeof window === "undefined") return;
		handleAspectRatio();
		window.addEventListener("resize", handleAspectRatio);
	}, []);
	return (
		<Fragment>
			<Canvas
				gl={{ logarithmicDepthBuffer: true }}
				onCreated={handleCanvasLoaded}
				className="alienInvasion-canvas"
				id="alien-invasion-canvas"
			>
				<PerspectiveCamera makeDefault position={[0, 0, 2.5]} />
				<directionalLight intensity={1} position={[-3, 1.4, 0]} />
				<Earth />
				<Preload all />
			</Canvas>
			<Loader />
		</Fragment>
	);
};

export default AlienInvasion;
