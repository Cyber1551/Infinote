import {FileProvider} from "./FileContext";


const ContextWrapper = ({children}: {children: JSX.Element | JSX.Element[]}) => {
    return <>
        <FileProvider>
            {children}
        </FileProvider>
    </>
}
export default ContextWrapper;