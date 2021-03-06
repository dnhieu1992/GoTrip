import { useState, useRef } from "react";

const UploadImage = () => {
    const [state, setState] = useState({});
    const fileRef = useRef();

    const {
        file,
        imagePreviewUrl,
    } = state;

    const onHandleImageChange = (image) => {
        const reader = new FileReader();
        const file = image.target.files[0];

        reader.onloadend = () => {
            setState({
                ...state,
                file,
                imagePreviewUrl: reader.result,
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
                <div className="image-preview__form-button ">
                    <span class="btn btn-default btn-file">
                        <i className="fa fa-cloud-upload"/>
                        Choose File Your Computer
                        <input ref={fileRef} type="file" id="imgInp" onChange={onHandleImageChange} />
                    </span>
                </div>
                <div className="image-preview__form-image">
                    {imagePreviewUrl && (
                        <>
                            <img id="img" src={imagePreviewUrl} />
                            {/* <span className="remove-image" onClick={removeImage}>x</span> */}
                            <i className="fa fa-times" onClick={removeImage} ></i>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default UploadImage;