import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { RootState } from "../../state/store";
import clsx from "clsx";
import initialState from "../../state/initialState";

const maxGrey = 26;

const connector = connect((state: RootState, props: any) => ({
	drawer: state.UI.drawer,
	dims: state.UI.dimensions,
	props: props,
}));

interface DrawerResponsiveCenterProps {
	drawer: RootState["UI"]["drawer"];
	dims: typeof initialState.UI.dimensions;
	children: [];
	additionalClasses: string;
	extraStyles?: object;
}

const DrawerResponsiveCenter = ({
	drawer: { isOpen },
	children,
	additionalClasses = "",
	extraStyles = {},
	dims,
}: DrawerResponsiveCenterProps) => {
	const [styles, setStyles] = useState<any>({
		backgroundColor: "rgb(0,0,0)",
		...extraStyles,
	});
	const [hasRendered, setHasRendered] = useState(false);
	const handleBackgroundScroll = () => {
		if (typeof window === "undefined") return;
		let em = document.getElementById("drawer-responsive-center-container");
		let navbar = document.getElementById("navbar-outer-container");
		let navbarTitle = document.getElementById("navbar-title");
		let navbarButtons = document.getElementById("navbar-buttons-right");
		let _html = document.getElementsByTagName("html")?.item(0);
		if (!em || !_html || !navbar || !navbarTitle || !navbarButtons) return;
		let vh = window.innerHeight;
		let sp = window.scrollY;
		let p = 1 - (vh - sp) / vh;
		p = p >= 1 ? 1 : p;
		let val = Math.floor(p * maxGrey);
		let rgbBase = `rgb(${p * maxGrey}, ${p * maxGrey}, ${p * maxGrey})`;
		let rgb = `radial-gradient(circle, rgba(${val}, ${val}, ${val}, 1) 40%, rgba(${val}, ${val}, ${val}, 0) 80%)`;
		em.style.background = rgbBase;
		_html.style.background = rgbBase;
		// navbar.style.background = rgb;
		navbarTitle.style.background = rgb;
		navbarButtons.style.background = rgb;
	};
	useEffect(() => {
		if (typeof window === "undefined") return;
		handleBackgroundScroll();
		window.addEventListener("scroll", handleBackgroundScroll);
	}, []);
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
			c.style.transition = "unset";
			setTimeout(() => {
				c && (c.style.transition = tra);
			}, 500);
		}
		setStyles({
			...styles,
			width: `${W}px`,
			minHeight: `${H - N}px`,
			top: `${N * 0.3}px`,
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
	}, []);

	return (
		<div
			className={clsx(
				"flex flex-col items-center absolute responsiveCenteredDrawerContainer will-change-auto opacity-0 w-screen left-0",
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
