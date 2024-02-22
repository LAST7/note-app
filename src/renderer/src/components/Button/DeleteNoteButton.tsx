import { ActionButton, ActionButtonProps } from "@renderer/components";
import { deleteNoteAtom } from "@renderer/store/store";
import { useSetAtom } from "jotai";
import { FaRegTrashCan } from "react-icons/fa6";

export const DeleteNoteButton = ({ ...props }: ActionButtonProps) => {
    const deleteNote = useSetAtom(deleteNoteAtom);

    const handleClick = async () => {
        await deleteNote();
    };

    return (
        <ActionButton onClick={handleClick} {...props}>
            <FaRegTrashCan className="w-4 h-4 text-zinc-300" />
        </ActionButton>
    );
};
