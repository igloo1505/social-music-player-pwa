import ToastConfig from "../types/ToastConfig";

const initialState = {
	UI: {
		toast: {} as ToastConfig,
		drawer: {
			isOpen: false,
		},
		dimensions: {
			html: {
				bottom: -1,
				height: -1,
				left: -1,
				right: -1,
				top: -1,
				width: -1,
				x: -1,
				y: -1,
			} as Partial<DOMRect>,
			viewport: {
				width: -1,
				height: -1,
			},
		},
		landingGridCardExpanded: false as boolean | string | undefined,
	},
	three: {
		canvasRendered: false,
		audioMuted: true,
		audioInitialized: false,
	},
};

export default initialState;
