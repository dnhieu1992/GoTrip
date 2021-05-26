import classNames from 'classnames'

const BedForm = ({
    bed,
    isValid,
    errorMessage,
    onSaveFormChange,
    onClose,
    onSaveBed
}) => {
    const {
        name,
        description,
        status
    } = bed;

    const {
        bedNameErrorMsg,
        bedDescriptionErrorMsg,
        bedStatusErrorMsg
    } = errorMessage;

    const onHandlePropertyChange = (e) => {
        if (e?.target) {
            onSaveFormChange({
                ...bed,
                [e.target.name]: e.target.value
            });
        }
    };

    return (
        <form id="addNew">
            <div className="card-body">
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        className={classNames("form-control", { "is-invalid": bedNameErrorMsg })}
                        id="name"
                        placeholder="Name"
                        value={name}
                        onChange={onHandlePropertyChange}
                    />
                    {bedNameErrorMsg && (
                        <div className="invalid-feedback">
                            {bedNameErrorMsg}
                        </div>
                    )}
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        className={classNames("form-control", { "is-invalid": bedDescriptionErrorMsg })}
                        name="description"
                        value={description}
                        onChange={onHandlePropertyChange}
                    >

                    </textarea>
                    {bedDescriptionErrorMsg && (
                        <div className="invalid-feedback">
                            {bedDescriptionErrorMsg}
                        </div>
                    )}
                </div>
                <div className="form-group">
                    <label>Status</label>
                    <select
                        className={classNames("form-control", { "is-invalid": bedStatusErrorMsg })}
                        name="status"
                        value={status}
                        onChange={onHandlePropertyChange}
                    >
                        <option hidden>Choose a status...</option>
                        <option value=""></option>
                        <option value="Actived">Actived</option>
                        <option value="Disabled">Disabled</option>
                    </select>
                    {bedStatusErrorMsg && (
                        <div className="invalid-feedback">
                            {bedStatusErrorMsg}
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
                            onClick={() => onSaveBed(bed)}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default BedForm;

