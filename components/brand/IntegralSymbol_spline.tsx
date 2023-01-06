import React, { useState, useEffect } from "react";
import { Application } from "@splinetool/runtime";
import Spline from "@splinetool/react-spline";
import { connect } from "react-redux";
import { RootState } from "../../state/store";
const aspectRatio = 0.4459279;

interface IntegralSymbol_splineProps {}

const IntegralSymbol_spline = ({}: IntegralSymbol_splineProps) => {
	// TODO: send this to redux.
	const [viewport, setViewport] = useState({ width: -1, height: -1 });
	const [fontHeight, setFontHeight] = useState(48);
	const handleViewport = () => {
		if (typeof window === "undefined") return;
		setViewport({
			height: window.innerHeight,
			width: window.innerWidth,
		});
	};
	const handleLoad = (splineApp) => {};
	useEffect(() => {
		if (typeof window === "undefined") return;
		setViewport({
			height: window.innerHeight,
			width: window.innerWidth,
		});
		window.addEventListener("resize", handleViewport);
	}, []);
	return (
		<div className="w-fu">∫</div>
	);
};

export default IntegralSymbol_spline;
