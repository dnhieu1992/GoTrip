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

const CityContainer = () => {
    const [state, setState] = useState({});
    const [countries, setCountries] = useState([]);
    const didMountRef = useRef(false);
    const fetCitiesRef = useRef(false);

    const {
        total,
        data,
        options,
        isValid,
        city,
        isShow,
        dataReady,
        searchParam,
        errorMessage,
    } = state;

    useEffect(() => {
        if (!didMountRef.current) {
            getAllCountries();
            onHandleSearch({});
            didMountRef.current = true;
        }

        if (didMountRef.current && fetCitiesRef.current) {
            fetCities();
        }
    });

    const getAllCountries = () => {
        getCountries().then((countries) => {
            setCountries(countries);
        }).catch(error => {
            console.log(error);
        });
    }

    const fetCities = () => {
        fetCitiesRef.current = false;

        const {
            searchParam = {},
            options = {}
        } = state;

        getCities({ ...searchParam, ...options }, ({ total, cities }) => {
            const data = [];
            cities.forEach(city => {
                let { _id, name } = city.country;
                data.push({
                    ...city,
                    id: city._id,
                    countryId: _id,
                    countryName: name
                });
            })
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

        fetCitiesRef.current = true;

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
            cityName: '',
            countryName: '',
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
            isValid: !!city._id,
            city: city,
            errorMessage: {}
        });
    };

    const onClose = (isSearch) => {
        fetCitiesRef.current = !!isSearch;

        setState({
            ...state,
            isShow: false,
            isValid: false,
            errorMessage: {},
            city: null,
            dataReady: !isSearch
        });
    };

    const onSaveCity = (city) => {
        if (city._id) {
            updateCity(city, () => {
                onClose(true);
            });
        } else {
            createNewCity(city, () => {
                onClose(true);
            });
        };
    };

    const onSaveFormChange = (city) => {
        let isValid = true;
        let errorMessage = {};

        if (!city.name || !city.countryId || !city.status) {
            isValid = false;
        };

        if (!city.name && city.name !== undefined) {
            const cityNameErrorMsg = "The city name is required.";
            errorMessage = { ...errorMessage, cityNameErrorMsg }
            isValid = false;
        };

        if (!city.countryId && city.countryId !== undefined) {
            const countryNameErrorMsg = "The country name is required.";
            errorMessage = { ...errorMessage, countryNameErrorMsg }
            isValid = false;
        };

        if (!city.status && city.status !== undefined) {
            const cityStatusErrorMsg = "The city status is required.";
            errorMessage = { ...errorMessage, cityStatusErrorMsg }
            isValid = false;
        };

        setState({
            ...state,
            city,
            isValid,
            errorMessage
        });
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
                    city={city}
                    isValid={isValid}
                    errorMessage={errorMessage}
                    countries={countries}
                    onClose={onClose}
                    onSaveFormChange={onSaveFormChange}
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
                    <h3>City</h3>
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
