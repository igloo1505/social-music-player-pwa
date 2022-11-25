import React, { useEffect, useState } from "react";
import ToastConfig from "../../types/ToastConfig";
import { connect } from "react-redux";
import { RootState } from "../../state/store";
import clsx from "clsx";
import { BiX } from "react-icons/bi";
import { useAppDispatch } from "../../hooks/ReduxHooks";
import { hideToast } from "../../state/actions";

const connector = connect((state: RootState, props: any) => ({
	config: state.UI.toast,
	props: props,
}));

interface ToastProps {
	config: ToastConfig;
}

const Toast = ({ config }: ToastProps) => {
	const [isShown, setIsShown] = useState(false);
	const dispatch = useAppDispatch();
	const __timeout = config.delay || 3000;
	const closeToast = () => {
		if (!isShown) return;
		setIsShown(false);
		if (typeof window === "undefined") {
			return;
		}
		setTimeout(() => {
			dispatch(hideToast());
		}, 350);
	};
	useEffect(() => {
		if (config.message) {
			if (typeof window === "undefined") {
				return;
			}
			document
				.getElementById("main-toast-container")
				?.classList.add(`bg-toast_${config.type}`);
			setIsShown(true);
			setTimeout(() => {
				closeToast();
			}, __timeout);
		}
	}, [config]);

	return (
		<div
			className={clsx(
				`w-screen absolute top-0 left-0 z-[900] grid gap-2 py-3 px-3 bg-toast_${config.type}  toast-container-${config.type}`,
				isShown ? "toastShow" : "toastHide"
			)}
			id="main-toast-container"
		>
			<div className="text-white">{config.message}</div>
			<BiX
				className="w-6 h-6 cursor-pointer fill-white right-2 toastIcon"
				onClick={closeToast}
			/>
		</div>
	);
};

export default connector(Toast);
