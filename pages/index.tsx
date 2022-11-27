// import styles from "../styles/Home.module.scss";
import DrawerResponsiveCenter from "../components/layout/DrawerResponsiveCenter";
import Hero from "../components/landing/Hero";
import Backdrop from "../public/assets/questionableBackdrop.jpg";
import Image from "next/image";

const Home = () => {
	return (
		<DrawerResponsiveCenter additionalClasses="justify-center md:justify-start">
			<Hero />
			<Image
				src={Backdrop}
				alt="Questionable backdrop"
				className="hidden md:flex"
				style={{ transform: "translateY(-30px)", zIndex: -10 }}
			/>
		</DrawerResponsiveCenter>
	);
};

export default Home;
