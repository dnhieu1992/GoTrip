const CityForm = ({
  city,
  isUpdating,
  onSaveFormChange,
  onClose,
  onSaveCity
}) => {
  const { id, name, country, status } = city;

  const onHandlePropertyChange = (e) => {
    onSaveFormChange({ ...city, [e.target.name]: e.target.value });
  }

  return (
    <form id="addNew">
      <div className="card-body">
        <div className="form-group">
          <label for="exampleInputEmail1">Id</label>
          <input type="text" name="id" className="form-control" id="id" placeholder="Id" value={id} onChange={onHandlePropertyChange} disabled={isUpdating} />
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">Name</label>
          <input type="text" name="name" className="form-control" id="name" placeholder="Name" value={name} onChange={onHandlePropertyChange} />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Country</label>
          <select className="form-select form-control" aria-label="Default select example" name="country" value={country} onChange={onHandlePropertyChange}>
            <option selected hidden>Choose the city...</option>
            <option value=""></option>
            <option value="Việt Nam">Việt Nam</option>
            <option value="United State" >United State</option>
            <option value="Trung Quốc" >Trung Quốc</option>
            <option value="Ấn Độ" >Ấn Độ</option>
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
  )
}

export default CityForm;