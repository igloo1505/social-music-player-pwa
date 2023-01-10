// // import { PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "./store";
// import { AnyAction } from "redux";
import * as Types from "./ReduxTypes";
import { createReducer } from "@reduxjs/toolkit";
import initState from "./initialState";
const initialState = initState.three;

const UIReducer = createReducer(initialState, (builder) => {
	builder.addCase("SET-AUDIO-MUTED", (state, action: Types.SET_AUDIO_MUTED) => {
		return {
			...state,
			audioMuted: action.payload,
		};
	});
	builder.addCase(
		"SET-CURRENT-AUDIO-PATH",
		(state, action: Types.SET_CURRENT_AUDIO_PATH) => {
			return {
				...state,
				currentAudioPath: action.payload,
			};
		}
	);
	builder.addCase(
		"SET_CANVAS_RENDERED",
		(state, action: Types.SET_CANVAS_RENDERED) => {
			return {
				...state,
				canvasRendered: action.payload,
			};
		}
	);
});

export default UIReducer;
