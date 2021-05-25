import uploadIcon from '../../upload/images/UploadIcon.svg';

const ImageUploader = (props) => {
    return (
        <div className="image-uploader-container">
            <div className="file-container">
                <img src={uploadIcon} className="upload-Icon mx-auto d-block" alt="Upload Icon" />
                <p className="">Max file size: 5mb, accepted: jpg|gif|png</p>
                <div className="file-container-errors">
                </div>
                <button type="button" className="file-choose-btn">Choose images</button>
                <input type="file" name="" multiple="" accept="image/*" />
                <div className="upload-pictures-wrapper">
                    <div>
                        <div className="upload-picture-container">
                            <div className="delete-image">X</div>
                            <img src="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImageUploader;