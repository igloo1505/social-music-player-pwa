import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { RootState } from "../../state/store";
import clsx from "clsx";

const connector = connect((state: RootState, props: any) => ({
	drawer: state.UI.drawer,
	props: props,
}));

interface DrawerResponsiveCenterProps {
	drawer: RootState["UI"]["drawer"];
	children: [];
	additionalClasses: string;
}

const DrawerResponsiveCenter = ({
	drawer: { isOpen },
	children,
	additionalClasses = "",
}: DrawerResponsiveCenterProps) => {
	const [styles, setStyles] = useState({});
	const [hasRendered, setHasRendered] = useState(false);
	const setDimensions = (overrideTransition?: boolean): void => {
		let em = document.getElementById("drawer-outer-container");
		let n = document.getElementById("navbar-outer-container");
		let c = document.getElementById("drawer-responsive-center-container");
		let N = n?.getBoundingClientRect()?.height;
		if (!em || !N || !n || !c) return;
		let w = em.getBoundingClientRect().width;
		let W = window.innerWidth;
		let H = window.innerHeight;
		let tra: string;
		if (overrideTransition && c.style.transition !== "unset") {
			tra = c.style.transition;
			console.log("tra: ", tra);
			c.style.transition = "unset";
			setTimeout(() => {
				c && (c.style.transition = tra);
			}, 500);
		}
		setStyles({
			width: isOpen ? `${W - w}px` : `${W}px`,
			minHeight: `${H - N}px`,
			top: `${N}px`,
			opacity: 1,
		});
		if (!hasRendered) setHasRendered(true);
	};
	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}
		setDimensions(!hasRendered);
		window.addEventListener("resize", () => setDimensions(true));
	}, [isOpen]);
	return (
		<div
			className={clsx(
				"flex flex-col justify-center items-center absolute right-0 responsiveCenteredDrawerContainer will-change-auto opacity-0",
				additionalClasses
			)}
			id="drawer-responsive-center-container"
			style={styles}
		>
			{children}
		</div>
	);
};

export default connector(DrawerResponsiveCenter);
