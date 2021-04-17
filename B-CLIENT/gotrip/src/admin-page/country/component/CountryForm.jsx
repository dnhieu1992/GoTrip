const CountryForm = ({
    country,
    onSaveFormChange
}) => {
    const { id, name, code, status } = country;

    const onHandlePropertyChange = (e) => {
        country[e.target.name] = e.target.value;
        onSaveFormChange(country);
    }

    return (
        <form id="addNew">
            <div className="card-body">
                <div className="form-group">
                    <label for="exampleInputEmail1">Id</label>
                    <input type="text" name="id" className="form-control" id="id" placeholder="Id" value={id} onChange={onHandlePropertyChange} />
                </div>
                <div className="form-group">
                    <label for="exampleInputEmail1">Name</label>
                    <input type="text" name="name" className="form-control" id="name" placeholder="Name" value={name} onChange={onHandlePropertyChange} />
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Code</label>
                    <input type="text" name="code" className="form-control" id="code" placeholder="Code" value={code} onChange={onHandlePropertyChange}/>
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Status</label>
                    <select class="form-control" name="status" value={status} onChange={onHandlePropertyChange} >
                        <option value=""></option>
                        <option value="Actived">Actived</option>
                        <option value="Disabled">Disabled</option>
                    </select>
                </div>
            </div>
        </form>
    )
}

export default CountryForm;