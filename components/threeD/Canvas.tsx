import React, { Fragment, Suspense, useEffect } from "react";
import { Canvas as _Canvas } from "@react-three/fiber";
import { useDispatch } from "react-redux";
import dynamic from "next/dynamic";
const AlienInvasion = dynamic(() => import("./AlienInvasion"), {
	ssr: false,
});

interface CanvasProps {}

const Canvas = ({}: CanvasProps) => {
	const dispatch = useDispatch();
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
	useEffect(() => {
		if (typeof window === "undefined") return;
		handleAspectRatio();
		window.addEventListener("resize", handleAspectRatio);
	}, []);
	return (
		<Fragment>
			<_Canvas
				gl={{ logarithmicDepthBuffer: true }}
				onCreated={handleCanvasLoaded}
				className="alienInvasion-canvas"
				id="alien-invasion-canvas"
			>
				<Suspense fallback={null}>
					<AlienInvasion />
				</Suspense>
			</_Canvas>
		</Fragment>
	);
};

export default Canvas;
