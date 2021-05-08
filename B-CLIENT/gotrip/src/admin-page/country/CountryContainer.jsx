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
    const [isValid, setIsValid] = useState(false)
    const [errorMessage, setErrorMessage] = useState({})
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
            pageSize: options.pageSize || 10,
            sortField: options.sortField,
            sortDirection: options.sortDirection
        }

        getCountries(params).then(({ total, countries }) => {
            setData(countries);
            setTotal(total);
        }).catch(error => {
            console.log(error);
        });
    };

    const onHandlePageChange = (pageNumber) => {
        onHandleSearch(searchParam, {
            pageSize: options.pageSize,
            pageNumber
        });

        setOptions({
            ...options,
            currentPage: pageNumber
        });
    };

    const onHandlePageSizeChange = (pageSize) => {
        onHandleSearch(searchParam, {
            pageSize: pageSize,
            pageNumber: 1
        });

        setOptions({
            pageSize,
            currentPage: 1
        });
    };

    const onHandleSortChange = (sortField, sortDirection) => {
        onHandleSearch(searchParam, {
            sortField,
            sortDirection
        });

        setOptions({
            sortField,
            sortDirection
        });
    };

    const onHandleResetForm = () => {
        onHandleSearch({}, {
            pageSize: options.pageSize,
            pageNumber: 1
        });

        setSearchParam({
            countryName: '',
            countryCode: '',
            status: ''
        });
    };

    const showModal = (country) => {
        console.log(country);
        if (country) {
            setCountry(country);
            setIsValid(true);
        }
        setIsShow(true);
    }

    const onClose = () => {
        setIsShow(false);
        setIsValid(false);
        setErrorMessage({})
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
        onHandleValidationForm(country);
    };

    const onHandleValidationForm = (country) => {
        let isValid = country.name && country.code && country.status;
        let errorMessage = {};

        if (!country.name && country.name !== undefined) {
            const countryNameErrorMsg = "The country name is required.";
            errorMessage = { ...errorMessage, countryNameErrorMsg }
            isValid = false;
        }

        if (!country.code && country.code !== undefined) {
            const countryCodeErrorMsg = "The country code is required.";
            errorMessage = { ...errorMessage, countryCodeErrorMsg }
            isValid = false;
        }

        if (!country.status && country.status !== undefined) {
            const countryStatusErrorMsg = "The country status is required.";
            errorMessage = { ...errorMessage, countryStatusErrorMsg }
            isValid = false;
        }

        setIsValid(isValid);
        setErrorMessage(errorMessage)
    }

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
            >
                <CountryForm
                    country={country}
                    onSaveFormChange={onSaveFormChange}
                    onClose={onClose}
                    onSaveCountry={onSaveCountry}
                    isValid={isValid}
                    errorMessage={errorMessage}
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
                        showModal={showModal}
                        onDelete={onDelete}
                        onHandlePageChange={onHandlePageChange}
                        onHandlePageSizeChange={onHandlePageSizeChange}
                        onHandleSortChange={onHandleSortChange}
                    />
                </div>
            </div>
        </>
    );
};

export default CountryContainer;
