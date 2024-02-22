import { NoteContent, NoteInfo } from "./models";

export type GetNoteList = () => Promise<NoteInfo[]>;

export type ReadNoteFile = (fileName: NoteInfo["title"]) => Promise<NoteContent>;

export type WriteNoteFile = (fileName: NoteInfo["title"], content: NoteContent) => Promise<void>;

export type CreateNoteFile = () => Promise<NoteInfo["title"] | false>;

export type DeleteNoteFile = (fileName: NoteInfo["title"]) => Promise<boolean>;
