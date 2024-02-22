import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// @ts-ignore api exported in preload scripts
const dateFormatter = new Intl.DateTimeFormat(window?.context.locale, {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "Asia/Shanghai"
});

export const formatDateFromMS = (ms: number) => dateFormatter.format(ms);

export const cn = (...args: ClassValue[]) => {
    return twMerge(clsx(...args));
};