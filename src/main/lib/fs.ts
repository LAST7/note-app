import {
    CreateNoteFile,
    DeleteNoteFile,
    GetNoteList,
    ReadNoteFile,
    WriteNoteFile
} from "@shared/types";
import { NoteInfo } from "@shared/models";
import { WriteFileOptions, ensureDir, readFile, readdir, remove, stat, writeFile } from "fs-extra";
import { appDirectoryName, fileEncoding } from "@shared/constants";
import { dialog } from "electron";
import { homedir } from "os";
import path, { join } from "path";
import welcomeNoteFile from "../../../resources/Welcome.md?asset";

export const getRootDir = (): string => {
    return join(homedir(), appDirectoryName);
};

export const getNoteList: GetNoteList = async () => {
    const rootDir = getRootDir();
    await ensureDir(rootDir);

    const noteFileNames: string[] = await readdir(rootDir, {
        encoding: fileEncoding,
        withFileTypes: false
    });

    const notes = noteFileNames.filter((fileName) => fileName.endsWith(".md"));

    // show welcome if there's no note
    if (notes.length === 0) {
        console.log("no notes found, creating a welcome note.");

        const content = await readFile(welcomeNoteFile, { encoding: fileEncoding });
        await writeFile(join(rootDir, "Welcome.md"), content, { encoding: fileEncoding });

        notes.push("Welcome.md");
    }

    return Promise.all(notes.map(getNoteInfo));
};

export const getNoteInfo = async (fileName: string): Promise<NoteInfo> => {
    const fileStats = await stat(join(getRootDir(), fileName));

    return {
        title: fileName.replace(/\.md/, ""),
        lastEditTime: fileStats.mtimeMs
    };
};

export const readNoteFile: ReadNoteFile = async (fileName) => {
    const rootDir = getRootDir();

    return readFile(join(rootDir, `${fileName}.md`), {
        encoding: fileEncoding
    });
};

export const writeNoteFile: WriteNoteFile = async (fileName, content) => {
    const rootDir = getRootDir();

    console.log(`writing note: ${fileName}`);

    const writeOptions: WriteFileOptions = {
        encoding: fileEncoding
    };
    return writeFile(join(rootDir, `${fileName}.md`), content, writeOptions);
};

export const createNoteFile: CreateNoteFile = async () => {
    const rootDir = getRootDir();

    await ensureDir(rootDir);

    const { filePath, canceled } = await dialog.showSaveDialog({
        title: "New Note",
        defaultPath: join(rootDir, "Untitled.md"),
        buttonLabel: "Create",
        properties: ["showOverwriteConfirmation"],
        showsTagField: false,
        filters: [{ name: "Markdown", extensions: ["md"] }]
    });

    if (canceled || !filePath) {
        console.log("note creation canceled");
        return false;
    }

    const { name: fileName, dir: parentDir } = path.parse(filePath);

    // check the saving path legality
    if (parentDir !== rootDir) {
        await dialog.showMessageBox({
            type: "error",
            title: "Creation Failed",
            message: `All notes must be saved under ${rootDir}.\n Avoid using other directories`
        });

        return false;
    }

    console.log(`creating note: ${filePath}`);
    await writeFile(filePath, "");

    return fileName;
};

export const deleteNoteFile: DeleteNoteFile = async (fileName) => {
    const rootDir = getRootDir();

    const { response } = await dialog.showMessageBox({
        type: "warning",
        title: "Delete Note",
        message: `Are you sure you want to delete ${fileName}?`,
        buttons: ["Delete", "Cancel"],
        defaultId: 1,
        cancelId: 1
    });

    if (response === 1) {
        console.log("note deletion canceled");
        return false;
    }
    console.log(`deleting note: ${fileName}`);

    await remove(join(rootDir, `${fileName}.md`));
    return true;
};
