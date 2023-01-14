import { MutableRefObject } from "react";
import { PerspectiveCamera } from "three";
const initialDistance = 250;
const maxDistance = 1500;

export const handleScrollPosition = (
	e: Event,
	camera: MutableRefObject<PerspectiveCamera>
) => {
	if (typeof window === "undefined") return;
	const vh = window.innerHeight;
	const sp = window.scrollY;
	const ratio = 1 - (vh - sp) / vh;
	camera.current.position &&
		(camera.current.position.z = initialDistance + maxDistance * ratio);
	console.log("Ratio", ratio);
};
