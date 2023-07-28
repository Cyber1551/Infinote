import { nanoid } from "nanoid";
import { useEffect, useMemo, useRef } from "react";
import { getFileObject } from "../stores/file";
import { readFile, writeFile } from "../helpers/filesys";

// these packages will be used for codemirror
import { EditorView, basicSetup } from "codemirror";


interface ITextEditor {
    id: string;
    active: boolean;
}

const TextEditor = ({ id, active }: ITextEditor) => {
    const isRendered = useRef(0)
    const editorId = useMemo(() => nanoid(), [])
    const visible = active ? '' : 'hidden'
    const editorRef = useRef<EditorView | null>(null)

    // get file metadata by id from /stores/file.ts
    const updateEditorContent = async (id: string) => {
        const file = getFileObject(id);
        const content = await readFile(file.path)

        fillContentInEditor(content)
    }

    // fill content into codemirror
    const fillContentInEditor = (content: string) => {
        const elem = document.getElementById(editorId)

        if (elem && isRendered.current === 0) {
            isRendered.current = 1;
            // editorRef.current = new EditorView({
            //     doc: content,
            //     extensions: [
            //         basicSetup,
            //         javascript(), markdown(), html(), css(), json(), rust(),
            //         materialDark
            //     ],
            //     parent: elem
            // })
            elem.innerText = content;
        }
    }

    // save the content when pressing Ctrl + S
    const onSave = async () => {
        //if (!editorRef.current) return;

        // get codemirror's content
        // if any other way to get content, please let me know in the comment section
        //const content = editorRef.current.state.doc.toString();
        const content = document.getElementById(editorId).innerText;
        const file = getFileObject(id)

        writeFile(file.path, content)
    }

    useEffect(() => {
        updateEditorContent(id)
    }, [id])

    return <main className={`w-full overflow-y-auto ${visible}`} style={{ height: 'calc(100vh - 40px)' }}>
        <div id={editorId} tabIndex={-1} onKeyUp={(ev) => {
            if (ev.ctrlKey && ev.key === 's') {
                ev.preventDefault()
                ev.stopPropagation()
                onSave()
            }
        }}></div>

    </main>

}

export default TextEditor;
