import React, { useEffect, useState } from "react";
import Integral from "../brand/IntegralSymbol";
import NavbarButtons from "./NavbarButtons";
import { connect, useDispatch } from "react-redux";
import { RootState } from "../../state/store";
import initialState from "../../state/initialState";
import clsx from "clsx";

const connector = connect((state: RootState, props: any) => ({
	drawer: state.UI.drawer,
	gridCardOpen: state.UI.landingGridCardExpanded,
	props: props,
}));

interface NavbarProps {
	drawer: typeof initialState.UI.drawer;
	gridCardOpen: typeof initialState.UI.landingGridCardExpanded;
}

const Navbar = connector(
	({ drawer: { isOpen }, gridCardOpen }: NavbarProps) => {
		const [hideBackground, setHideBackground] = useState(false);
		const dispatch = useDispatch();
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
					"fixed top-0 left-0 w-screen h-[64px] bg-main-background-color bg-opacity-90 flex flex-row justify-between items-center px-5 z-[1000]",
					hideBackground && "bg-opacity-0"
				)}
				id="navbar-outer-container"
				onClick={closeGridCard}
			>
				<div className="flex flex-row items-center justify-center gap-0">
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
