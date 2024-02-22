import { NewNoteButton, DeleteNoteButton } from "@renderer/components";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export const ActionButtonsRow = ({ className, ...props }: ComponentProps<"div">) => {
    return (
        <div className={twMerge("mb-2 mx-2", className)} {...props}>
            <NewNoteButton />
            <DeleteNoteButton />
        </div>
    );
};
