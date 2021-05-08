const CountryForm = ({
    country,
    onSaveFormChange,
    onClose,
    onSaveCountry
}) => {
    const {
        name,
        code,
        status
    } = country;

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
                    <label for="exampleInputEmail1">Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        id="name"
                        placeholder="Name"
                        value={name}
                        onChange={onHandlePropertyChange}
                    />
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Code</label>
                    <input
                        type="text"
                        name="code"
                        className="form-control"
                        id="code"
                        placeholder="Code"
                        value={code}
                        onChange={onHandlePropertyChange}
                    />
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Status</label>
                    <select
                        class="form-control"
                        name="status"
                        value={status}
                        onChange={onHandlePropertyChange}
                    >
                        <option value=""></option>
                        <option value="Actived">Actived</option>
                        <option value="Disabled">Disabled</option>
                    </select>
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
