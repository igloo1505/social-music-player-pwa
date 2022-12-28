import React, { MouseEventHandler, PointerEventHandler } from "react";

interface SectionTwoProps {}

const columnData = ["1", "2", "3", "4", "5"];

const SectionTwo = ({}: SectionTwoProps) => {
	const handleSectionTwoClick: MouseEventHandler = (e) => {
		if (typeof window === "undefined") {
			return;
		}
		let em = document.getElementById("grid-column-container");
		if (!em) return;
		em.scrollIntoView();
	};
	return (
		<div
			className="w-screen text-white flex flex-col items-center"
			style={{ height: "calc(100vh - 64px)" }}
		>
			<button onClick={handleSectionTwoClick}>SectionTwo</button>
			<div
				className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full place-items-center min-h-[150px]"
				id="grid-column-container"
			>
				{columnData.map((d, i) => (
					<div key={`column-data-${i}`}>{d}</div>
				))}
			</div>
		</div>
	);
};

export default SectionTwo;
