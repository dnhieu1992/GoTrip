import classNames from 'classnames';

const CountryForm = ({
    country,
    isValid,
    errorMessage,
    onSaveFormChange,
    onClose,
    onSaveCountry
}) => {
    const {
        name,
        code,
        status
    } = country;

    const {
        countryNameErrorMsg,
        countryCodeErrorMsg,
        countryStatusErrorMsg
    } = errorMessage

    const onHandlePropertyChange = (e) => {
        if (e?.target) {
            onSaveFormChange({
                ...country,
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
                        className={classNames("form-control", { "is-invalid": countryNameErrorMsg })}
                        id="name"
                        placeholder="Name"
                        value={name}
                        onChange={onHandlePropertyChange}
                    />
                    {countryNameErrorMsg && (
                        <div className="invalid-feedback">
                            {countryNameErrorMsg}
                        </div>
                    )}

                </div>
                <div className="form-group">
                    <label>Code</label>
                    <input
                        type="text"
                        name="code"
                        className={classNames("form-control", { "is-invalid": countryCodeErrorMsg })}
                        id="code"
                        placeholder="Code"
                        value={code}
                        onChange={onHandlePropertyChange}
                    />
                    {countryCodeErrorMsg && (
                        <div className="invalid-feedback">
                            {countryCodeErrorMsg}
                        </div>
                    )}
                </div>
                <div className="form-group">
                    <label>Status</label>
                    <select
                        className={classNames("form-control", { "is-invalid": countryStatusErrorMsg })}
                        name="status"
                        value={status}
                        onChange={onHandlePropertyChange}
                    >
                        <option value=""></option>
                        <option value="Actived">Actived</option>
                        <option value="Disabled">Disabled</option>
                    </select>
                    {countryStatusErrorMsg && (
                        <div className="invalid-feedback">
                            {countryStatusErrorMsg}
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
                            onClick={() => onSaveCountry(country)}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default CountryForm;
