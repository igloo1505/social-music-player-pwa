import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
// import hero3dVideo from "../../public/assets/hero3dVideo.avi";
import hero3dVideo_frame1 from "../../public/assets/hero3dVideo_frame1.jpg";
let videoID = "hero-3d-video";

interface MediaContainerProps {
	children: JSX.Element | JSX.Element[];
	classNames?: string;
	hide?: boolean;
}

const MediaContainer = ({
	children,
	classNames = "",
	hide = false,
}: MediaContainerProps) => {
	const [extraStyles, setExtraStyles] = useState({});

	useEffect(() => {
		if (hide) {
			setExtraStyles({
				opacity: 0,
			});
		}
		if (!hide) {
			setExtraStyles({
				opacity: 1,
			});
		}
	}, [hide]);
	return (
		<div
			className={`absolute top-0 left-0 w-fit h-full max-h-full flex flex-col justify-center items-center ${classNames}`}
			style={extraStyles}
		>
			{children}
		</div>
	);
};

interface HeroMediaProps {}

const HeroMedia = ({}: HeroMediaProps) => {
	const [useVideo, setUseVideo] = useState(false);
	const videoEl = useRef<HTMLVideoElement>(null);

	const attemptPlay = () => {
		videoEl &&
			videoEl.current &&
			videoEl.current.play().catch((error: any) => {
				console.error("Error attempting to play", error);
			});
	};
	useEffect(() => {
		let em: HTMLVideoElement | null = document.getElementById(
			videoID
		) as HTMLVideoElement;
		if (!em) return;
		// em.addEventListener("canplay", () => {
		// 	setUseVideo(true);
		// 	attemptPlay();
		// });
		// if (!em.paused) {
		// 	setUseVideo(true);
		// }
	}, []);
	return (
		<div className="relative w-[40vw] h-[40vw]">
			<MediaContainer>
				<video
					id={videoID}
					ref={videoEl}
					playsInline
					loop
					muted
					autoPlay
					preload="auto"
					className="object-contain max-h-full max-w-fit"
					onPlay={() => {
						setUseVideo(true);
					}}
				>
					<source src={"assets/hero3dVideo.mov"} type="video/mov" />
					<source src={"assets/hero3dVideo.mp4"} type="video/mp4" />
					<source src={"assets/hero3dVideo.webm"} type="video/webm" />
					<source src={"assets/hero3dVideo.avi"} type="video/avi" />
				</video>
			</MediaContainer>
			<MediaContainer hide={useVideo}>
				<Image
					src={hero3dVideo_frame1}
					alt="Brand Icon"
					priority={true}
					className="object-contain max-h-full max-w-fit"
				/>
			</MediaContainer>
		</div>
	);
};

export default HeroMedia;
