import dynamic from "next/dynamic";
import React, { ForwardedRef } from "react";
import { Group } from "three";

const AlienInvasion = dynamic(
	() => {
		const _AlienInvasion = import("./AlienInvasion");
			<_AlienInvasion ref={forwardedRef} {...props} />
	},
	{
		ssr: false,
		suspense: true,
	}
);

export default AlienInvasion;
