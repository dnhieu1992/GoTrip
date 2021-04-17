import { useState } from 'react';
import Modal from '../../shared/components/forms/Modal';
import CountryGrid from './component/CountryGrid';
import CountrySearch from './component/CountrySearch';

const CountryContainer = () => {

    const mockDatas = [
        { id: 1, code: 'US', name: 'United States', status: "Actived" },
        { id: 2, code: 'SG', name: 'Singapore', status: "Actived" },
        { id: 3, code: 'GB', name: 'United Kingdom', status: "Actived" },
        { id: 4, code: 'AF', name: 'AFGHANISTAN', status: "Actived" },
        { id: 5, code: 'AX', name: 'ALAND ISLANDS', status: "Actived" },
        { id: 6, code: 'AL', name: 'ALBANIA', status: "Actived" },
        { id: 7, code: 'AD', name: 'ANDORRA', status: "Actived" }
    ];
    const [data, setData] = useState(mockDatas.slice(0, 5));
    const [searchParam, setSearchParam] = useState({});
    const [options, setOptions] = useState({ currentPage: 1 });
    const [isShow, setIsShow] = useState(false);

    const onHandleSearchChange = (param) => {
        setSearchParam(param);
    }

    const onHandleSearch = ({ countryName, countryCode, status }) => {
        const countries = mockDatas.filter((item) => {
            if ((!countryName || (item.name.toLowerCase().indexOf(countryName.toLowerCase()) > -1))
                && (!countryCode || (item.code.toLowerCase().indexOf(countryCode.toLowerCase()) > -1))
                && (!status || (item.status.indexOf(status) > -1))) {
                return item;
            }
        });
        const result = countries.slice((options.currentPage - 1) * options.pageSize, options.currentPage * options.pageSize)
        setData(result);
    };

    const onHandlePageChange = (pageNumber) => {
        const result = mockDatas.slice((pageNumber - 1) * options.pageSize, pageNumber * options.pageSize);
        setData(result);
        setOptions({ ...options, currentPage: pageNumber });
    }

    const onHandleResetForm = () => {
        setSearchParam({});
        const result = mockDatas.slice((options.currentPage - 1) * options.pageSize, options.currentPage * options.pageSize);
        setData(result);
    }
    const modalRender = () => {

    }
    
    return (
        <>
            {isShow && modalRender()}
            <div className="card">
                <div className="card-header text-uppercase">
                    <h3>Country</h3>
                </div>
                <div className="card-body">
                    <CountrySearch searchParam={searchParam}
                        onHandleSearchChange={onHandleSearchChange}
                        onHandleSearch={onHandleSearch}
                        onHandleResetForm={onHandleResetForm}
                    />
                    <CountryGrid data={data}
                        options={options}
                        totalItems={mockDatas.length}
                        onHandlePageChange={onHandlePageChange} />
                </div>
            </div>
        </>
    )
}

export default CountryContainer;