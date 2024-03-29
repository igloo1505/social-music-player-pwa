import * as Types from "./ReduxTypes";
import { PayloadAction } from "@reduxjs/toolkit";
import { createReducer } from "@reduxjs/toolkit";
import initState from "./initialState";
import ToastConfig from "../types/ToastConfig";
const initialState = initState.UI;
const UIReducer = createReducer(initialState, (builder) => {
	builder.addCase("SHOW_TOAST", (state, action: Types.SHOW_TOAST) => {
		return {
			...state,
			toast: action.payload,
		};
	});

	builder.addCase("SET_VIEWPORT", (state, action: Types.SET_VIEWPORT) => {
		return {
			...state,
			dimensions: {
				...state.dimensions,
				...action.payload,
			},
		};
	});

	builder.addCase("TOGGLE_DRAWER", (state, action: Types.TOGGLE_DRAWER) => {
		return {
			...state,
			drawer: {
				isOpen:
					typeof action.payload === "undefined"
						? !state.drawer.isOpen
						: action.payload,
			},
		};
	});
	builder.addCase("HIDE_TOAST", (state, action: Types.HIDE_TOAST) => {
		return {
			...state,
			toast: {} as ToastConfig,
		};
	});
	builder.addCase(
		"SET-GRID-CARD-EXPANDED",
		(state, action: Types.SET_GRID_CARD_EXPANDED) => {
			return {
				...state,
				landingGridCardExpanded:
					typeof action?.payload === "undefined" ? false : action.payload,
			};
		}
	);
});

export default UIReducer;
