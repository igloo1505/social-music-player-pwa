import React, { useEffect, useState } from "react";

interface IntegralSymbolProps {
	fill: string;
	style: object;
	height?: number;
}

let ratio: number = 17.088 / 40.216;
const IntegralSymbol = ({
	fill,
	style,
	height = 40.216,
}: IntegralSymbolProps) => {
	const [dimension, setDimension] = useState({
		width: "17.088px",
		height: "40.216px",
	});
	useEffect(() => {
		if (height) {
			setDimension({
				height: `${height}px`,
				width: `${height * ratio}px`,
			});
		}
	}, [height]);
	return (
		<div className="z-10 flex items-center h-full flex-start">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={`${dimension.width}`}
				height={`${dimension.height}`}
				viewBox="0 -1361 944 2222"
				fill={fill}
				stroke={fill}
				style={style}
			>
				<path
					id="MJX-6-TEX-LO-222B"
					d="M114 -798Q132 -824 165 -824H167Q195 -824 223 -764T275 -600T320 -391T362 -164Q365 -143 367 -133Q439 292 523 655T645 1127Q651 1145 655 1157T672 1201T699 1257T733 1306T777 1346T828 1360Q884 1360 912 1325T944 1245Q944 1220 932 1205T909 1186T887 1183Q866 1183 849 1198T832 1239Q832 1287 885 1296L882 1300Q879 1303 874 1307T866 1313Q851 1323 833 1323Q819 1323 807 1311T775 1255T736 1139T689 936T633 628Q574 293 510 -5T410 -437T355 -629Q278 -862 165 -862Q125 -862 92 -831T55 -746Q55 -711 74 -698T112 -685Q133 -685 150 -700T167 -741Q167 -789 114 -798Z"
				></path>
			</svg>
		</div>
	);
};

export default IntegralSymbol;
