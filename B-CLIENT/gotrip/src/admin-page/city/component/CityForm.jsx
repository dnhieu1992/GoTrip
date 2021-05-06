const CityForm = ({
  city,
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

  const onHandlePropertyChange = (e) => {
    onSaveFormChange({ ...city, [e.target.name]: e.target.value });
  }

  return (
    <form id="addNew">
      <div className="card-body">
        <div className="form-group">
          <label for="exampleInputEmail1">Name</label>
          <input type="text" name="name" className="form-control" id="name" placeholder="Name" value={name} onChange={onHandlePropertyChange} />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Country</label>
          <select className="form-select form-control" aria-label="Default select example" name="countryId" value={countryId} onChange={onHandlePropertyChange}>
            <option selected hidden>Choose the country...</option>
            <option value=""></option>
            {countries.map(country => {
              return (
                <option value={country._id}>{country.name}</option>
              )
            })}
          </select>
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Status</label>
          <select class="form-control" name="status" value={status} onChange={onHandlePropertyChange} >
            <option selected hidden>Choose a status...</option>
            <option value=""></option>
            <option value="Actived">Actived</option>
            <option value="Disabled">Disabled</option>
          </select>
        </div>
        <div className="form-group">
          <div className="col-sm-12 d-flex justify-content-end">
            <button type="button" className="btn btn-danger mr-5" onClick={onClose}>Close</button>
            <button type="button" className="btn btn-info" onClick={() => onSaveCity(city)}>Submit</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CityForm;