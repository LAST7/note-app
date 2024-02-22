import { ActionButton, ActionButtonProps } from "@renderer/components";
import { createEmptyNoteAtom } from "@renderer/store/store";
import { useSetAtom } from "jotai";
import { LuFileSignature } from "react-icons/lu";

export const NewNoteButton = ({ ...props }: ActionButtonProps) => {
    const createEmptyNote = useSetAtom(createEmptyNoteAtom);

    const handleClick = () => {
        createEmptyNote();
    };

    return (
        <ActionButton onClick={handleClick} {...props}>
            <LuFileSignature className="w-4 h-4 text-zinc-300" />
        </ActionButton>
    );
};
