import { useEffect, useRef, useState } from 'react';
import Modal from '../../shared/components/forms/Modal';
import {
    createNewAmenityCategory,
    deleteAmenityCategory,
    getAmenityCategories,
    updateAmenityCategory
} from './api/apiHandle';
import AmenityCategoryForm from './component/AmenityCategoryForm';
import AmenityCategoryGrid from './component/AmenityCategoryGrid';
import AmenityCategorySearch from './component/AmenityCategorySearch';
import { AMENITY_CATEGORY_TEXT_CONFIG } from './constants/resources';

const AmenityCategoryContainer = () => {
    const [state, setState] = useState({});
    const didMountRef = useRef(false);
    const fetchAmenityCategoriesRef = useRef(false);

    const {
        total,
        searchParam,
        options,
        isShow,
        amenityCategory,
        dataReady,
        amenityCategories,
        isValid,
        isLoading
    } = state;

    useEffect(() => {
        if (!didMountRef.current) {
            onHandleSearch({});
            didMountRef.current = true;
        }

        if (didMountRef.current && fetchAmenityCategoriesRef.current) {
            fetchAmenityCategories();
        }
    });

    const fetchAmenityCategories = () => {
        fetchAmenityCategoriesRef.current = false;
        const {
            searchParam = {},
            options = {}
        } = state;

        getAmenityCategories({ ...searchParam, ...options }, ({ total, amenityCategories }) => {
            setTimeout(() => {
                setState({
                    ...state,
                    total,
                    amenityCategories,
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

        fetchAmenityCategoriesRef.current = true;

        setState({
            ...state,
            searchParam: searchParam,
            options: options,
            dataReady: false
        });
    }

    const onHandleSearchChange = (param) => {
        setState({
            ...state,
            searchParam: param
        });
    }

    const onHandlePageChange = (pageNumber) => {
        const { searchParam, options } = state;

        const optionsUpdate = {
            ...options,
            pageNumber
        }

        onHandleSearch(searchParam, optionsUpdate);
    }

    const onHandlePageSizeChange = (pageSize) => {
        const { searchParam, options } = state;

        const optionsUpdate = {
            ...options,
            pageSize,
            pageNumber: 1
        }

        onHandleSearch(searchParam, optionsUpdate);
    }

    const onHandleSortChange = (sortField, sortDirection) => {
        const { searchParam, options } = state;
        const optionsUpdate = {
            ...options,
            sortField,
            sortDirection
        }

        onHandleSearch(searchParam, optionsUpdate);
    }

    const onHandleResetForm = () => {
        const searchParam = {
            name: '',
            description: '',
            status: ''
        }

        const options = {
            ...state.options,
            pageNumber: 1
        }

        onHandleSearch(searchParam, options);
    }

    const showModal = (amenityCategory = {}) => {
        setState({
            ...state,
            isShow: true,
            amenityCategory: amenityCategory
        });
    }

    const onClose = (isSearch) => {
        fetchAmenityCategoriesRef.current = !!isSearch;

        setState({
            ...state,
            isShow: false,
            isValid: false,
            errorMessage: {},
            amenityCategory: null,
            dataReady: !isSearch,
            isLoading: false
        });
    }

    const onSaveAmenityCategory = (amenityCategory) => {
        setState({ ...state, isLoading: true });
        if (state.amenityCategory._id) {
            updateAmenityCategory({ ...amenityCategory, id: state.amenityCategory._id },
                () => {
                    onClose(true);
                },
                () => setState({ ...state, isLoading: false }))
        } else {
            createNewAmenityCategory(amenityCategory,
                () => {
                    onClose(true);
                },
                () => setState({ ...state, isLoading: false }))
        }
    }

    const onDelete = ({ _id }) => {
        const { searchParam, options } = state;

        deleteAmenityCategory(_id, () => {
            onHandleSearch(searchParam, options);
        });
    }

    const modalRender = () => {
        return (
            <Modal
                classNames={'modal-lg'}
                title={amenityCategory?.id ? 'Edit Amenity Category' : 'Add Amenity Category'}
                onClose={onClose}
            >
                <AmenityCategoryForm
                    isLoading={isLoading}
                    amenityCategory={amenityCategory}
                    isValid={isValid}
                    onClose={onClose}
                    onSaveAmenityCategory={onSaveAmenityCategory}
                />
            </Modal>
        )
    }

    return (
        <>
            {isShow && modalRender()}
            <div className="card">
                <div className="card-header text-uppercase">
                    <h3>{AMENITY_CATEGORY_TEXT_CONFIG.AMENITY_CATEGORY_PAGE_HEADER}</h3>
                </div>
                <div className="card-body">
                    <AmenityCategorySearch
                        searchParam={searchParam}
                        onHandleSearchChange={onHandleSearchChange}
                        onHandleSearch={onHandleSearch}
                        onHandleResetForm={onHandleResetForm}
                    />
                    <AmenityCategoryGrid
                        data={amenityCategories}
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

export default AmenityCategoryContainer;