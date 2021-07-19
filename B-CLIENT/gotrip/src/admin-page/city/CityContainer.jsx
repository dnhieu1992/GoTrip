import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Modal from '../../shared/components/forms/Modal';
import CityGrid from './component/CityGrid';
import CitySearch from './component/CitySearch';
import CityForm from './component/CityForm';
import {
    getCities,
    updateCity,
    createNewCity,
    deleteCity,
    getCountries,
    showModal,
    closeModal
} from './actions/city';
import { CITY_TEXT_CONFIG } from './constants/resources';

const CityContainer = () => {
    const { cityPageData } = useSelector(state => ({ cityPageData: state.city }));
    const dispatch = useDispatch();

    const {
        total,
        cities,
        countries,
        options,
        dataReady,
        searchParams,
        modal,
        isFetch
    } = cityPageData;

    useEffect(async () => {
        dispatch(getCities());
        dispatch(getCountries());
    }, []);

    useEffect(() => {
        if (isFetch) {
            dispatch(getCities({}));
        }
    }, [isFetch])

    const onHandleSearch = (searchParams, options) => {
        dispatch(getCities(searchParams, options));
    }

    const onHandlePageChange = (pageNumber) => {
        const optionsUpdate = {
            ...options,
            pageNumber
        }

        onHandleSearch(searchParams, optionsUpdate);
    }

    const onHandlePageSizeChange = (pageSize) => {
        const optionUpdate = {
            ...options,
            pageSize,
            pageNumber: 1
        }

        onHandleSearch(searchParams, optionUpdate);
    }

    const onHandleSortChange = (sortField, sortDirection) => {

        const optionsUpdate = {
            ...options,
            sortField,
            sortDirection
        }

        onHandleSearch(searchParams, optionsUpdate);
    }

    const onShow = (city = {}) => {
        dispatch(showModal(city));
    }

    const onClose = () => {
        dispatch(closeModal());
    }

    const onSaveCity = (city) => {
        if (modal.city._id) {
            dispatch(updateCity({ ...city, id: modal.city._id }));
        } else {
            dispatch(createNewCity(city));
        }
    }

    const onDelete = ({ _id }) => {
        dispatch(deleteCity(_id));
    }

    const modalRender = ({ isLoading, city, isValid }) => {
        return (
            <Modal classNames={'modal-lg'}
                title={city?._id ? CITY_TEXT_CONFIG.CITY_UPDATE_HEADER_LBL : CITY_TEXT_CONFIG.CITY_CREATE_HEADER_LBL}
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
            {modal && modalRender(modal)}
            <div className="card">
                <div className="card-header text-uppercase">
                    <h3>{CITY_TEXT_CONFIG.CITY_PAGE_HEADER}</h3>
                </div>
                <div className="card-body">
                    <CitySearch
                        options={options}
                        countries={countries}
                        onHandleSearch={onHandleSearch}
                    />
                    <CityGrid
                        data={cities}
                        options={options}
                        totalItems={total}
                        dataReady={dataReady}
                        showModal={onShow}
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
