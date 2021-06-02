import classNames from 'classnames';

const RoomTypeForm = ({
    roomType,
    onSaveFormChange,
    onClose,
    onSaveRoomType,
    isValid,
    errorMessage
}) => {
    const {
        name,
        description,
        status
    } = roomType;

    const {
        roomTypeNameErrorMsg,
        roomTypeDescriptionMsg,
        roomTypeStatusMsg
    } = errorMessage;

    const onHandlePropertyChange = (e) => {
        if (e?.target) {
            onSaveFormChange({
                ...roomType,
                [e.target.name]: e.target.value
            });
        }
    }

    return (
        <form id="addNew">
            <div className="card-body">
                <div className="form-group">
                    <label >Name</label>
                    <input
                        type="text"
                        name="name"
                        className={classNames("form-control", { "is-invalid": roomTypeNameErrorMsg })}
                        id="name"
                        placeholder="Name"
                        value={name}
                        onChange={onHandlePropertyChange}
                    />

                    {roomTypeNameErrorMsg && (
                        <div className="invalid-feedback">
                            {roomTypeNameErrorMsg}
                        </div>
                    )}
                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            type="text"
                            name="description"
                            id="description"
                            className={classNames("form-control", { "is-invalid": roomTypeDescriptionMsg })}
                            placeholder="Description"
                            value={description}
                            onChange={onHandlePropertyChange}
                        />
                        {roomTypeDescriptionMsg && (
                            <div className="invalid-feedback">
                                {roomTypeDescriptionMsg}
                            </div>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Status</label>
                        <select
                            name="status"
                            value={status}
                            className={classNames("form-control", { "is-invalid": roomTypeStatusMsg })}
                            onChange={onHandlePropertyChange}>

                            <option value=""></option>
                            <option value="Actived">Actived</option>
                            <option value="Disabled">Disabled</option>
                        </select>

                        {roomTypeStatusMsg && (
                            <div className="invalid-feedback">
                                {roomTypeStatusMsg}
                            </div>
                        )}
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12 d-flex justify-content-end">
                            <button
                                type="button"
                                className="btn btn-danger mr-5"
                                onClick={() => onClose(false)}
                            >
                                Close
                            </button>

                            <button
                                type="button"
                                className="btn btn-info"
                                disabled={!isValid}
                                onClick={() => onSaveRoomType(roomType)}
                            >Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default RoomTypeForm;