import {createContext, useCallback, useContext, useState} from "react";

interface IFileContext {
    selectedFile: string;
    selectFile: (id: string) => void;
    openedFiles: string[];
    openFile: (id: string) => void;
    closeFile: (id: string) => void;
}

const FileContext = createContext<IFileContext>({
    selectedFile: "",
    selectFile: (id) => {},
    openedFiles: [],
    openFile: (id) => {},
    closeFile: (id) => {}
})

export const FileProvider = ({children}: {children: JSX.Element | JSX.Element[] }) => {
    const [selectedFile, setSelectedFile] = useState('');
    const [openedFiles, updateOpenedFiles] = useState<string[]>([]);

    const selectFile = (id: string) => setSelectedFile(id);

    const openFile = useCallback((id: string) => {
        if (openedFiles.includes(id)) return;
        updateOpenedFiles((prevOpen) => ([...prevOpen, id]));
    }, [openedFiles]);

    const closeFile = useCallback((id: string) => {
        updateOpenedFiles((prevOpen) => prevOpen.filter(opened => opened !== id))
    }, [openedFiles])

    return <FileContext.Provider value={{selectedFile, openedFiles, selectFile, openFile, closeFile}}>
        {children}
    </FileContext.Provider>
}

const useFiles = () => {
    const fileSystemContext = useContext<IFileContext>(FileContext);
    return fileSystemContext;
}

export default useFiles;