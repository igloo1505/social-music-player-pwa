export enum ToastType {
	success = "success",
	error = "error",
	info = "info",
	warning = "warning",
}

type stringEnum = keyof typeof ToastType;

type ToastConfig = {
	type: stringEnum;
	message: string;
	delay?: number;
};

export default ToastConfig;
