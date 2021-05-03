const CountrySearch = ({
    searchParam,
    onHandleSearchChange,
    onHandleSearch,
    onHandleResetForm,
}) => {
    const {
        countryName,
        countryCode,
        status
    } = searchParam;

    const onHandleFieldChange = (e) => {
        onHandleSearchChange({ ...searchParam, [e.target.name]: e.target.value });
    };

    const onSearch = (searchParam) => {
        onHandleSearch(searchParam);
    };

    return (
        <div className="card card-info">
            <div className="card-header">
                <h3 className="card-title">Search Criteria</h3>
            </div>
            <form className="form-horizontal" autoComplete="off">
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="form-group row">
                                <label for="inputEmail3" className="col-sm-2 col-form-label">
                                    Name
                </label>
                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="countryName"
                                        placeholder="Country Name"
                                        value={countryName}
                                        onChange={onHandleFieldChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group row">
                                <label for="inputPassword3" className="col-sm-2 col-form-label">
                                    Code
                </label>
                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="countryCode"
                                        name="countryCode"
                                        placeholder="Code"
                                        value={countryCode}
                                        onChange={onHandleFieldChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="form-group row">
                                <label for="inputPassword3" className="col-sm-2 col-form-label">
                                    Status
                </label>
                                <div className="col-sm-10">
                                    <select
                                        class="form-control"
                                        value={status}
                                        name="status"
                                        onChange={onHandleFieldChange}
                                    >
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
                            <button
                                type="button"
                                className="btn btn-info mr-5"
                                onClick={() => onSearch(searchParam)}
                            >
                                Search
              </button>
                            <button
                                type="button"
                                className="btn btn-info"
                                onClick={onHandleResetForm}
                            >
                                Reset
              </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};
export default CountrySearch;
