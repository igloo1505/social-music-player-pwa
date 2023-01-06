import React, { Suspense } from "react";
import dynamic from "next/dynamic";

const AlienInvasion = dynamic(() => import("../threeD/AlienInvasion"), {
	ssr: true,
});

interface HeroRightProps {}

const HeroRight = ({}: HeroRightProps) => {
	return (
		<div className="relative min-w-[40vw] min-h-[40vw] w-full h-full">
			<Suspense fallback={"Add fallback image here after canvas doesn't suck"}>
				<AlienInvasion />
			</Suspense>
		</div>
	);
};

export default HeroRight;
