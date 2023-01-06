import React, { useState, useEffect } from "react";
import gsap from "gsap";
import SplineSocialButtons from "../brand/SplineSocialButton";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { RootState } from "../../state/store";
import clsx from "clsx";
import HeroRight from "./HeroRight";
import initialState from "../../state/initialState";

const connector = connect((state: RootState, props) => ({
	gridCardOpen: state.UI.landingGridCardExpanded,
	dims: state.UI.dimensions,
}));

interface HeroProps {
	gridCardOpen: boolean | string | undefined;
	dims: typeof initialState.UI.dimensions;
}

const Hero = connector(({ gridCardOpen, dims }: HeroProps) => {
	const dispatch = useDispatch();
	useEffect(() => {
		if (typeof window === "undefined") return;
		animateTextEntrance();
	}, []);
	const closeGridCard = () => {
		if (gridCardOpen) {
			dispatch({
				type: "SET-GRID-CARD-EXPANDED",
				payload: false,
			});
		}
	};
	return (
		<div
			className="flex flex-col items-center justify-start sm:justify-center h-full w-full mx-2 md:mx-0 mt-16  md:mt-0 md:grid md:place-items-center min-h-[80vh] md:min-h-unset"
			style={{ width: "calc(100vw - 2rem)", gridTemplateColumns: "auto 1fr" }}
			onClick={closeGridCard}
		>
			<div className="flex flex-col items-center justify-start sm:justify-center h-full gap-3 sm:gap-2 w-fit inner-hero-container md:px-[2rem]">
				<div className="font-serif text-5xl lg:text-6xl tracking-wider text-center text-whiter w-fit mdlg:text-left lgish:text-7xl flex flex-col justify-center items-end px-4">
					<div className="inline-block" id="title-translate-left">
						{String("∫ntegrand")
							.split("")
							.map((l, i) => {
								return (
									<span
										key={`top-letter-iteration-${i}`}
										className={clsx(
											"top-iteration-letter opacity-0 select-none",
											i === 0 && "text-7xl lg:text-8xl lgish:text-9xl"
										)}
										style={{
											transform: "translateX(-50px)",
											...(i === 0 && {
												marginRight: "8px",
											}),
										}}
									>
										{l}
									</span>
								);
							})}
					</div>
					<div className="inline-block" id="title-translate-right">
						{String(" Media")
							.split("")
							.map((l, i) => {
								return (
									<span
										key={`top-letter-iteration-${i}`}
										className={clsx(
											"top-iteration-letter opacity-0 select-none"
										)}
										style={{
											transform: "translateX(-50px)",
										}}
									>
										{l}
									</span>
								);
							})}
					</div>
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
					className="w-full transition-all duration-500 z-[9999]"
					style={{
						transform: "translateY(-50px)",
						opacity: 0,
					}}
					id="social-icons-container"
				>
					<SplineSocialButtons />
				</div>
			</div>
			<HeroRight />
		</div>
	);
});

export default Hero;

const animatePanelEntrance = () => {
	setTimeout(() => {
		let em = document.getElementById("social-icons-container");
		if (!em) return animatePanelEntrance();
		em.style.transform = "translateY(0px)";
		em.style.opacity = "1";
	}, 500);
};

const animateTextEntrance = () => {
	let tl = gsap.timeline();
	tl.to(".top-iteration-letter", {
		x: 0,
		opacity: 1,
		duration: 0.5,
		stagger: 0.1,
	});
	setTimeout(animatePanelEntrance, 650);
	tl.to("#title-translate-left", {
		x: -20,
		duration: 0.35,
		ease: "power3.out",
	});
	tl.to(
		"#title-translate-right",
		{
			x: 20,
			duration: 0.35,
			ease: "power3.out",
		},
		"+=0.3"
	);
	tl.to(".bottom-iteration-letter", {
		y: 0,
		opacity: 1,
		duration: 0.5,
		stagger: 0.1,
	});
};
