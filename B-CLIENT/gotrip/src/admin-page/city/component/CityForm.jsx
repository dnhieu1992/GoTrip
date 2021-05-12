import classNames from 'classnames';

const CityForm = ({
  city,
  isValid,
  errorMessage,
  countries,
  onSaveFormChange,
  onClose,
  onSaveCity
}) => {
  const {
    name,
    countryId,
    status
  } = city;

  const {
    cityNameErrorMsg,
    countryNameErrorMsg,
    cityStatusErrorMsg
  } = errorMessage

  const onHandlePropertyChange = (e) => {
    if (e?.target) {
      onSaveFormChange({
        ...city,
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
            className={classNames("form-control", { "is-invalid": cityNameErrorMsg })}
            id="name"
            placeholder="Name"
            value={name}
            onChange={onHandlePropertyChange}
          />
          {cityNameErrorMsg && (
            <div className="invalid-feedback">
              {cityNameErrorMsg}
            </div>
          )}
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Country</label>
          <select
            className={classNames("form-control", { "is-invalid": countryNameErrorMsg })}
            aria-label="Default select example"
            name="countryId"
            value={countryId}
            onChange={onHandlePropertyChange}
          >
            <option hidden>Choose the country...</option>
            <option value=""></option>
            {countries.map(country => {
              return (
                <option value={country._id}>{country.name}</option>
              )
            })}
          </select>
          {countryNameErrorMsg && (
            <div className="invalid-feedback">
              {countryNameErrorMsg}
            </div>
          )}
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Status</label>
          <select
            className={classNames("form-control", { "is-invalid": cityStatusErrorMsg })}
            name="status"
            value={status}
            onChange={onHandlePropertyChange}
          >
            <option hidden>Choose a status...</option>
            <option value=""></option>
            <option value="Actived">Actived</option>
            <option value="Disabled">Disabled</option>
          </select>
          {cityStatusErrorMsg && (
            <div className="invalid-feedback">
              {cityStatusErrorMsg}
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
              onClick={() => onSaveCity(city)}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CityForm;