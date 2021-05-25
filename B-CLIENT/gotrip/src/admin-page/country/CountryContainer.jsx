import { useState, useRef, useEffect } from 'react';
import Modal from '../../shared/components/forms/Modal';
import CountryGrid from './component/CountryGrid';
import CountrySearch from './component/CountrySearch';
import CountryForm from './component/CountryForm';
import ImageUploader from '../../shared/components/ImageUploader';
import {
    getCountries,
    updateCountry,
    createNewCountry,
    deleteCountry
} from './api/apiHandle.js';

const CountryContainer = () => {
    const [state, setState] = useState({
        total: 0,
        countries: [],
        options: { pageNumber: 1, pageSize: 50, sortField: '', sortDirection: 'asc' },
        searchParam: {},
    });
    const didMountRef = useRef(false);
    const fetCountriesRef = useRef(false);

    const {
        total,
        countries,
        options,
        isValid,
        country,
        isShow,
        dataReady,
        searchParam,
        errorMessage,
    } = state;

    useEffect(() => {
        console.log(state);
        if (!didMountRef.current) {
            onHandleSearch({});
            didMountRef.current = true;
        }

        if (didMountRef.current && fetCountriesRef.current) {
            fetCountries();
        }
    });

    const fetCountries = () => {
        fetCountriesRef.current = false;

        const {
            searchParam = {},
            options = {}
        } = state;

        getCountries({ ...searchParam, ...options }, ({ total, countries }) => {
            setTimeout(() => {
                setState({
                    ...state,
                    total,
                    countries,
                    dataReady: true
                });
            }, 500);
        }, () => {
            setTimeout(() => {
                setState({ ...state, dataReady: true });
            }, 500);
        });
    }

    const onHandleSearch = (searchParam = {}, optionParams = {}) => {
        const options = {
            pageNumber: optionParams.pageNumber || 1,
            pageSize: optionParams.pageSize || 50,
            sortField: optionParams.sortField || null,
            sortDirection: optionParams.sortDirection || null
        }

        fetCountriesRef.current = true;

        setState({
            ...state,
            searchParam: searchParam,
            options: options,
            dataReady: false
        });
    };

    const onHandleSearchChange = (param) => {
        setState({
            ...state,
            searchParam: param
        });
    };

    const onHandlePageChange = (pageNumber) => {
        const { searchParam, options } = state;

        const optionsUpdate = {
            ...options,
            pageNumber
        }

        onHandleSearch(searchParam, optionsUpdate);
    };

    const onHandlePageSizeChange = (pageSize) => {
        const { searchParam, options } = state;

        const optionsUpdate = {
            ...options,
            pageSize,
            pageNumber: 1
        }

        onHandleSearch(searchParam, optionsUpdate);
    };

    const onHandleSortChange = (sortField, sortDirection) => {
        const { searchParam, options } = state;

        const optionsUpdate = {
            ...options,
            sortField,
            sortDirection
        }

        onHandleSearch(searchParam, optionsUpdate);
    };

    const onHandleResetForm = () => {
        const searchParam = {
            countryName: '',
            countryCode: '',
            status: ''
        };

        const options = {
            ...state.options,
            pageNumber: 1
        };

        onHandleSearch(searchParam, options);
    };

    const showModal = (country = {}) => {
        setState({
            ...state,
            isShow: true,
            isValid: !!country._id,
            country: country,
            errorMessage: {}
        });
    }

    const onClose = (isSearch) => {
        fetCountriesRef.current = !!isSearch;

        setState({
            ...state,
            isShow: false,
            isValid: false,
            errorMessage: {},
            country: null,
            dataReady: !isSearch
        });
    };

    const onSaveCountry = (country) => {
        if (country._id) {
            updateCountry(country, () => {
                onClose(true);
            });
        } else {
            createNewCountry(country, () => {
                onClose(true);
            });
        }
    };

    const onSaveFormChange = (country) => {
        let isValid = true;
        let errorMessage = {};

        if (!country.name || !country.code || !country.status) {
            isValid = false;
        }

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

        setState({
            ...state,
            country,
            isValid,
            errorMessage
        });
    };

    const onDelete = ({ _id }) => {
        const { searchParam, options } = state;

        deleteCountry(_id, () => {
            onHandleSearch(searchParam, options);
        });
    };

    const modalRender = () => {
        return (
            <Modal
                classNames={'modal-lg'}
                title={country?._id ? 'Edit Country' : 'Add New Country'}
                onClose={onClose}
            >
                <CountryForm
                    country={country}
                    isValid={isValid}
                    errorMessage={errorMessage}
                    onClose={onClose}
                    onSaveFormChange={onSaveFormChange}
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
                    <ImageUploader />
                    <CountryGrid
                        data={countries}
                        options={options}
                        totalItems={total}
                        dataReady={dataReady}
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
