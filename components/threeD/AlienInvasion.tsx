import React, { Fragment, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Preload, Grid } from "@react-three/drei";
import { useDispatch } from "react-redux";
import dynamic from "next/dynamic";

const CuriousSpaceship = dynamic(() => import("./CuriousSpaceship"), {
	ssr: false,
});

const Earth = dynamic(() => import("./Earth"), {
	ssr: false,
});

const maxScrollCameraPosition: { x: number; y: number; z: number } = {
	x: 0,
	y: 0,
	z: 1000,
};
const initialCameraPosition: { x: number; y: number; z: number } = {
	x: 0,
	y: 0,
	z: 250,
};
const positionDelta: { x: number; y: number; z: number } = {
	x: maxScrollCameraPosition.x - initialCameraPosition.x,
	y: maxScrollCameraPosition.y - initialCameraPosition.y,
	z: maxScrollCameraPosition.z - initialCameraPosition.z,
};

interface AlienInvasionProps {}
const AlienInvasion = ({}: AlienInvasionProps) => {
	const dispatch = useDispatch();
	const camera = useRef();
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
		// console.log("container.style.height: ", container.style.height);
		// console.log("${containerRect.width}px: ", `${containerRect.width}px`);
	};
	const handleCanvasLoaded = () => {
		dispatch({
			type: "SET_CANVAS_RENDERED",
			payload: true,
		});
		handleAspectRatio();
	};
	const handleScroll = () => {
		if (typeof window === "undefined") return;
		const vh = window.innerHeight;
		const sp = window.scrollY;
		const vpRatio = 1 - (vh - sp) / vh;
		const newPosition: { x: number; y: number; z: number } = {
			x: initialCameraPosition.x + positionDelta.x * vpRatio,
			y: initialCameraPosition.y + positionDelta.y * vpRatio,
			z: initialCameraPosition.z + positionDelta.z * vpRatio,
		};
		/// @ts-ignore
		// camera.current?.position && (camera.current.position = newPosition);
	};

	useEffect(() => {
		if (typeof window === "undefined") return;
		handleAspectRatio();
		handleScroll();
		window.addEventListener("resize", handleAspectRatio);
		window.addEventListener("scroll", handleScroll);
	}, []);
	return (
		<Fragment>
			<Canvas
				gl={{ logarithmicDepthBuffer: true }}
				onCreated={handleCanvasLoaded}
				className="alienInvasion-canvas"
				id="alien-invasion-canvas"
			>
				<PerspectiveCamera
					makeDefault
					position={
						Object.values(initialCameraPosition) as [number, number, number]
					}
					ref={camera}
				/>
				<directionalLight intensity={1} position={[-300, 140, 0]} />
				<Earth />
				<CuriousSpaceship />
				<Preload all />
			</Canvas>
		</Fragment>
	);
};

export default AlienInvasion;
