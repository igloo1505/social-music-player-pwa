import React, { useState, useEffect, Fragment } from "react";
import DepthOverlay from "../layout/DepthOverlay";
import { LandingGridCardProps } from "../../types/LandingGridCardProps";
import { connect, useDispatch } from "react-redux";
import { RootState } from "../../state/store";
import TopLevelPortal from "../layout/ToplevelPortal";
import gsap from "gsap";

// TODO: Handle pre-transform state. Text overlays card on some viewport widths.

const connector = connect((state: RootState, props) => ({
	currentlyExpanded: state.UI.landingGridCardExpanded,
}));

type propType = LandingGridCardProps & {
	currentlyExpanded: string | boolean | undefined;
};

const LandingGridCard = connector(
	({
		title,
		Icon,
		body: { contracted, expanded },
		_key,
		accentColor,
		currentlyExpanded,
	}: propType) => {
		const dispatch = useDispatch();
		const cardContainerId = `${_key}-grid-card`;
		const iconContainerSize = 48;
		const [iconShouldTranslate, setIconShouldTranslate] = useState(false);
		const [isHovered, setIsHovered] = useState(false);
		const [isExpanded, setIsExpanded] = useState(false);
		const [initialRect, setInitialRect] = useState<DOMRect | null>(null);
		const [isInitialRender, setIsInitialRender] = useState(true);
		const setContractedContainerHeight = () => {
			if (isExpanded) return;
			let container = document.getElementById(
				`${cardContainerId}-text-container`
			);
			let contracted = document.getElementById(`${cardContainerId}-contracted`);
			if (!container || !contracted) return;
			container.style.height = `${
				contracted.getBoundingClientRect().height + 16
			}px`;
		};
		useEffect(() => {
			if (typeof window === "undefined") return;
			if (isInitialRender) {
				setIsInitialRender(false);
				setContractedContainerHeight();
				window.addEventListener("resize", setContractedContainerHeight);
			}
		}, []);
		useEffect(() => {
			setIsExpanded(currentlyExpanded === _key);
		}, [currentlyExpanded]);

		useEffect(() => {
			if (typeof window === "undefined") return;
			let em = document.getElementById(cardContainerId);
			if (isExpanded) {
				if (em) {
					em.style.zIndex = "9999";
				}
				let _initialRect = animateExpand(cardContainerId);
				if (_initialRect) {
					setInitialRect(_initialRect);
				}
			}
			if (!isExpanded) {
				animateContract(cardContainerId, initialRect);
			}
		}, [isExpanded]);

		const handleClose = () => {
			dispatch({
				type: "SET-GRID-CARD-EXPANDED",
				payload: false,
			});
		};

		const handleClick = () => {
			dispatch({
				type: "SET-GRID-CARD-EXPANDED",
				payload: _key,
			});
		};

		const handleScrollPosition = () => {
			if (typeof window === "undefined") return;
			let em = document.getElementById(cardContainerId);
			if (!em) return;
			let rect = em.getBoundingClientRect();
			if (!rect) return;
			// Might need to adjust this + 50 bit to be responsive to screen size if it animates in weirdly on mobile devices.
			setIconShouldTranslate(
				window.innerHeight - rect.top - (rect.height + 50) >= 0
			);
		};
		useEffect(() => {
			if (typeof window === "undefined") return;
			handleScrollPosition();
			window.addEventListener("scroll", handleScrollPosition);
		}, []);

		return (
			<Fragment>
				{isExpanded && (
					<TopLevelPortal z={101}>
						<div
							className="w-screen h-screen absolute z-[101] bg-main-background-color opacity-50"
							style={{
								transform: `scale(${isExpanded ? 1 : 0})`,
							}}
							onClick={handleClose}
						/>
					</TopLevelPortal>
				)}
				<div
					className="text-purple-700 flex flex-col px-4 justify-start items-center cursor-pointer bg-main-background-color w-full relative"
					id={cardContainerId}
					style={{
						borderRadius: iconShouldTranslate ? "8px" : "0px",
						overflowY: iconShouldTranslate ? "visible" : "hidden",
					}}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
					onClick={handleClick}
				>
					<div
						className="grid place-items-center p-2 relative bg-main-background-color z-10"
						style={{
							borderRadius: "50%",
							width: `${iconContainerSize}px`,
							height: `${iconContainerSize}px`,
							transform: `translateY(-${
								iconShouldTranslate ? iconContainerSize * 0.5 : 0
							}px)`,
							transition: "transform 0.5s ease-in-out",
						}}
					>
						{Icon}
						<DepthOverlay
							opacity={iconShouldTranslate ? (isHovered ? 0.07 : 0.1) : 0.05}
							extraStyles={{
								borderRadius: "50%",
								transition: "all 0.5s ease-in-out",
							}}
						/>
					</div>
					<div
						className="w-full h-full flex flex-col items-center"
						style={{
							transform: `translateY(-${
								iconShouldTranslate ? iconContainerSize * 0.5 : 0
							}px)`,
							transition: "transform 0.5s ease-in-out",
						}}
					>
						<div className="text-white font-lg font-bold">{title}</div>
						<div
							className="h-[2px] w-full mb-2"
							style={{
								transform: `scaleX(${iconShouldTranslate ? 1 : 0})`,
								transition: "all 0.5s ease-in-out",
								backgroundColor: Boolean(isHovered || isExpanded)
									? accentColor
									: "#fff",
								opacity: isHovered && !isExpanded ? 0.8 : isExpanded ? 1 : 0.2,
							}}
						/>
						<div
							className="relative w-full h-full"
							id={`${cardContainerId}-text-container`}
						>
							<div
								className="absolute text-white text-left indent-3 richText"
								id={`${cardContainerId}-expanded`}
								dangerouslySetInnerHTML={{ __html: expanded }}
								style={{
									opacity: 0,
								}}
							/>
							<div
								className="absolute text-white text-center"
								id={`${cardContainerId}-contracted`}
								style={{ opacity: 0 }}
							>
								{contracted}
							</div>
						</div>
					</div>
					<DepthOverlay
						opacity={iconShouldTranslate ? (isHovered ? 0.07 : 0.1) : 0.05}
						extraStyles={{
							transition: "all 0.5s ease-in-out",
							borderRadius: iconShouldTranslate ? "8px" : "0px",
						}}
					/>
				</div>
			</Fragment>
		);
	}
);

