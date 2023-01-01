import React, { MouseEventHandler } from "react";
import gridCardData from "../../data-static/LandingGridCardData";
import LandingGridCard from "./LandingGridCard";

interface SectionTwoProps {}

const SectionTwo = ({}: SectionTwoProps) => {
	const handleSectionTwoClick: MouseEventHandler = (e) => {
		if (typeof window === "undefined") {
			return;
		}
		let em = document.getElementById("autoscroll-whatWeDo-button");
		if (!em) return;
		em.scrollIntoView();
	};

	return (
		<div
			className="w-screen text-white flex flex-col items-center justify-start"
			style={{ height: "calc(100vh - 64px)" }}
		>
			<button
				onClick={handleSectionTwoClick}
				className={"mb-10 font-bold text-lg transformUnderlineContainer"}
				id="autoscroll-whatWeDo-button"
			>
				What we do
				<div className="hover-underline bg-brand-mid" />
			</button>
			<div
				className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-11/12 place-items-center min-h-[150px] gap-3"
				id="grid-column-container"
			>
				{gridCardData.map((d, i) => (
					<LandingGridCard {...d} key={`landing-grid-card-${i}`} />
				))}
			</div>
		</div>
	);
};

export default SectionTwo;
