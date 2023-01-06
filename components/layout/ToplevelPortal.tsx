import React, { useState, useEffect } from "react";
import CSS from "csstype";
import ReactDOM from "react-dom";

interface ToplevelPortalProps {
	children: JSX.Element | JSX.Element[];
	containerStyles?: CSS.Properties;
	z?: number;
}

const ToplevelPortal = ({
	children,
	containerStyles = {},
	z = 1,
}: ToplevelPortalProps) => {
	const [hasTarget, setHasTarget] = useState<HTMLElement>();
	const PortalContainer = (
		<div
			style={{
				position: "fixed",
				width: "100vw",
				height: "100vh",
				top: 0,
				left: 0,
				zIndex: z,
				...containerStyles,
			}}
		>
			{children}
		</div>
	);
	useEffect(() => {
		if (typeof window === "undefined") return;
		let target = document.getElementById("top-level-portal-container");
		if (!target) return;
		setHasTarget(target);
	}, []);
	return hasTarget ? ReactDOM.createPortal(PortalContainer, hasTarget) : null;
};

export default ToplevelPortal;
