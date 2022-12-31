import React, { useState, useEffect, Fragment } from "react";
import { LandingGridCardProps } from "../../types/LandingGridCardProps";
import { connect, useDispatch } from "react-redux";
import { RootState } from "../../state/store";
import TopLevelPortal from "../layout/ToplevelPortal";
import gsap from "gsap";

const connector = connect((state: RootState, props) => ({
	currentlyExpanded: state.UI.landingGridCardExpanded,
}));

const DepthOverlay = ({
	opacity,
	extraStyles = {},
}: {
	opacity: number;
	extraStyles?: object;
}) => {
	return (
		<div
			className="absolute h-full w-full bg-white"
			style={{
				opacity: opacity,
				...extraStyles,
			}}
		></div>
	);
};

type propType = LandingGridCardProps & {
	currentlyExpanded: string | boolean | undefined;
};

const LandingGridCard = connector(
	({
		title,
		Icon,
		body: { contracted, expanded },
		_key,
		currentlyExpanded,
	}: propType) => {
		const dispatch = useDispatch();
		const cardContainerId = `${_key}-grid-card`;
		const iconContainerSize = 48;
		const [iconShouldTranslate, setIconShouldTranslate] = useState(false);
		const [isHovered, setIsHovered] = useState(false);
		const [isExpanded, setIsExpanded] = useState(false);
		const [scrollListener, setScrollListener] = useState();
		useEffect(() => {
			setIsExpanded(currentlyExpanded === _key);
		}, [currentlyExpanded]);

		useEffect(() => {
			if (isExpanded) {
				let listenerId = animateExpand(cardContainerId);
			}
			if (!isExpanded) {
				animateContract(cardContainerId);
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
					<TopLevelPortal>
						<div
							className="w-screen h-screen absolute -z-10 bg-main-background-color opacity-50"
							style={{
								transform: `scale(${isExpanded ? 1 : 0})`,
							}}
							onClick={handleClose}
						/>
					</TopLevelPortal>
				)}
				<div
					className="text-purple-700 flex flex-col px-4 justify-start items-center cursor-pointer bg-main-background-color z-10 w-full h-full relative"
					id={cardContainerId}
					style={{
						borderRadius: iconShouldTranslate ? "8px" : "0px",
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
									? "#5CB8E4"
									: "#fff",
								// opacity: isHovered ? (isExpanded ? 1 : 0.8) : 0.2,
								opacity: isHovered && !isExpanded ? 0.8 : isExpanded ? 1 : 0.2,
							}}
						/>
						{isExpanded ? (
							<div
								className="text-white text-center opacity-0"
								id={`${cardContainerId}-expanded`}
							>
								{expanded}
							</div>
						) : (
							<div
								className="text-white text-center opacity-0"
								id={`${cardContainerId}-contracted`}
							>
								{contracted}
							</div>
						)}
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

const animateExpand = (id: string) => {
	if (typeof window === "undefined") return;
	let rect: DOMRect | boolean = getRect(id);
	if (!rect) return;
	let vp = { width: window.innerWidth, height: window.innerHeight };
	let targetLeft = vp.width / 2 - rect.width / 2;
	let targetTop = vp.height / 2 - rect.height / 2;
	let currentLeft = rect.left;
	let currentTop = rect.top;
	console.log(targetLeft, rect);
	let tl = gsap.timeline();
	tl.to(`#${id}`, {
		x: targetLeft - currentLeft,
		y: targetTop - currentTop,
	});
	gsap.to(`#${id}-expanded`, {
		opacity: 1,
	});
};

const animateContract = (id: string) => {
	if (typeof window === "undefined") return;
	let rect: DOMRect | boolean = getRect(id);
	if (!rect) return;
	let vp = { width: window.innerWidth, height: window.innerHeight };
	// let targetLeft = vp.width / 2 - rect.width / 2;
	// console.log(targetLeft, rect);
	let tl = gsap.timeline();
	tl.to(`#${id}`, {
		x: 0,
		y: 0,
	});
	gsap.to(`#${id}-contracted`, {
		opacity: 1,
	});
};
