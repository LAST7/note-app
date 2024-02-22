// import { notesMock as notes } from "@renderer/store/mocks";
import { ComponentProps } from "react";
import { NotePreview } from "./NotePreview";
import { twMerge } from "tailwind-merge";
import { useNotesList } from "@renderer/hooks/useNotesList";

export type NotePreviewListProps = ComponentProps<"ul"> & {
    onSelect?: () => void;
};

export const NotePreviewList = ({ className, onSelect, ...props }: NotePreviewListProps) => {
    const { notes, selectedNoteIndex, handleNoteSelect } = useNotesList({ onSelect });

    if (notes.length === 0) {
        return (
            <ul className={twMerge("text-center pt-4", className)} {...props}>
                <span>No Notes Yet!</span>
            </ul>
        );
    }

    return (
        <ul className={className} {...props}>
            {notes.map((note, index) => (
                <NotePreview
                    key={note.title + note.lastEditTime}
                    isActive={selectedNoteIndex === index}
                    onClick={handleNoteSelect(index)}
                    {...note}
                />
            ))}
        </ul>
    );
};