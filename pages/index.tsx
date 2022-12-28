// import styles from "../styles/Home.module.scss";
import { useEffect } from "react";
import DrawerResponsiveCenter from "../components/layout/DrawerResponsiveCenter";
import Hero from "../components/landing/Hero";
import Backdrop from "../public/assets/questionableBackdrop.jpg";
import Image from "next/image";
import { setDrawerListener } from "../state/actions";

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
		</DrawerResponsiveCenter>
	);
};

export default Home;
