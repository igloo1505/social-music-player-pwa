import React, { useEffect, useState } from "react";
import Integral from "../brand/IntegralSymbol";
import NavbarButtons from "./NavbarButtons";
import { connect, useDispatch } from "react-redux";
import { RootState } from "../../state/store";
import initialState from "../../state/initialState";
import clsx from "clsx";
import { useRouter } from "next/router";

const connector = connect((state: RootState, props: any) => ({
	drawer: state.UI.drawer,
	dims: state.UI.dimensions,
	canvasRendered: state.three.canvasRendered,
	gridCardOpen: state.UI.landingGridCardExpanded,
	props: props,
}));

interface NavbarProps {
	drawer: typeof initialState.UI.drawer;
	dims: typeof initialState.UI.dimensions;
	canvasRendered: boolean;
	gridCardOpen: typeof initialState.UI.landingGridCardExpanded;
}

const Navbar = connector(
	({ drawer: { isOpen }, gridCardOpen, dims, canvasRendered }: NavbarProps) => {
		const router = useRouter();
		const dispatch = useDispatch();
		const [haveAddedViewportListener, setHaveAddedViewportListener] =
			useState(false);
		const [hideBackground, setHideBackground] = useState(false);
		const handleViewport = () => {
			let htmlRect: HTMLCollection | DOMRect | undefined =
				document.getElementsByTagName("html");
			if (!htmlRect) return;
			htmlRect = htmlRect.item(0)?.getBoundingClientRect();
			if (!htmlRect) return;
			const _payload = {
				html: {
					bottom: htmlRect.bottom,
					height: htmlRect.height,
					left: htmlRect.left,
					right: htmlRect.right,
					top: htmlRect.top,
					width: htmlRect.width,
					x: htmlRect.x,
					y: htmlRect.y,
				},
				viewport: {
					width: window.innerWidth,
					height: window.innerHeight,
				},
			};
			dispatch({
				type: "SET_VIEWPORT",
				payload: _payload,
			});
		};
		const setViewportListener = () => {
			if (typeof window === "undefined") return;
			if (canvasRendered && router.asPath === "/") {
				handleViewport();
				if (!haveAddedViewportListener) {
					window.addEventListener("resize", handleViewport);
					setHaveAddedViewportListener(true);
				}
			}
		};
		useEffect(() => {
			if (typeof window === "undefined") return;
			if (canvasRendered && !haveAddedViewportListener) {
				setViewportListener();
			}
		}, [canvasRendered]);

		useEffect(() => {
			setHideBackground(isOpen);
		}, [isOpen]);
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
				className={clsx(
					"fixed top-0 left-0 w-screen min-h-[64px] flex flex-row justify-between items-center px-5 z-[1000] bg-transparent",
					hideBackground && "bg-opacity-0"
				)}
				id="navbar-outer-container"
				style={{
					transform:
						dims.viewport.width >= 768
							? "translateY(-30%)"
							: "translateY(-15%)",
				}}
				onClick={closeGridCard}
			>
				<div
					className="flex flex-row items-center justify-center gap-0 h-full w-fit pr-10 pl-5 lg:px-20 py-12 md:py-36 opacity-1 rounded-full flex-nowrap"
					id="navbar-title"
				>
					<Integral
						fill={"#fff"}
						height={30}
						style={{
							transform: "rotateY(180deg) translateY(-5px)",
							// height: "100%",
							// width: "auto",
							overflow: "visible",
						}}
					/>
					<div className="text-xl text-white select-none">ntegrand Media</div>
				</div>
				<NavbarButtons />
			</div>
		);
	}
);

export default Navbar;
