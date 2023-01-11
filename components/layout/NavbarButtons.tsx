import React, { Suspense } from "react";
import { toggleDrawer } from "../../state/actions";
import { useAppDispatch } from "../../hooks/ReduxHooks";
import { AiOutlineBars } from "react-icons/ai";
import dynamic from "next/dynamic";
import { connect } from "react-redux";
import { RootState } from "../../state/store";
const connector = connect((state: RootState, props) => ({
	audioInitialized: state.three.audioInitialized,
}));
const AudioSwitch = dynamic(() => import("../settings/AudioSwitch"), {
	ssr: false,
});

interface NavbarButtonsProps {
	audioInitialized: boolean;
}

interface NavLink {
	text: string;
	href?: string;
	onClick?: () => void;
}

const NavbarButtons = connector(({ audioInitialized }: NavbarButtonsProps) => {
	const dispatch = useAppDispatch();
	const links: NavLink[] = [
		{
			text: "Menu",
			onClick: () => dispatch(toggleDrawer()),
		},
	];
	return (
		<div
			className="flex flex-row gap-2 mr-3 opacity-1 h-full w-fit px-5 justify-center items-center"
			id="navbar-buttons-right"
		>
			<Suspense>
				<AudioSwitch />
			</Suspense>
			{links.map((l, i) => {
				const { text } = l;
				return (
					<div
						className="text-white cursor-pointer p-3"
						key={`navbar-link-${i}`}
					>
						<a {...l} className="hidden sm:block">
							{text}
						</a>
						<a {...l} className="block sm:hidden">
							<AiOutlineBars className="w-[24px] h-[24px]" />
						</a>
					</div>
				);
			})}
		</div>
	);
});

export default NavbarButtons;
