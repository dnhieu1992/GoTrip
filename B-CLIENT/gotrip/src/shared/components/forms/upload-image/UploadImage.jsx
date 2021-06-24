import { useState } from "react";

const UploadImage = () => {
    const [state,setState]=useState({});
    const [showRemove,setShowRemove]=useState(false);
    const {
        imagePreviewUrl,
        file,
    }=state;

    const onHandleImageChange = (image)=>{
        debugger;
        const reader=new FileReader();
        const file=image.target.files[0];

        reader.onloadend=()=>{
            setState({
                ...state,
                imagePreviewUrl:reader.result,
                file
            })
        }            

        if(!imagePreviewUrl){
            setShowRemove(true)
        }

        reader.readAsDataURL(file);
    }


    const onCancelImage = ()=>{
        debugger;
        setState({
            ...state,
            imagePreviewUrl:null,
            file:null
        })
        setShowRemove(false)
    }

    const Results=()=>(
        <span className="remove-image"  onClick={onCancelImage}>x</span>
    )

    return (
        <div className="image-preview">
            <div className="image-preview__form ">
                <div className="image-preview__form-image">
                    <img id="img" src={imagePreviewUrl} ></img>
                    {/* <a className="remove-image"  onClick={onCancelImage}>x</a> */}
                    { showRemove ? <Results /> : null }
                </div>
                <div className="image-preview__form-button mb-3">
                <span class="btn btn-default btn-file">
                    Choose File <input type="file" id="imgInp" onChange={onHandleImageChange} />
                </span>
                </div>
            </div>
        </div>
    )
}

export default UploadImage;