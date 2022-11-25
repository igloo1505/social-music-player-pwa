import { configureStore } from "@reduxjs/toolkit";
import UIReducer from "./UIReducer";
import initialState from "./initialState";

const store = configureStore({
	reducer: {
		UI: UIReducer,
	},
	devTools: process.env.NODE_ENV !== "production" || true,
	preloadedState: initialState,
});
declare global {
	interface Window {
		store: typeof store;
	}
}

if (process.env.NODE_ENV !== "production" && typeof window !== "undefined") {
	window.store = store;
}

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
