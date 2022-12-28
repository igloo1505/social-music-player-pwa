import React from "react";
import { toggleDrawer } from "../../state/actions";
import { useAppDispatch } from "../../hooks/ReduxHooks";
import { AiOutlineBars } from "react-icons/ai";
interface NavbarButtonsProps {
	// links:
}

interface NavLink {
	text: string;
	href?: string;
	onClick?: () => void;
}

const NavbarButtons = ({}: NavbarButtonsProps) => {
	const dispatch = useAppDispatch();
	const links: NavLink[] = [
		{
			text: "Menu",
			onClick: () => dispatch(toggleDrawer()),
		},
	];
	return (
		<div className="flex flex-row gap-2 mr-3">
			{links.map((l, i) => {
				const { text } = l;
				return (
					<div className="text-white cursor-pointer" key={`navbar-link-${i}`}>
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
};

export default NavbarButtons;
