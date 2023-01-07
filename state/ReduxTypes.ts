import ToastConfig from "../types/ToastConfig";

export type SHOW_TOAST = { type: "SHOW_TOAST"; payload: ToastConfig };

export type TOGGLE_DRAWER = { type: "TOGGLE_DRAWER"; payload?: boolean };

export type SET_VIEWPORT = { type: "SET_VIEWPORT"; payload?: DOMRect };

export type SET_AUDIO_MUTED = { type: "SET-AUDIO-MUTED"; payload: boolean };

export type HIDE_TOAST = { type: "HIDE_TOAST" };

export type SET_CANVAS_RENDERED = {
	type: "SET_CANVAS_RENDERED";
	payload: boolean;
};

export type SET_GRID_CARD_EXPANDED = {
	type: "SET-GRID-CARD-EXPANDED";
	payload?: boolean | string | undefined;
};
