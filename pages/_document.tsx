import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
	return (
		<Html>
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="true"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<body>
				<div id="top-level-portal-container" />
				<Main />
				<NextScript />
			</body>
		</Html>
	);
};

export default Document;
