import { useRef } from "react"
import { convertFileSrc } from "@tauri-apps/api/tauri"

interface IImageView {
    path: string;
    active: boolean;
}

const ImageView = ({ path, active }: IImageView) => {
    const imgRef = useRef<HTMLImageElement>(null)

    return <div className={`${active ? '' : 'hidden'} p-8`}>
        <img ref={imgRef} src={convertFileSrc(path)} alt="" />
    </div>
}

export default ImageView;
