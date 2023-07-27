import {useState} from "react";
import {appWindow} from '@tauri-apps/api/window';

const TitleBar = () => {
    const [isScaleUp, setScaleUp] = useState(false);

    const onClose = () => appWindow.close();
    const onMinimize = () => appWindow.minimize();

    const onScaleUp = () => {
        appWindow.toggleMaximize();
        setScaleUp(true);
    }

    const onScaleDown = () => {
        appWindow.toggleMaximize();
        setScaleUp(false);
    }

    return <div data-tauri-drag-region id={"titlebar"}>
        <div className={"flex items-center gap-1 5 pl-2"}>
            {/*Image*/}
            <span className={"text-xs uppercase"}>INFINOTE</span>
        </div>
        <div className="titlebar-actions">
            <i className="titlebar-icon ri-subtract-line" onClick={onMinimize}></i>

            {isScaleUp ? <i className="titlebar-icon ri-file-copy-line" onClick={onScaleDown}></i> : <i onClick={onScaleUp} className="titlebar-icon ri-stop-line"></i>}

            <i id="ttb-close" className="titlebar-icon ri-close-fill" onClick={onClose}></i>
        </div>
    </div>
}

export default TitleBar;