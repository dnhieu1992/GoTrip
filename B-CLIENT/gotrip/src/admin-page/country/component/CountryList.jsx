import Grid from '../../../shared/components/grid/Grid'
import { useState } from 'react';

const CountryList = () => {
    const mockDatas = [
        { id: 1, code: 'US', name: 'United States', status: "Actived" },
        { id: 2, code: 'SG', name: 'Singapore', status: "Actived" },
        { id: 3, code: 'GB', name: 'United Kingdom', status: "Actived" },
        { id: 4, code: 'AF', name: 'AFGHANISTAN', status: "Actived" },
        { id: 5, code: 'AX', name: 'ALAND ISLANDS', status: "Actived" },
        { id: 6, code: 'AL', name: 'ALBANIA', status: "Actived" },
        { id: 7, code: 'AD', name: 'ANDORRA', status: "Actived" }
    ];
    const [countryName, setCountryName] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [data, setData] = useState(mockDatas);
    const columns = [
        {
            fieldName: 'Id',
            dataField: 'id',
            isHidden: true
        },
        {
            fieldName: 'Code',
            dataField: 'code'
        },
        {
            fieldName: 'Name',
            dataField: 'name'
        },
        {
            fieldName: 'Status',
            dataField: 'status'
        }
    ];

    const onHandleNameChange = (e) => {
        setCountryName(e.target.value);
    };

    const onHandleCodeChange = (e) => {
        setCountryCode(e.target.value);
    };

    const onHandleSearch = () => {
        const result = mockDatas.filter(item => {
            if ((!countryName || (countryName && item.name.indexOf(countryName) > -1)) && (!countryCode || (countryCode && item.code.indexOf(countryCode) > -1))) {
                return item;
            }
        });
        setData(result);
    };

    return (
        <div className="card">
            <div className="card-header">
                <h3>Country</h3>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group row">
                            <label className="col-sm-4">Name</label>
                            <input className="form-control col-sm-8" value={countryName} onChange={onHandleNameChange} />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group row">
                            <label className="col-sm-4">Code</label>
                            <input className="form-control col-sm-8" value={countryCode} onChange={onHandleCodeChange} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className='col-sm-12 d-flex justify-content-end'>
                        <button type="button" className="btn btn-primary" onClick={onHandleSearch}>Search</button>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="mt-5">
                    <Grid data={data}
                        columns={columns}
                        currentPage={1}
                        pageSize={5}
                        total={mockDatas.length}
                    />
                </div>
            </div>
        </div>

    )
}
export default CountryList;