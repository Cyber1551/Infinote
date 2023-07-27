import { useState } from "react";
import { IFile } from "../types/file";
import { open } from "@tauri-apps/api/dialog";
import { readDirectory } from "../helpers/filesys";
import FileNavigation from "./FileNavigation";

const SideBar = () => {
    const [projectName, setProjectName] = useState("");
    const [files, setFiles] = useState<IFile[]>([]);

    const loadFile = async () => {
        const selected = await open({
            directory: true
        })

        if (!selected) return;

        setProjectName(selected as string)
        // .readDirectory accepts a folder path and return
        // a list of files / folders that insides it
        readDirectory(selected + '/').then(files => {
            console.log(files)
            setFiles(files)
        })
    }

    return <aside id="sidebar" className="w-60 shrink-0 h-full bg-darken">
        <div className="sidebar-header flex items-center justify-between p-4 py-2.5">
            <button className="project-explorer" onClick={loadFile}>File explorer</button>
            <span className="project-name whitespace-nowrap text-gray-400 text-xs">{projectName}</span>
        </div>
        <div className="code-structure">
            <FileNavigation visible={true} files={files}/>
        </div>
    </aside>
}

export default SideBar;