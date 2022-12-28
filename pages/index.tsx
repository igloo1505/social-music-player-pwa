// import styles from "../styles/Home.module.scss";
import { useEffect } from "react";
import DrawerResponsiveCenter from "../components/layout/DrawerResponsiveCenter";
import Hero from "../components/landing/Hero";
import { setDrawerListener } from "../state/actions";
import SectionTwo from "../components/landing/SectionTwo";

const Home = () => {
	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}
		setDrawerListener();
	}, []);
	return (
		<DrawerResponsiveCenter additionalClasses="justify-center md:justify-start">
			<Hero />
			<SectionTwo />
		</DrawerResponsiveCenter>
	);
};

export default Home;
