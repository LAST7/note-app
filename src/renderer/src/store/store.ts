import { NoteContent, NoteInfo } from "@shared/models";

import { atom } from "jotai";
import { unwrap } from "jotai/utils";

const loadNotes = async () => {
    const notes = await window?.context.getNoteList();

    // sort the notes by last edit time
    return notes.sort((a, b) => b.lastEditTime - a.lastEditTime);
};

const notesAtomAsync = atom<NoteInfo[] | Promise<NoteInfo[]>>(loadNotes());

export const notesAtom = unwrap(notesAtomAsync, (prev) => prev);

export const selectedNoteIndexAtom = atom<number | null>(null);

const selectedNoteAsyncAtom = atom(async (get) => {
    const notes = get(notesAtom);
    const selectedNoteIndex = get(selectedNoteIndexAtom);

    if (selectedNoteIndex == null || !notes) {
        return null;
    }

    const selectedNote = notes[selectedNoteIndex];
    const content = await window?.context.readNoteFile(selectedNote.title);

    return {
        ...selectedNote,
        content
    };
});

export const selectedNoteAtom = unwrap(
    selectedNoteAsyncAtom,
    (prev) =>
        prev ?? {
            title: "",
            content: "",
            lastEditTime: Date.now()
        }
);

export const createEmptyNoteAtom = atom(null, async (get, set) => {
    const notes = get(notesAtom);
    if (!notes) {
        return;
    }

    const title = await window.context.createNoteFile();
    if (!title) {
        return;
    }

    const newNote: NoteInfo = {
        title,
        lastEditTime: Date.now()
    };

    set(notesAtom, [newNote, ...notes.filter((note) => note.title !== newNote.title)]);

    set(selectedNoteIndexAtom, 0);
});

export const saveNoteAtom = atom(null, async (get, set, newContent: NoteContent) => {
    const notes = get(notesAtom);
    const selectedNote = get(selectedNoteAtom);

    if (!notes || !selectedNote) {
        return;
    }

    // save the new note to the files system
    await window.context.writeNoteFile(selectedNote.title, newContent);

    // update the last edit time
    set(
        notesAtom,
        notes.map((note) =>
            note.title === selectedNote.title ? { ...note, lastEditTime: Date.now() } : note
        )
    );
});

export const deleteNoteAtom = atom(null, async (get, set) => {
    const notes = get(notesAtom);
    const selectedNote = get(selectedNoteAtom);

    if (!notes || !selectedNote) {
        return;
    }

    const isDeleted = await window.context.deleteNoteFile(selectedNote.title);
    if (!isDeleted) {
        console.error(`Failed at deleting note: ${selectedNote.title}`);
        return;
    }

    set(
        notesAtom,
        notes.filter((note) => note.title !== selectedNote.title)
    );

    set(selectedNoteIndexAtom, null);
});
