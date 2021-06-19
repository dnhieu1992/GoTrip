const UploadImage = () => {
    return (
        <div className="image-preview">
            <h1 className="image-preview__header">Upload image</h1>
            <div className="image-preview__form ">
                <div className="image-preview__form-button">
                    <span className="btn btn-default btn-file">
                        <i className="fa fa-cloud-upload"></i> &nbsp;
                        Choose File 
                        <input type="file" id="imgInp" /> 
                    </span>
                </div>
                <div className="image-preview__form-title mt-3 d-flex justify-content-center">
                    <span>
                        The image uploaded will be rendered in side the box below.
                    </span>
                </div>
                <div className="image-preview__form-image">
                    <img id="img" />
                </div>
                
            </div>
        </div>
    )
}

export default UploadImage;