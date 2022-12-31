import Image from "next/image";
import { LandingGridCardProps } from "../types/LandingGridCardProps";
import react from "../public/assets/techIcons/react.png";
const data: LandingGridCardProps[] = [];

data.push(
	new LandingGridCardProps(
		"React & Next.js",
		{
			contracted:
				"Building modern apps that are not only gorgeous but perform well requires a modern approach to rendering.",
			expanded:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat sunt consequuntur tempora aut deserunt tenetur ducimus quibusdam voluptas cumque, praesentium assumenda. Maiores libero tenetur delectus facere repudiandae provident est corporis in distinctio consequuntur possimus vel et animi dolorem nisi explicabo neque voluptas eveniet soluta, accusantium maxime.",
		},
		<Image src={react} alt="React icon" />,
		"reactAndNext"
	)
);

export default data;
