import {
    ActionButtonsRow,
    Content,
    DraggableTopBar,
    FloatingNoteTitle,
    NotePreviewList,
    RootLayout,
    Sidebar
} from "@renderer/components";
import { MarkdownEditor } from "./components/MarkdownEditor";
import { useRef } from "react";

const App = (): JSX.Element => {
    const contentContainerRef = useRef<HTMLDivElement>(null);

    const resetScroll = () => {
        contentContainerRef.current?.scrollTo(0, 0);
    };

    return (
        <div>
            <DraggableTopBar />
            <RootLayout>
                <Sidebar className="p-2">
                    <ActionButtonsRow className="flex justify-between mt-1" />
                    <NotePreviewList className="mt-3 space-y-1" onSelect={resetScroll} />
                </Sidebar>
                <Content
                    ref={contentContainerRef}
                    className="border-l bg-zinc-900/50 border-l-white/20"
                >
                    <FloatingNoteTitle />
                    <MarkdownEditor />
                </Content>
            </RootLayout>
        </div>
    );
};

export default App;
