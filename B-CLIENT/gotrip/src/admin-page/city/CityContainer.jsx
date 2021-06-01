import { useState, useRef, useEffect } from 'react';
import Modal from '../../shared/components/forms/Modal';
import CityGrid from './component/CityGrid';
import CitySearch from './component/CitySearch';
import CityForm from './component/CityForm';
import {
    getCities,
    updateCity,
    createNewCity,
    deleteCity,
    getCountries
} from './api/apiHandle.js';
import { CITY_TEXT_CONFIG } from './constants/resources';

const CityContainer = () => {
    const [state, setState] = useState({});
    const didMountRef = useRef(false);
    const fetchCitiesRef = useRef(false);

    const {
        total,
        data,
        options,
        isValid,
        city,
        countries = [],
        isShow,
        dataReady,
        isLoading,
        searchParam,
    } = state;

    useEffect(() => {
        if (!didMountRef.current) {
            getAllCountries();
            onHandleSearch({});
            didMountRef.current = true;
        }

        if (didMountRef.current && fetchCitiesRef.current) {
            fetchCities();
        }
    });

    const getAllCountries = () => {
        fetchCitiesRef.current = false;
        getCountries().then((countries) => {
            fetchCitiesRef.current = true;
            setState({
                ...state,
                countries
            });
        }).catch(error => {
            console.log(error);
        });
    }

    const fetchCities = () => {
        fetchCitiesRef.current = false;

        const {
            searchParam = {},
            options = {}
        } = state;

        getCities({ ...searchParam, ...options }, ({ total, cities }) => {
            const data = cities.map(city => {
                return {
                    ...city,
                    countryName: city.country.name
                }
            });
            setTimeout(() => {
                setState({
                    ...state,
                    total,
                    data,
                    dataReady: true
                });
            }, 500);
        }, () => {
            setTimeout(() => {
                setState({ ...state, dataReady: true })
            }, 500);
        });
    };

    const onHandleSearch = (searchParam = {}, optionParams = {}) => {
        const options = {
            pageNumber: optionParams.pageNumber || 1,
            pageSize: optionParams.pageSize || 50,
            sortField: optionParams.sortField || null,
            sortDirection: optionParams.sortDirection || null
        };

        fetchCitiesRef.current = true;
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
        };

        onHandleSearch(searchParam, optionsUpdate);
    };

    const onHandlePageSizeChange = (pageSize) => {
        const { searchParam, options } = state;

        const optionsUpdate = {
            ...options,
            pageSize,
            pageNumber: 1
        };

        onHandleSearch(searchParam, optionsUpdate);
    };

    const onHandleSortChange = (sortField, sortDirection) => {
        const { searchParam, options } = state;

        const optionsUpdate = {
            ...options,
            sortField,
            sortDirection
        };

        onHandleSearch(searchParam, optionsUpdate);
    };

    const onHandleResetForm = () => {
        const searchParam = {
            name: '',
            countryId: '',
            status: ''
        };

        const options = {
            ...state.options,
            pageNumber: 1
        };

        onHandleSearch(searchParam, options);
    };

    const showModal = (city = {}) => {
        setState({
            ...state,
            isShow: true,
            city: city
        });
    };

    const onClose = (isSearch) => {
        fetchCitiesRef.current = !!isSearch;

        setState({
            ...state,
            isShow: false,
            isValid: false,
            errorMessage: {},
            city: null,
            dataReady: !isSearch,
            isLoading: false
        });
    };

    const onSaveCity = (city) => {
        setState({ ...state, isLoading: true })
        if (state.city._id) {
            updateCity({ ...city, id: state.city._id },
                () => {
                    onClose(true);
                },
                () => setState({ ...state, isLoading: false }));
        } else {
            createNewCity(city,
                () => {
                    onClose(true);
                },
                () => setState({ ...state, isLoading: false }));
        }
    };

    const onDelete = ({ _id }) => {
        const { searchParam, options } = state;

        deleteCity(_id, () => {
            onHandleSearch(searchParam, options);
        });
    };

    const modalRender = () => {
        return (
            <Modal classNames={'modal-lg'}
                title={city?._id ? 'Edit City' : 'Add New City'}
                onClose={onClose}
            >
                <CityForm
                    isLoading={isLoading}
                    city={city}
                    countries={countries}
                    isValid={isValid}
                    onClose={onClose}
                    onSaveCity={onSaveCity}
                />
            </Modal>
        );
    };

    return (
        <>
            {isShow && modalRender()}
            <div className="card">
                <div className="card-header text-uppercase">
                    <h3>{CITY_TEXT_CONFIG.CITY_PAGE_HEADER}</h3>
                </div>
                <div className="card-body">
                    <CitySearch
                        searchParam={searchParam}
                        countries={countries}
                        onHandleSearchChange={onHandleSearchChange}
                        onHandleSearch={onHandleSearch}
                        onHandleResetForm={onHandleResetForm}
                    />
                    <CityGrid
                        data={data}
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
    )
}

export default CityContainer;
