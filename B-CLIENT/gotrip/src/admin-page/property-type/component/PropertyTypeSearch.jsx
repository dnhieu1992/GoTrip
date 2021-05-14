import PropTypes from 'prop-types';

const PropertyTypeSearch = ({
    searchParam,
    onHandleSearchChange,
    onHandleSearch,
    onHandleResetForm,
    properties
}) => {
    const {
        propertyTypeName,
        propertyId,
        status
    } = searchParam;

    const onHandleFieldChange = (e) => {
        if (e?.target) {
            onHandleSearchChange({
                ...searchParam,
                [e.target.name]: e.target.value
            });
        }
    }

    const onSearch = (searchParam) => {
        onHandleSearch(searchParam);
    }

    return (
        <div className="card card-info">
            <div className="card-header">
                <h3 className="card-title">Search</h3>
            </div>
            <form className="form-horizontal" autoComplete="off">
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Name</label>
                                <div className="col-sm-10">
                                    <input type="text"
                                        className="form-control"
                                        id="propertyTypeName"
                                        name="propertyTypeName"
                                        placeholder="Property Type Name"
                                        value={propertyTypeName}
                                        onChange={onHandleFieldChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Property</label>
                                <div className="col-sm-10">
                                    <select
                                        className="form-control"
                                        id="propertyId"
                                        name="propertyId"
                                        value={propertyId}
                                        onChange={onHandleFieldChange} >

                                        <option value="">Choose the property</option>
                                        {
                                            properties.map(property => {
                                                return (
                                                    <option key={property._id} value={property._id}> {property.name} </option>
                                                )
                                            })
                                        }
                                    </select>.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label" >Status</label>
                                <div className="col-sm-10">
                                    <select name="status" className="form-control" value={status} onChange={onHandleFieldChange}>
                                        <option value=""></option>
                                        <option value="Actived">Actived</option>
                                        <option value="Disabled">Disabled</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 d-flex justify-content-end">
                            <button type="button" className="btn btn-info mr-5" onClick={() => onHandleSearch(searchParam)} >Search</button>
                            <button type="button" className="btn btn-info" onClick={onHandleResetForm}>Reset</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default PropertyTypeSearch;

PropertyTypeSearch.propTypes = {
    searchParam: PropTypes.object,
    onHandleSearchChange: PropTypes.func.isRequired,
    onHandleSearch: PropTypes.func.isRequired,
    onHandleResetForm: PropTypes.func.isRequired
}

PropertyTypeSearch.defaultProps = {
    searchParam: {}
}