import { MDXEditorMethods } from "@mdxeditor/editor";
import { NoteContent } from "@shared/models";
import { autoSavingInterval } from "@shared/constants";
import { saveNoteAtom, selectedNoteAtom } from "@renderer/store/store";
import { throttle } from "lodash";
import { useAtomValue, useSetAtom } from "jotai";
import { useRef } from "react";

export const useMarkdownEditor = () => {
    const selectedNote = useAtomValue(selectedNoteAtom);
    const saveNote = useSetAtom(saveNoteAtom);
    const editorRef = useRef<MDXEditorMethods>(null);

    const handleAutoSaving = throttle(
        async (content: NoteContent) => {
            if (!selectedNote) {
                return;
            }

            console.log(`auto saving: ${selectedNote.title}`);
            await saveNote(content);
        },
        autoSavingInterval,
        {
            leading: false,
            trailing: true
        }
    );

    const handleBlur = async () => {
        if (!selectedNote) {
            return;
        }

        handleAutoSaving.cancel();

        const content = editorRef.current?.getMarkdown();
        if (content != null) {
            await saveNote(content);
        }
    };

    return {
        editorRef,
        selectedNote,
        handleAutoSaving,
        handleBlur
    };
};
