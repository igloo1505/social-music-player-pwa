import React from "react";

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

export default DepthOverlay;