export default LandingGridCard;

const getRect = (id: string): false | DOMRect => {
	let em = document.getElementById(id);
	if (!em) return false;
	let rect = em.getBoundingClientRect();
	if (!rect) return false;
	return rect;
};

const animateExpand = (id: string): DOMRect | void => {
	if (typeof window === "undefined") return;
	let rect: DOMRect | boolean = getRect(id);
	let xRect: DOMRect | boolean = getRect(`${id}-expanded`);
	let cRect: DOMRect | boolean = getRect(`${id}-contracted`);
	if (!rect || !xRect || !cRect) return;
	let tl = gsap.timeline();
	let vp = { width: window.innerWidth, height: window.innerHeight };
	let newWidth = vp.width * 0.8;
	newWidth >= 980 && (newWidth = 980);
	let newHeight_sorta =
		(xRect.width * xRect.height) / newWidth + (rect.height - cRect.height + 16);
	let targetLeft = vp.width / 2 - rect.width / 2;
	let targetTop = vp.height / 2 - newHeight_sorta / 2;
	let currentLeft = rect.left;
	let currentTop = rect.top;
	gsap.to(`#${id}`, {
		zIndex: 99999,
		immediateRender: true,
		duration: 0,
	});
	tl.to(`#${id}-contracted`, {
		opacity: 0,
		duration: 0.2,
	});
	tl.to(`#${id}`, {
		x: targetLeft - currentLeft,
		y: targetTop - currentTop,
		width: `${newWidth}px`,
		height: `${newHeight_sorta}px`,
		duration: 1,
		ease: "elastic.out(1, 0.7)",
	});
	tl.to(
		`#${id}-expanded`,
		{
			opacity: 1,
			duration: 0.2,
		},
		"-=0.35"
	);
	return rect;
};

const animateContract = (id: string, initialRect: DOMRect | null) => {
	if (typeof window === "undefined") return;
	let tl = gsap.timeline();
	tl.to(`#${id}-expanded`, {
		opacity: 0,
		duration: 0.2,
	});
	tl.to(`#${id}`, {
		x: 0,
		y: 0,
		...(initialRect && {
			width: initialRect.width,
			height: initialRect.height,
		}),
		duration: 1,
		ease: "elastic.out(1, 0.7)",
	});
	tl.to(`#${id}-contracted`, {
		opacity: 1,
		duration: 0.2,
	});
	tl.to(`#${id}`, {
		zIndex: 100,
		duration: 0,
	});
};
