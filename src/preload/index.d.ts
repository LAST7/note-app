import {
    CreateNoteFile,
    DeleteNoteFile,
    GetNoteList,
    ReadNoteFile,
    WriteNoteFile
} from "@shared/types";

declare global {
    interface Window {
        context: {
            locale: string;
            getNoteList: GetNoteList;
            readNoteFile: ReadNoteFile;
            writeNoteFile: WriteNoteFile;
            createNoteFile: CreateNoteFile;
            deleteNoteFile: DeleteNoteFile;
        };
    }
}
