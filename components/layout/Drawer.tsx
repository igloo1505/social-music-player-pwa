import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { RootState } from "../../state/store";
import clsx from "clsx";
import { useAppDispatch } from "../../hooks/ReduxHooks";
import { toggleDrawer } from "../../state/actions";

interface DrawerProps {
	drawer: RootState["UI"]["drawer"];
}

const Drawer = ({ drawer: { isOpen } }: DrawerProps) => {
	const dispatch = useAppDispatch();
	const [show, setShow] = useState(false);
	useEffect(() => {
		setShow(isOpen);
	}, [isOpen]);
	const handleBackdropClick = () => {
		dispatch(toggleDrawer(false));
	};

	return (
		<Fragment>
			<div
				className={clsx(
					"fixed top-0 left-0 h-screen bg-lime-500 w-fit min-w-[150px] flex flex-col justify-start items-center z-[1000]",
					show ? "transformDrawer_show" : "transformDrawer_hide"
				)}
				id="drawer-outer-container"
			>
				<div className="px-4 py-3 text-xl rounded">Drawer!!</div>
			</div>
			<div
				className={clsx(
					"w-screen fixed top-0 left-0 h-screen z-[950] bg-black bg-opacity-30 transition-opacity duration-200",
					show ? "flex" : "hidden"
				)}
				onClick={handleBackdropClick}
			></div>
		</Fragment>
	);
};

const mapStateToProps = (state: RootState, props: any) => ({
	drawer: state.UI.drawer,
	props: props,
});

export default connect(mapStateToProps)(Drawer);
