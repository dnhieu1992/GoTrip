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
import { COUNTRY_TEXT_CONFIG } from './constants/resources';


const CountryContainer = () => {
    const [state, setState] = useState({});
    const didMountRef = useRef(false);
    const fetchCountriesRef = useRef(false);

    const {
        total,
        countries,
        options,
        isValid,
        country,
        isShow,
        dataReady,
        isLoading,
        searchParam,
    } = state;

    useEffect(() => {
        if (!didMountRef.current) {
            onHandleSearch({});
            didMountRef.current = true;
        }

        if (didMountRef.current && fetchCountriesRef.current) {
            fetchCountries();
        }
    });

    const fetchCountries = () => {
        fetchCountriesRef.current = false;

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

        fetchCountriesRef.current = true;

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
            name: '',
            code: '',
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
            country: country
        });
    }

    const onClose = (isSearch) => {
        fetchCountriesRef.current = !!isSearch;

        setState({
            ...state,
            isShow: false,
            isValid: false,
            errorMessage: {},
            country: null,
            dataReady: !isSearch,
            isLoading: false
        });
    };

    const onSaveCountry = (country) => {
        setState({ ...state, isLoading: true })
        if (state.country._id) {
            updateCountry({ ...country, id: state.country._id },
                () => {
                    onClose(true);
                },
                () => setState({ ...state, isLoading: false }));
        } else {
            createNewCountry(country,
                () => {
                    onClose(true);
                },
                () => setState({ ...state, isLoading: false }));
        }
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
                    isLoading={isLoading}
                    country={country}
                    isValid={isValid}
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
                    <h3>{COUNTRY_TEXT_CONFIG.COUNTRY_PAGE_HEADER}</h3>
                </div>
                <div className="card-body">
                    <CountrySearch
                        searchParam={searchParam}
                        onHandleSearchChange={onHandleSearchChange}
                        onHandleSearch={onHandleSearch}
                        onHandleResetForm={onHandleResetForm}
                    />
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
