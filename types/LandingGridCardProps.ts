import React from "react";
import { IconType } from "react-icons/lib";

export class LandingGridCardProps {
	constructor(
		public title: string,
		public body: {
			// Shortened string. Figure out later how to validate lengths with typescript. specifically.
			contracted: string;
			// String of length when card is expanded.
			expanded: string;
		},
		public Icon: React.ReactNode | JSX.Element,
		public _key: string,
		public accentColor: string
	) {
		console.log(this.title);
		if (this.title.length <= 5 || this.title.length >= 30) {
			console.error("LandingGridCardProps title length error");

			throw new Error(
				`title body length is not within range. Found length of ${this.title.length}`
			);
		}
		if (
			this.body.contracted.length <= 20 ||
			this.body.contracted.length >= 200
		) {
			console.error("LandingGridCardProps contracted body length error");
			throw new Error(
				`Contracted body length is not within range. Found length of ${this.body.contracted.length}`
			);
		}
		if (this.body.expanded.length <= 150 || this.body.expanded.length >= 1500) {
			console.error("LandingGridCardProps expanded body length error");
			throw new Error(
				`Expanded body length is not within range. Found length of ${this.body.expanded.length}`
			);
		}
	}
}
