import { Fragment } from "react";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Drawer from "../components/layout/Drawer";
import Navbar from "../components/layout/Navbar";
import Toast from "../components/layout/Toast";
import { Provider } from "react-redux";
import store from "../state/store";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Fragment>
			<Provider store={store}>
				<Drawer />
				<Navbar />
				<Toast />
				<Component {...pageProps} />
			</Provider>
		</Fragment>
	);
}
