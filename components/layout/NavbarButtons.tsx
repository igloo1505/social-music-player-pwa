import React from "react";
import { toggleDrawer } from "../../state/actions";
import { useAppDispatch } from "../../hooks/ReduxHooks";
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
					<div
						className="hidden text-white cursor-pointer sm:block"
						key={`navbar-link-${i}`}
					>
						<a {...l}>{text}</a>
					</div>
				);
			})}
		</div>
	);
};

export default NavbarButtons;
