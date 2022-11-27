import React from "react";

const elevationArray = [
	0, 5, 7, 8, 9, 10, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.25, 14.5, 14.75, 15,
	15.25, 15.5, 15.75, 16, 16.25, 16.5, 16.75, 17, 17.25, 17.5, 17.75, 18, 18.25,
	18.5, 18.75, 19, 19.25, 19.5, 19.75, 20,
];

interface ElevatedCardProps {
	elevation: number;
	children: JSX.Element | JSX.Element[];
}

const ElevatedCard = ({ elevation, children }: ElevatedCardProps) => {
	return (
		<div className="relative">
			{children}
			<div
				className="absolute top-0 left-0 w-full h-full bg-white"
				style={{ opacity: `${elevationArray[elevation] / 100}` }}
			></div>
		</div>
	);
};

export default ElevatedCard;
