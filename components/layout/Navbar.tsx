import React from "react";
import { toggleDrawer, showToast } from "../../state/actions";
import { useAppDispatch } from "../../hooks/ReduxHooks";
import ToastConfig, { ToastType } from "../../types/ToastConfig";
interface NavbarProps {}
interface NavLink {
	text: string;
	href?: string;
	onClick?: () => void;
}

// const SampleToast = ToastConfig(
// 	"success",
// 	"Sample Toast here so you remember the new structure in typescript"
// );
const getRandomType = (): string => {
	let keys = Object.keys(ToastType);
	return keys[Math.floor(Math.random() * keys.length)];
};
const SampleToast: ToastConfig = {
	type: getRandomType() as ToastType,
	message:
		"Sample Toast here so you remember the new structure in typescript, and I'm making it extra long to make sure the padding works. Holy shit I'm homeless and sleeping in my car after dedicating the past 7-8 years to learning to program all because some girl wasn't interested.",
};

const Navbar = ({}: NavbarProps) => {
	const dispatch = useAppDispatch();
	const links: NavLink[] = [
		{
			text: "Sample Toast",
			onClick: () => dispatch(showToast(SampleToast)),
		},
		{
			text: "Toggle Drawer",
			onClick: () => dispatch(toggleDrawer()),
		},
	];
	return (
		<div
			className="fixed top-0 left-0 w-screen h-[64px] bg-black flex flex-row justify-between items-center px-5"
			id="navbar-outer-container"
		>
			<div className="text-xl text-white">IglooDevelopment</div>
			<div className="flex flex-row gap-2">
				{links.map((l, i) => {
					const { text } = l;
					return (
						<div className="text-white cursor-pointer" key={`navbar-link-${i}`}>
							<a {...l}>{text}</a>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Navbar;
