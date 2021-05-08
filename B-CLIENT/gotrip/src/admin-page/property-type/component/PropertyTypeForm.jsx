const PropertyTypeForm = ({
    propertyType,
    onSaveFormChange,
    onClose,
    onSavePropertyType,
    properties
}) => {
    const {
        name,
        propertyId,
        description,
        status
    } = propertyType;

    const onHandlePropertyTypeChange = (e) => {
        onSaveFormChange({ ...propertyType, [e.target.name]: e.target.value });
    }

    return (
        <form id="addNew">
            <div className="card-body">
                <div className="form-group">
                    <label for="exampleInputEmail1">Name</label>
                    <input type="text"
                        className="form-control"
                        name="name"
                        id="name"
                        placeholder="Name"
                        value={name}
                        onChange={onHandlePropertyTypeChange} />
                </div>
                <div className="form-group">
                    <label for="exampleInputEmail1">Description</label>
                    <textarea
                        type="text"
                        name="description"
                        className="form-control"
                        id="description"
                        placeholder="Description"
                        value={description}
                        onChange={onHandlePropertyTypeChange} />
                </div>
                <div className="form-group">
                    <label for="exampleInputEmail1">Property</label>
                    <select
                        className="form-select form-control"
                        aria-label="Default select example"
                        name="propertyId"
                        value={propertyId}
                        onChange={onHandlePropertyTypeChange}> 

                        <option select hidden>Choose the property</option>
                        <option value=""></option>
                        {
                            properties.map(property =>{
                                console.log(property)
                                return (
                                    <option value={property._id}>{property.name}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Status</label>
                    <select class="form-control" name="status" value={status} onChange={onHandlePropertyTypeChange} >
                        <option value=""></option>
                        <option value="Actived">Actived</option>
                        <option value="Disabled">Disabled</option>
                    </select>
                </div>
                <div className="form-group">
                    <div className="col-sm-12 d-flex justify-content-end">
                        <button type="button" className="btn btn-danger mr-5" onClick={onClose}>Close</button>
                        <button type="button" className="btn btn-info" onClick={() => onSavePropertyType(propertyType)}>Submit</button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default PropertyTypeForm