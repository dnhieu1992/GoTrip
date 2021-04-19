const TypesOfAccommodationForm = ({
    typesOfAccommodation,
    onSaveFormChange,
    onClose,
    onSaveTypesOfAccommodation
}) => {
    const {id,name,amount,status} = typesOfAccommodation;

    const onHandlePropertyChange = (e) => {
        typesOfAccommodation[e.target.name]= e.target.value;
        onSaveFormChange(typesOfAccommodation);
    }

    return (
        <form id="addNew">
            <div className="card-body">
                <div className="form-group">
                    <label for = "exampleInputEmail1">Id</label>
                    <input type="text" name = "id" className="form-control" id = "id" placeholder = "Id" value = {id} onChange = {onHandlePropertyChange} />
                </div>
                <div className="form-group">
                    <label for="exampleInputEmail1">Name</label>
                    <input type="text" name="name" className="form-control" id="name" placeholder="Name" value={name} onChange={onHandlePropertyChange} />
                </div>
                <div className="form-group">
                    <label for="exampleInputEmail1">Amount</label>
                    <input type="text" name="amount" className="form-control" id="amount" placeholder="Amount" value={amount} onChange={onHandlePropertyChange} />
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Status</label>
                    <select class="form-control" name="status" value={status} onChange={onHandlePropertyChange} >
                        <option value=""></option>
                        <option value="Actived">Actived</option>
                        <option value="Disabled">Disabled</option>
                    </select>
                </div>
                <div className="form-group">
                    <div className="col-sm-12 d-flex justify-content-end">
                        <button type="button" className="btn btn-danger mr-5" onClick={onClose}>Close</button>
                        <button type="button" className="btn btn-info" onClick={()=>onSaveTypesOfAccommodation(typesOfAccommodation)}>Submit</button>
                    </div>
                </div>
            </div>
        </form>
    )
}
export default TypesOfAccommodationForm;