import { NoteInfo } from "@shared/models";
import { notesMock } from "@renderer/store/mocks";

import { atom } from "jotai";

export const notesAtom = atom<NoteInfo[]>(notesMock);

export const selectedNoteIndexAtom = atom<number | null>(null);

export const selectedNoteAtom = atom((get) => {
    const notes = get(notesAtom);
    const selectedNoteIndex = get(selectedNoteIndexAtom);

    if (selectedNoteIndex == null) {
        return null;
    }

    const selectedNote = notes[selectedNoteIndex];

    return {
        ...selectedNote,
        // TODO: read content from file
        content: `Hello from Note${selectedNoteIndex}`
    };
});
