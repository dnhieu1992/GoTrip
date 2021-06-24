import { useState, useRef } from "react";

const UploadImage = () => {
    const [state, setState] = useState({});
    const fileRef = useRef();
    const {
        imagePreviewUrl,
        file
    } = state;

    const onHandleImageChange = (image) => {
        const reader = new FileReader();
        const file = image.target.files[0];

        reader.onloadend = () => {
            setState({
                ...state,
                imagePreviewUrl: reader.result,
                file
            })
        }

        reader.readAsDataURL(file);
    }


    const removeImage = () => {
        fileRef.current.value = "";
        setState({
            ...state,
            imagePreviewUrl: null,
            file: null
        });

    }

    return (
        <div className="image-preview">
            <div className="image-preview__form ">
                <div className="image-preview__form-image">
                    {imagePreviewUrl && (
                        <>
                            <img id="img" src={imagePreviewUrl} />
                            <span className="remove-image" onClick={removeImage}>x</span>
                        </>
                    )}
                </div>
                <div className="image-preview__form-button mb-3">
                    <span class="btn btn-default btn-file">
                        Choose File <input ref={fileRef} type="file" id="imgInp" onChange={onHandleImageChange} />
                    </span>
                </div>
            </div>
        </div>
    )
}

export default UploadImage;