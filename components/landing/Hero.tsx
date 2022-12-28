import React, { useState, useEffect } from "react";
import HeroMedia from "./HeroMedia";
import SocialIcons from "../brand/SocialIcons";
import gsap from "gsap";
interface HeroProps {}

const Hero = ({}: HeroProps) => {
	useEffect(() => {
		animateTextEntrance();
	}, []);
	return (
		<div
			className="flex flex-col items-center justify-start sm:justify-center h-full mx-2 mt-10 sm:grid sm:grid-cols-hero-media-large sm:place-items-center min-h-[80vh] sm:min-h-unset"
			style={{ width: "calc(100vw - 2rem)" }}
		>
			<div className="flex flex-col items-center justify-start sm:justify-center h-full gap-3 sm:gap-2 sm:ml-auto w-fit mdlg:justify-center lgish:gap-4 inner-hero-container">
				<div className="font-serif text-5xl lg:text-6xl tracking-wider text-center text-whiter w-fit mdlg:text-left lgish:text-7xl">
					{String("Integrand Media")
						.split("")
						.map((l, i) => {
							return (
								<span
									key={`top-letter-iteration-${i}`}
									className="top-iteration-letter opacity-0 select-none"
									style={{
										transform: "translateX(-50px)",
									}}
								>
									{l}
								</span>
							);
						})}
				</div>
				<div className="text-2xl text-center text-white w-fit lgish:text-3xl">
					{String("The New Age is now.")
						.split("")
						.map((l, i) => {
							return (
								<span
									key={`letter-iteration-${i}`}
									className="bottom-iteration-letter opacity-0 select-none"
								>
									{l}
								</span>
							);
						})}
				</div>
				<div
					style={{
						transform: "translateY(-50px)",
					}}
					className="social-icons-container"
				>
					<SocialIcons />
				</div>
			</div>
			<HeroMedia />
		</div>
	);
};

export default Hero;

const animateTextEntrance = () => {
	let tl = gsap.timeline();
	tl.to(".top-iteration-letter", {
		x: 0,
		opacity: 1,
		duration: 0.5,
		stagger: 0.1,
	});
	tl.to(
		".social-icons-container",
		{
			y: 0,
			// opacity: 1,
			duration: 0.5,
			stagger: 0.1,
		},
		"-=0.2"
	);
	tl.to(
		".bottom-iteration-letter",
		{
			y: 0,
			opacity: 1,
			duration: 0.5,
			stagger: 0.1,
		},
		"-=0.2"
	);
};
