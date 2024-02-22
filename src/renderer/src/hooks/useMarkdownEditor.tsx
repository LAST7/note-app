import { selectedNoteAtom } from "@renderer/store/store";
import { useAtomValue } from "jotai";

export const useMarkdownEditor = () => {
    const selectedNote = useAtomValue(selectedNoteAtom);

    return {
        selectedNote
    };
};
