const UploadImage = () => {
    return (
        <div className="upload-image-container">
            <h1 className="upload-image-container__header">Upload image</h1>
            <div className="upload-image-container__form ">
                <div className="upload-image-container__form-button">
                    <span className="btn btn-default btn-file">
                        <i className="fa fa-cloud-upload"></i> &nbsp;
                        Choose File <input type="file" id="imgInp" />
                    </span>
                </div>
                <div className="upload-image-container__form-element">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="File name:"
                        readonly>
                    </input>
                </div>
                <div className="upload-image-container__form-title mt-3 d-flex justify-content-center">
                    <span>
                        The image uploaded will be rendered in side the box below.
                    </span>
                </div>
                <div className="upload-image-container__form-image">
                    <img id="img" />
                </div>
                
            </div>
        </div>
    )
}

export default UploadImage;