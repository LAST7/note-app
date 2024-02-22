import {
    CreateNoteFile,
    DeleteNoteFile,
    GetNoteList,
    ReadNoteFile,
    WriteNoteFile
} from "@shared/types";
import { contextBridge, ipcRenderer } from "electron";

// Custom APIs for renderer
const api = {
    context: {
        locale: navigator.language,
        getNoteList: (...args: Parameters<GetNoteList>) =>
            ipcRenderer.invoke("getNoteList", ...args),
        readNoteFile: (...args: Parameters<ReadNoteFile>) =>
            ipcRenderer.invoke("readNoteFile", ...args),
        writeNoteFile: (...args: Parameters<WriteNoteFile>) =>
            ipcRenderer.invoke("writeNoteFile", ...args),
        createNoteFile: (...args: Parameters<CreateNoteFile>) =>
            ipcRenderer.invoke("createNoteFile", ...args),
        deleteNoteFile: (...args: Parameters<DeleteNoteFile>) =>
            ipcRenderer.invoke("deleteNoteFile", ...args)
    }
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
    try {
        contextBridge.exposeInMainWorld("context", api.context);
    } catch (error) {
        console.error(error);
    }
} else {
    throw new Error("contextIsolation must be enabled in the BrowserWindow");
}
