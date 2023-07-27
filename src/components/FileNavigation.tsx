import {FC, MouseEvent} from "react"
import { IFile } from "../types/file"
import FileIcon from "./FileIcon"
import useFiles from '../context/FileContext';
import FolderNavigation from "./FolderNavigation";

interface IFileNavigation {
    files: IFile[]
    visible: boolean
}

const FileNavigation: FC<IFileNavigation> = ({files, visible}: IFileNavigation) => {
    const {selectedFile, selectFile, openFile} = useFiles();

    const onShow = async (ev: MouseEvent<HTMLDivElement>, file: IFile) => {
        ev.stopPropagation();
        if (file.kind === 'file') {
            selectFile(file.id);
            openFile(file.id);
        }
    }

    return <div className={`source-codes ${visible ? '' : 'hidden'}`}>
        {files.map(file => {
            const isSelected = file.id === selectedFile;

            if (file.kind === 'directory') {
                return <FolderNavigation active={isSelected} key={file.id} file={file} />
            }
            else {
                return <div onClick={(ev) => onShow(ev, file)}
                            key={file.id}
                            className={`source-item ${isSelected ? 'source-item-active' : ''} flex items-center gap-2 px-2 py-0.5 text-gray-500 hover:text-gray-400 cursor-pointer`}
                >
                    <FileIcon name={file.name} />
                    <span>{file.name}</span>
                </div>
            }
        })}
    </div>
}
export default FileNavigation;