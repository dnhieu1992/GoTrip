import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Modal from '../../shared/components/forms/Modal';
import CountryGrid from './component/CountryGrid';
import CountrySearch from './component/CountrySearch';
import CountryForm from './component/CountryForm';
import { COUNTRY_TEXT_CONFIG } from './constants/resources';
import { getCountries, createNewCountry, updateCountry, deleteCountry, showModal, closeModal } from './actions/country';

const CountryContainer = () => {
    const { countryPageData } = useSelector(state => ({ countryPageData: state.country }));
    const dispatch = useDispatch();

    const {
        total,
        countries,
        options,
        dataReady,
        searchParams,
        modal,
        isFetch
    } = countryPageData;

    useEffect(() => {
        dispatch(getCountries({}));
    }, []);

    useEffect(() => {
        if (isFetch) {
            dispatch(getCountries({}));
        }
    }, [isFetch])

    const onHandleSearch = (searchParams, options) => {
        dispatch(getCountries(searchParams, options));
    };

    const onHandlePageChange = (pageNumber) => {
        const optionsUpdate = {
            ...options,
            pageNumber
        }

        onHandleSearch(searchParams, optionsUpdate);
    };

    const onHandlePageSizeChange = (pageSize) => {
        const optionsUpdate = {
            ...options,
            pageSize,
            pageNumber: 1
        }

        onHandleSearch(searchParams, optionsUpdate);
    };

    const onHandleSortChange = (sortField, sortDirection) => {
        const optionsUpdate = {
            ...options,
            sortField,
            sortDirection
        }

        onHandleSearch(searchParams, optionsUpdate);
    };

    const onSaveCountry = async (country) => {
        if (modal.country._id) {
            dispatch(updateCountry({ ...country, id: modal.country._id }));
        } else {
            dispatch(createNewCountry(country));
        }
    };

    const onDelete = ({ _id }) => {
        dispatch(deleteCountry(_id));
    };

    const onShow = (country = {}) => {
        dispatch(showModal(country));
    }

    const onClose = () => {
        dispatch(closeModal());
    };

    const modalRender = ({ isLoading, country, isValid }) => {
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
            {modal && modalRender(modal)}
            <div className="card">
                <div className="card-header text-uppercase">
                    <h3>{COUNTRY_TEXT_CONFIG.COUNTRY_PAGE_HEADER}</h3>
                </div>
                <div className="card-body">
                    <CountrySearch
                        options={options}
                        onHandleSearch={onHandleSearch}
                    />
                    <CountryGrid
                        data={countries}
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
    );
};

export default CountryContainer;