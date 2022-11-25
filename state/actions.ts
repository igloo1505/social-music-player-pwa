import axios from "axios";
import ToastConfig from "../types/ToastConfig";
import store from "./store";
import * as Types from "./ReduxTypes";
import { Action } from "@reduxjs/toolkit";

axios.defaults.headers.common = {
	"Content-Type": "application/json",
};

export const showToast = (toastConfig: ToastConfig): Types.SHOW_TOAST => ({
	type: "SHOW_TOAST",
	payload: toastConfig,
});
export const toggleDrawer = (shouldShow?: boolean): Types.TOGGLE_DRAWER => ({
	type: "TOGGLE_DRAWER",
	payload: shouldShow,
});

export const hideToast = (): Types.HIDE_TOAST => ({
	type: "HIDE_TOAST",
});
