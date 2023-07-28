import {MouseEvent} from "react";
import { IFile } from "../types/file"
import useFiles from "../context/FileContext"
import { getFileObject } from "../stores/file"
import FileIcon from "./FileIcon"
import useHorizontalScroll from "../helpers/useHorizontalScroll" // will be define later
import ImageView from "./ImageView"
import TextEditor from "./TextEditor"; // will be define later

const ContentArea = () => {
    const { openedFiles, selectedFile, selectFile, closeFile } = useFiles()
    const scrollRef = useHorizontalScroll()
    const onSelectItem = (id: string) => {
        selectFile(id)
    }

    const isImage = (name: string) => {
        return ['.png', '.gif', '.jpeg', '.jpg', '.bmp'].some(ext => name.lastIndexOf(ext) !== -1)
    }

    const close = (ev: MouseEvent<HTMLElement>, id: string) => {
        ev.stopPropagation()
        closeFile(id)
    }

    return <div id="code-area" className="w-full h-full">

        {/** This area is for tab bar */}

        <div ref={scrollRef} className="code-tab-items flex items-center border-b border-stone-800 divide-x divide-stone-800 overflow-x-auto">
            {openedFiles.map(item => {
                const file = getFileObject(item) as IFile;
                const active = selectedFile === item ? 'bg-darken text-gray-400' : ''

                return <div onClick={() => onSelectItem(file.id)} className={`tab-item shrink-0 px-3 py-1.5 text-gray-500 cursor-pointer hover:text-gray-400 flex items-center gap-2 ${active}`} key={item}>
                    <FileIcon name={file.name} size="sm" />
                    <span>{file.name}</span>
                    <i onClick={(ev) => close(ev, item)} className="ri-close-line hover:text-red-400"></i>
                </div>
            })}
        </div>

        {/** This area is for code content */}

        <div className="code-contents">
            {openedFiles.map(item => {
                const file = getFileObject(item) as IFile;
                if (isImage(file.name)) {
                    return <ImageView path={file.path} active={item === selectedFile} />
                }

                return <TextEditor key={item} id={item} active={item === selectedFile} />

            })}
        </div>
    </div>
}

export default ContentArea;
