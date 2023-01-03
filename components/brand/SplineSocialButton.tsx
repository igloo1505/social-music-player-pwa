import React, {
	MouseEventHandler,
	Suspense,
	useRef,
	CSSProperties,
} from "react";
import Spline from "@splinetool/react-spline";
const aspectRatio: number = 741 / 258;

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
		let isMaxSize = containerRect.width >= 430;
		canvas.style.width = `${isMaxSize ? 430 : containerRect.width}px`;
		canvas.style.height = `${
			isMaxSize ? 150 : containerRect.width / aspectRatio
		}px`;
		container.style.height = `${
			isMaxSize ? 150 : containerRect.width / aspectRatio
		}px`;
		hoverContainer.style.width = `${isMaxSize ? 430 : containerRect.width}px`;
		hoverContainer.style.height = `${
			isMaxSize ? 150 : containerRect.width / aspectRatio
		}px`;
	};
	const handleListenerHover = (isHovered: boolean, listener: any) => {
		// let Listener = spline.current.findObjectByName(listeners.share);
		if (isHovered) {
			listener.emitEvent("mouseHover");
		}
		if (!isHovered) {
			listener.emitEventReverse("mouseHover");
		}
	};
	const handleLinkedInHover = (isHovered: boolean) => {};
	const handleGithubHover = (isHovered: boolean) => {};
	const handleMouseEnter = (title: "linkedIn" | "github" | "share") => {
		console.log("title: ", title);
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

	const handleHover: MouseEventHandler = (e) => {
		/// @ts-ignore
		spline.current.emitEvent("mouseHover");
	};

	return (
		<div id="social-canvas-container" className="relative w-full">
			<Spline
				scene={"https://prod.spline.design/60VLiu-DXGBCUXaG/scene.splinecode"}
				onLoad={onLoad}
				className="absolute"
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
				<div
					id="social-canvas-listener-left"
					className="cursor-pointer"
					onMouseEnter={() => handleMouseEnter("github")}
					onMouseLeave={() => handleMouseLeave("github")}
					style={hoverStyles}
				/>
				<div
					id="social-canvas-listener-center"
					className="cursor-pointer"
					onMouseEnter={() => handleMouseEnter("linkedIn")}
					onMouseLeave={() => handleMouseLeave("linkedIn")}
					style={hoverStyles}
				/>
				<div
					id="social-canvas-listener-right"
					className="cursor-pointer"
					onMouseEnter={() => handleMouseEnter("share")}
					onMouseLeave={() => handleMouseLeave("share")}
					style={hoverStyles}
				/>
			</div>
		</div>
	);
};

export default SplineSocialButtons;
