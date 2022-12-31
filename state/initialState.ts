import ToastConfig from "../types/ToastConfig";

const initialState = {
	UI: {
		toast: {} as ToastConfig,
		drawer: {
			isOpen: false,
		},
		landingGridCardExpanded: false as boolean | string | undefined,
	},
};

export default initialState;
