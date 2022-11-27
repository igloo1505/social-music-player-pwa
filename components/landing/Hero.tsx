import React from "react";
import HeroMedia from "./HeroMedia";
import SocialIcons from "../brand/SocialIcons";
interface HeroProps {}

const Hero = ({}: HeroProps) => {
	return (
		<div
			className="flex flex-col items-center justify-center h-full mx-2 mt-10 sm:grid sm:grid-cols-hero-media-large sm:place-items-start"
			style={{ width: "calc(100vw - 2rem)" }}
		>
			<div className="flex flex-col items-center justify-start h-full gap-3 sm:gap-2 sm:ml-auto w-fit mdlg:justify-center lgish:gap-4">
				<div className="font-serif text-6xl tracking-wider text-center text-whiter w-fit mdlg:text-left lgish:text-7xl">
					Integrand Audio
				</div>
				<div className="text-2xl text-center text-white w-fit lgish:text-3xl">
					The New Age is now.
				</div>
				<SocialIcons />
			</div>
			<HeroMedia />
		</div>
	);
};

export default Hero;
