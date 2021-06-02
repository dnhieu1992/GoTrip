import classNames from "classnames";

const PropertyTypeForm = ({
    propertyType,
    onSaveFormChange,
    onClose,
    onSavePropertyType,
    properties,
    isValid,
    errorMessage
}) => {
    const {
        name,
        property,
        description,
        status
    } = propertyType;

    const {
        propertyTypeNameErrorMsg,
        propertyTypeDescriptionErrorMsg,
        propertyTypePropertyErrorMsg,
        propertyTypeStatusErrorMsg
    } = errorMessage

    const onHandlePropertyChange = (e) => {
        if (e?.target) {
            onSaveFormChange({
                ...propertyType,
                [e.target.name]: e.target.value
            });
        }
    }

    return (
        <form id="addNew">
            <div className="card-body">
                <div className="form-group">
                    <label>Name</label>
                    <input type="text"
                        className={classNames("form-control", { "is-invalid": propertyTypeNameErrorMsg })}
                        name="name"
                        id="name"
                        placeholder="Name"
                        value={name}
                        onChange={onHandlePropertyChange} />

                    {propertyTypeNameErrorMsg && (
                        <div className="invalid-feedback">
                            {propertyTypeNameErrorMsg}
                        </div>
                    )}
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        type="text"
                        name="description"
                        className={classNames("form-control", { "is-invalid": propertyTypeDescriptionErrorMsg })}
                        id="description"
                        placeholder="Description"
                        value={description}
                        onChange={onHandlePropertyChange} />

                    {propertyTypeDescriptionErrorMsg && (
                        <div className="invalid-feedback">
                            {propertyTypeDescriptionErrorMsg}
                        </div>
                    )}
                </div>
                <div className="form-group">
                    <label>Property</label>
                    <select
                        className={classNames("form-control", { "is-invalid": propertyTypePropertyErrorMsg })}
                        aria-label="Default select example"
                        name="propertyId"
                        value={property._id}
                        onChange={onHandlePropertyChange}>
                        <option value=""></option>
                        {
                            properties.map(property => {
                                console.log(property)
                                return (
                                    <option key={property._id} value={property._id}>{property.name}</option>
                                )
                            })
                        }
                    </select>
                    {propertyTypePropertyErrorMsg && (
                        <div className="invalid-feedback">
                            {propertyTypePropertyErrorMsg}
                        </div>
                    )}
                </div>
                <div className="form-group">
                    <label>Status</label>
                    <select
                        className={classNames("form-control", { "is-invalid": propertyTypeStatusErrorMsg })}
                        name="status"
                        value={status}
                        onChange={onHandlePropertyChange} >

                        <option value=""></option>
                        <option value="Actived">Actived</option>
                        <option value="Disabled">Disabled</option>
                    </select>

                    {propertyTypeStatusErrorMsg && (
                        <div className="invalid-feedback">
                            {propertyTypeStatusErrorMsg}
                        </div>
                    )}
                </div>
                <div className="form-group">
                    <div className="col-sm-12 d-flex justify-content-end">
                        <button
                            type="button"
                            className="btn btn-danger mr-5"
                            onClick={() => onClose(false)}
                        >Close
                        </button>
                        <button
                            type="button"
                            className="btn btn-info"
                            disabled={!isValid}
                            onClick={() => onSavePropertyType(propertyType)}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default PropertyTypeForm