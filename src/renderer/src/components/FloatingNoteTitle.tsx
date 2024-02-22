import { selectedNoteAtom } from "@renderer/store/store";

import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { useAtomValue } from "jotai";

export const FloatingNoteTitle = ({ className, ...props }: ComponentProps<"div">) => {
    const selectedNote = useAtomValue(selectedNoteAtom);
    if (!selectedNoteAtom) {
        return null;
    } else {
        return (
            <div
                className={twMerge(
                    "sticky top-0 bg-gray-700 bg-opacity-50 z-10 text-center",
                    className
                )}
                {...props}
            >
                <div className="flex justify-center">
                    <span className="text-gray-400">{selectedNote?.title}</span>
                </div>
            </div>
        );
    }
};
