import React, { useRef, CSSProperties } from "react";
import Spline from "@splinetool/react-spline";
const aspectRatio: number = 741 / 258;
const containerMaxHeight = 100;
const containerMaxWidth = containerMaxHeight * aspectRatio;
interface SplineSocialButtonsProps {}

const hoverStyles: CSSProperties = {
	borderRadius: "50%",
	height: "57%",
	width: "18%",
};

enum listeners {
	share = "shareButtonListener",
	linkedIn = "linkedInListener",
	github = "githubListener",
}

const SplineSocialButtons = ({}: SplineSocialButtonsProps) => {
	const spline = useRef();
	const onLoad = (splineApp: any) => {
		console.log("splineApp: ", splineApp);
		spline.current = splineApp;
		if (typeof window === "undefined") return;
		let canvas = document.getElementById("social-canvas");
		let container = document.getElementById("social-canvas-container");
		let hoverContainer = document.getElementById(
			"social-canvas-hover-container"
		);

		if (!canvas || !container || !hoverContainer) return;
		let containerRect = container?.getBoundingClientRect();
		let isMaxSize = containerRect.width >= containerMaxWidth;
		canvas.style.width = `${
			isMaxSize ? containerMaxWidth : containerRect.width
		}px`;
		canvas.style.height = `${
			isMaxSize ? containerMaxHeight : containerRect.width / aspectRatio
		}px`;
		container.style.height = `${
			isMaxSize ? containerMaxHeight : containerRect.width / aspectRatio
		}px`;
		hoverContainer.style.width = `${
			isMaxSize ? containerMaxWidth : containerRect.width
		}px`;
		hoverContainer.style.height = `${
			isMaxSize ? containerMaxHeight : containerRect.width / aspectRatio
		}px`;
	};
	const handleListenerHover = (isHovered: boolean, listener: any) => {
		if (isHovered) {
			listener.emitEvent("mouseHover");
		}
		if (!isHovered) {
			listener.emitEventReverse("mouseHover");
		}
	};
	const handleMouseEnter = (title: "linkedIn" | "github" | "share") => {
		console.log("splineApp", spline);
		if (!spline.current) return;
		/// @ts-ignore
		let listener = spline.current.findObjectByName(listeners[title]);
		handleListenerHover(true, listener);
	};
	const handleMouseLeave = (title: "linkedIn" | "github" | "share") => {
		if (!spline.current) return;
		/// @ts-ignore
		let listener = spline.current.findObjectByName(listeners[title]);
		handleListenerHover(false, listener);
	};

	return (
		<div id="social-canvas-container" className="relative w-full">
			<Spline
				scene={"/assets/spline/socialButtonPanel.splinecode"}
				onLoad={onLoad}
				className="absolute -z-10"
				id="social-canvas"
				style={{
					width: `${300}px`,
					height: `${300 / aspectRatio}px`,
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
				}}
			/>
			<div
				className="flex flex-row justify-center items-center absolute"
				id="social-canvas-hover-container"
				style={{
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -52%)",
					gap: "3%",
				}}
			>
				<a
					href="https://github.com/igloo1505"
					target="_blank"
					id="social-canvas-listener-left"
					className="cursor-pointer z-[9999]"
					onMouseEnter={() => handleMouseEnter("github")}
					onMouseLeave={() => handleMouseLeave("github")}
					style={hoverStyles}
				/>
				<a
					href="https://www.linkedin.com/in/andrew-m-689626198"
					target="_blank"
					id="social-canvas-listener-center"
					className="cursor-pointer z-[9999]"
					onMouseEnter={() => handleMouseEnter("linkedIn")}
					onMouseLeave={() => handleMouseLeave("linkedIn")}
					style={hoverStyles}
				/>
				<a
					href="mailto:aiglinski414@gmail.com"
					id="social-canvas-listener-right"
					className="cursor-pointer z-[9999]"
					onMouseEnter={() => handleMouseEnter("share")}
					onMouseLeave={() => handleMouseLeave("share")}
					style={hoverStyles}
				/>
			</div>
		</div>
	);
};

export default SplineSocialButtons;
