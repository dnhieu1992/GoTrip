import PropTypes from 'prop-types';

const RoomTypeSearch = ({
    searchParam,
    onHandleSearchChange,
    onHandleSearch,
    onHandleResetForm
})=>{
    const {name,status}=searchParam;

    const onHandleFieldChange = (e)=>{
        if(e?.target){
            onHandleSearchChange({
                ...searchParam,
                [e.target.name]:e.target.value
            });
        }
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
                                        id="name"
                                        name="name"
                                        placeholder="Name"
                                        value={name}
                                        onChange={onHandleFieldChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Status</label>
                                <div className="col-sm-10">
                                    <select className="form-control" value={status} name="status" onChange={onHandleFieldChange}>
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

export default RoomTypeSearch;

RoomTypeSearch.propTypes = {
    searchParam: PropTypes.object,
    onHandleSearchChange: PropTypes.func.isRequired,
    onHandleSearch: PropTypes.func.isRequired,
    onHandleResetForm: PropTypes.func.isRequired,
}

RoomTypeSearch.defaultProps={
    searchParam:{},
}