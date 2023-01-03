import Image from "next/image";
import { LandingGridCardProps } from "../types/LandingGridCardProps";
import react from "../public/assets/techIcons/react.png";
import node from "../public/assets/techIcons/node.png";
import python from "../public/assets/techIcons/python.png";
import graphql from "../public/assets/techIcons/graphql.png";
import gcp from "../public/assets/techIcons/gcp.png";
import mongo from "../public/assets/techIcons/mongo.png";
import aws from "../public/assets/techIcons/aws.png";

const data: LandingGridCardProps[] = [];

data.push(
	new LandingGridCardProps(
		"React & Next.js",
		{
			contracted:
				"Building modern apps that are not only gorgeous but perform well requires a modern approach to rendering.",
			expanded:
				"<p><strong>React</strong> is the leading SPA, or <span class=\"italicize\">'Single Page Application'</span> framework currently used. Being first developed by Facebook, React allows a developer to more easily and quickly break a complex website into many smaller pieces. This allows smaller rendering loads and often less network traffic as only pieces of a website that have changed are reloaded.</p> <p>This however places rendering loads entirely on the user's personal computer or mobile device. Even with modern technology, many mobile devices will be noticeably sluggish when rendering complicated UI's with demanding components. This is where <strong>Next.js</strong> comes to the rescue. Next.js acts as a container in which React runs, and this container provides many quick, useful tools to strategically load components and pages on either the user's device or the much more powerful server, easily cache data, and collect both the UI and the associated data simultaneously instead of consecutively. This allows the application to function as a true SPA when that is the most performant, but to quickly and easily pre-render pages on the server at times as well.</p><p>In the end, <strong>React</strong> running inside of a hybrid rendering container like <strong>Next.js</strong> produces the most performant applications anywhere on the modern internet.</p>",
		},
		<Image src={react} alt="React icon" />,
		"reactAndNext",
		"#5CB8E4"
	)
);

data.push(
	new LandingGridCardProps(
		"Node.js",
		{
			contracted:
				"Building modern apps that are not only gorgeous but perform well requires a modern approach to rendering.",
			expanded:
				"<p><strong>React</strong> is the leading SPA, or <span class=\"italicize\">'Single Page Application'</span> framework currently used. Being first developed by Facebook, React allows a developer to more easily and quickly break a complex website into many smaller pieces. This allows smaller rendering loads and often less network traffic as only pieces of a website that have changed are reloaded.</p> <p>This however places rendering loads entirely on the user's personal computer or mobile device. Even with modern technology, many mobile devices will be noticeably sluggish when rendering complicated UI's with demanding components. This is where <strong>Next.js</strong> comes to the rescue. Next.js acts as a container in which React runs, and this container provides many quick, useful tools to strategically load components and pages on either the user's device or the much more powerful server, easily cache data, and collect both the UI and the associated data simultaneously instead of consecutively. This allows the application to function as a true SPA when that is the most performant, but to quickly and easily pre-render pages on the server at times as well.</p><p>In the end, <strong>React</strong> running inside of a hybrid rendering container like <strong>Next.js</strong> produces the most performant applications anywhere on the modern internet.</p>",
		},
		<Image src={node} alt="Node.js icon" />,
		"nodejs",
		"#22c55e"
	)
);

export default data;
