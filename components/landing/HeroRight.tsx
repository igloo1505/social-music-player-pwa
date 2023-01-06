import React, { Suspense } from "react";
import dynamic from "next/dynamic";
const AlienInvasion = dynamic(() => import("../threeD/AlienInvasion"), {
	ssr: false,
});
interface HeroRightProps {}

const HeroRight = ({}: HeroRightProps) => {
	return (
		<div className="relative w-[40vw] h-[40vw]">
			<Suspense fallback={"Add fallback image here after canvas doesn't suck"}>
				<AlienInvasion />
			</Suspense>
		</div>
	);
};

export default HeroRight;
