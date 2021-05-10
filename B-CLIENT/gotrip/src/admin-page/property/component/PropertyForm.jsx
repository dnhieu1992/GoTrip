import classNames from 'classnames';

const PropertyForm = ({
    property,
    onSaveFormChange,
    onClose,
    onSaveProperty,
    isValid,
    errorMessage
}) => {
    const {
        name,
        description,
        status
    } = property;

    const {
        propertyNameErrorMsg,
        propertyDescriptionErrorMsg,
        propertyStatusErrorMsg
    } = errorMessage

    const onHandlePropertyChange = (e) => {
        if (e?.target) {
            onSaveFormChange({
                ...property,
                [e.target.name]: e.target.value
            });
        }

    }

    return (
        <form id="addNew">
            <div className="card-body">
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        className={classNames("form-control", { "is-invalid": propertyNameErrorMsg })}
                        id="name"
                        placeholder="Name"
                        value={name}
                        onChange={onHandlePropertyChange}
                    />

                    {propertyNameErrorMsg && (
                        <div className="invalid-feedback">
                            {propertyNameErrorMsg}
                        </div>
                    )}
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        type="text"
                        name="description"
                        className={classNames("form-control", { "is-invalid": propertyDescriptionErrorMsg })}
                        id="description"
                        placeholder="Description"
                        value={description}
                        onChange={onHandlePropertyChange}
                    />

                    {propertyDescriptionErrorMsg && (
                        <div className="invalid-feedback">
                            {propertyDescriptionErrorMsg}
                        </div>
                    )}
                </div>
                <div className="form-group">
                    <label>Status</label>
                    <select
                        className={classNames("form-control", { "is-invalid": propertyStatusErrorMsg })}
                        name="status"
                        value={status}
                        onChange={onHandlePropertyChange} >

                        <option value=""></option>
                        <option value="Actived">Actived</option>
                        <option value="Disabled">Disabled</option>
                    </select>

                    {propertyStatusErrorMsg && (
                        <div className="invalid-feedback">
                            {propertyStatusErrorMsg}
                        </div>
                    )}
                </div>
                <div className="form-group">
                    <div className="col-sm-12 d-flex justify-content-end">
                        <button
                            type="button"
                            className="btn btn-danger mr-5"
                            onClick={onClose}
                        >
                            Close
                        </button>
                        <button
                            type="button"
                            className="btn btn-info"
                            disabled={!isValid}
                            onClick={() => onSaveProperty(property)}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}
export default PropertyForm;