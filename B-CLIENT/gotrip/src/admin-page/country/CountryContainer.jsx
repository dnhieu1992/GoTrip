import { useState, useRef, useEffect } from 'react';
import Modal from '../../shared/components/forms/Modal';
import CountryGrid from './component/CountryGrid';
import CountrySearch from './component/CountrySearch';
import CountryForm from './component/CountryForm';
import { 
    getCountries, 
    updateCountry, 
    createNewCountry, 
    deleteCountry 
} from './api/apiHandle.js';

const CountryContainer = () => {
    const [total, setTotal] = useState(0);
    const [data, setData] = useState([]);
    const [searchParam, setSearchParam] = useState({});
    const [options, setOptions] = useState({ currentPage: 1, pageSize: 10 });
    const [isShow, setIsShow] = useState(false);
    const [country, setCountry] = useState({});
    const didMountRef = useRef(false);

    useEffect(() => {
        if (!didMountRef.current) {
            onHandleSearch({});
            didMountRef.current = true;
        }
    });

    const onHandleSearchChange = (param) => {
        setSearchParam(param);

    };

    const onHandleSearch = ({ countryName, countryCode, status }, options = {}) => {
        const params = {
            name: countryName,
            code: countryCode,
            status: status,
            pageNumber: options.pageNumber || 1,
            pageSize: options.pageSize || 10
        }

        Object.keys(params).forEach(key => {
            if (params[key] === undefined || params[key] === null || (typeof (params[key]) === "String" && params[key] === '')) {
                delete params[key];
            }
        });

        getCountries(params).then(({ total, countries }) => {
            setData(countries);
            setTotal(total);
        }).catch(error => {
            console.log(error);
        });
    };

    const onHandlePageChange = (pageNumber) => {
        onHandleSearch(searchParam, { pageSize: options.pageSize, pageNumber });
        setOptions({ ...options, currentPage: pageNumber });
    };

    const onHandlePageSizeChange = (pageSize) => {
        onHandleSearch(searchParam, { pageSize: pageSize, pageNumber: 1 });
        setOptions({ pageSize, currentPage: 1 });
    };

    const onHandleResetForm = () => {
        setSearchParam({});
        onHandleSearch({}, { pageSize: options.pageSize, pageNumber: 1 })
    };

    const onAddNew = () => setIsShow(true);

    const onClose = () => {
        setIsShow(false);
        setCountry({});
    };

    const onSaveCountry = (country) => {
        if (country._id) {
            updateCountry(country).then(() => {
                onHandleSearch(searchParam);
                onClose();
            }).catch(error => {
                console.log(error)
            })
        } else {
            createNewCountry(country).then(() => {
                onHandleSearch(searchParam);
                onClose();
            }).catch(error => {
                console.log(error)
            })
        }
    };

    const onSaveFormChange = (country) => {
        setCountry(country);
    };

    const onEdit = (country) => {
        setCountry(country);
        setIsShow(true);
    };

    const onDelete = ({ _id }) => {
        deleteCountry(_id).then(() => {
            onHandleSearch(searchParam)
        }).catch(error => {
            console.log(error);
        })
    };

    const modalRender = () => {
        return (
            <Modal
                classNames={'modal-lg'}
                title={country.id ? 'Edit Country' : 'Add New Country'}
                onClose={onClose}
                onSave={onSaveCountry}
            >
                <CountryForm
                    country={country}
                    onSaveFormChange={onSaveFormChange}
                    onClose={onClose}
                    onSaveCountry={onSaveCountry}
                />
            </Modal>
        );
    };

    return (
        <>
            {isShow && modalRender()}
            <div className="card">
                <div className="card-header text-uppercase">
                    <h3>Country</h3>
                </div>
                <div className="card-body">
                    <CountrySearch
                        searchParam={searchParam}
                        onHandleSearchChange={onHandleSearchChange}
                        onHandleSearch={onHandleSearch}
                        onHandleResetForm={onHandleResetForm}
                    />
                    <CountryGrid
                        data={data}
                        options={options}
                        totalItems={total}
                        onHandlePageChange={onHandlePageChange}
                        onHandlePageSizeChange={onHandlePageSizeChange}
                        onAddNew={onAddNew}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                </div>
            </div>
        </>
    );
};

export default CountryContainer;
