import React, { Suspense } from "react";
import dynamic from "next/dynamic";

const Canvas = dynamic(() => import("../threeD/Canvas"), {
	ssr: true,
});

interface HeroRightProps {}

const HeroRight = ({}: HeroRightProps) => {
	return (
		<div className="relative min-w-[40vw] min-h-[40vw] w-full h-full flex justify-center items-center">
			<Canvas />
		</div>
	);
};

export default HeroRight;
