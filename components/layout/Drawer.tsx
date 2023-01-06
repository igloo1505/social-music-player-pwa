import React, {
	useState,
	useEffect,
	Fragment,
	MouseEventHandler,
	PointerEvent,
} from "react";
import { connect } from "react-redux";
import { RootState } from "../../state/store";
import clsx from "clsx";
import { useAppDispatch } from "../../hooks/ReduxHooks";
import { toggleDrawer } from "../../state/actions";
import { IconType } from "react-icons";
import { AiFillExperiment, AiFillPicture, AiFillRocket } from "react-icons/ai";
import gsap from "gsap";

interface DrawerProps {
	drawer: RootState["UI"]["drawer"];
}

type DrawerOption = {
	text: string;
	href: string;
	action?: (e: any) => {};
	icon: IconType;
};

const DrawerOptions: DrawerOption[] = [
	{
		text: "Technologies",
		href: "/technologies",
		icon: AiFillExperiment,
	},
	{
		text: "Demos",
		href: "/demos",
		icon: AiFillPicture,
	},
	{
		text: "Build",
		href: "/build",
		icon: AiFillRocket,
	},
];

const Drawer = ({ drawer: { isOpen } }: DrawerProps) => {
	const dispatch = useAppDispatch();
	const [show, setShow] = useState(false);
	useEffect(() => {
		setShow(isOpen);
		if (isOpen) {
			animateOpen();
		}
		if (!isOpen) {
			animateClose();
		}
	}, [isOpen]);

	const handleBackdropClick: MouseEventHandler = (e: PointerEvent) => {
		e.stopPropagation();
		e.preventDefault();
		dispatch(toggleDrawer(false));
	};

	return (
		<Fragment>
			<div
				className={clsx(
					"fixed top-5 md:top-0 left-0 h-screen bg-transparent w-fit min-w-[220px] flex flex-col justify-start items-center z-[9999] pt-14 gap-3",
					isOpen ? "drawerTranslateX0" : "drawerTranslateXLeft"
				)}
				id="drawer-outer-container"
				onClick={handleBackdropClick}
			>
				{DrawerOptions.map((d, i) => {
					return (
						<a
							href={d.href}
							key={`drawer-link-${i}`}
							onClick={d.action ? d.action : () => {}}
							className="grid w-10/12 px-2 bg-brand-midDark rounded-xl text-whiter min-h-[40px] drawer-floating-option border border-brand-midDark place-items-center hover:border-white"
							style={{
								gridTemplateColumns: "40px 1fr",
							}}
						>
							<d.icon
								style={{
									width: "2rem",
									height: "2rem",
								}}
								className="transition-all duration-500"
							/>
							<div className="text-lg">{d.text}</div>
						</a>
					);
				})}
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

const animateOpen = () => {
	let tl = gsap.timeline();
	tl.to(".drawer-floating-option", {
		x: 0,
		duration: 1,
		stagger: 0.1,
		ease: "elastic.out(1, 0.7)",
	});
};

const animateClose = () => {
	let tl = gsap.timeline();
	tl.to(".drawer-floating-option", {
		x: "-150%",
		duration: 0.35,
		stagger: 0.1,
	});
};

const mapStateToProps = (state: RootState, props: any) => ({
	drawer: state.UI.drawer,
	props: props,
});

export default connect(mapStateToProps)(Drawer);
