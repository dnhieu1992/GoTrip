import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../shared/components/forms/Modal';
import { closeModal, createNewAmenityCategory, deleteAmenityCategory, getAmenityCategories, showModal, updateAmenityCategory } from './actions/amenityCategory';
import AmenityCategoryForm from './component/AmenityCategoryForm';
import AmenityCategoryGrid from './component/AmenityCategoryGrid';
import AmenityCategorySearch from './component/AmenityCategorySearch';
import { AMENITY_CATEGORY_TEXT_CONFIG } from './constants/resources';

const AmenityCategoryContainer = () => {
    const { amenityCategoryPageData } = useSelector(state => ({ amenityCategoryPageData: state.amenityCategory }));
    const dispatch = useDispatch();

    const {
        total,
        searchParams,
        options,
        dataReady,
        amenityCategories,
        modal,
        isFetch
    } = amenityCategoryPageData;

    useEffect(() => {
        dispatch(getAmenityCategories());
    }, []);

    useEffect(() => {
        if (isFetch) {
            dispatch(getAmenityCategories({}));
        }
    }, [isFetch]);

    const onHandleSearch = (searchParams, options) => {
        dispatch(getAmenityCategories(searchParams, options));
    }

    const onHandlePageChange = (pageNumber) => {
        const optionsUpdate = {
            ...options,
            pageNumber
        }

        onHandleSearch(searchParams, optionsUpdate);
    }

    const onHandlePageSizeChange = (pageSize) => {
        const optionsUpdate = {
            ...options,
            pageSize,
            pageNumber: 1
        }

        onHandleSearch(searchParams, optionsUpdate);
    }

    const onHandleSortChange = (sortField, sortDirection) => {
        const optionsUpdate = {
            ...options,
            sortField,
            sortDirection
        }

        onHandleSearch(searchParams, optionsUpdate);
    }

    const onShow = (amenityCategory = {}) => {
        dispatch(showModal(amenityCategory));
    }

    const onClose = () => {
        dispatch(closeModal());
    }

    const onSaveAmenityCategory = (amenityCategory) => {
        if (modal.amenityCategory._id) {
            dispatch(updateAmenityCategory({ ...amenityCategory, id: modal.amenityCategory._id }));
        } else {
            dispatch(createNewAmenityCategory(amenityCategory));
        }
    }

    const onDelete = ({ _id }) => {
        dispatch(deleteAmenityCategory(_id));
    }

    const modalRender = ({ isLoading, amenityCategory, isValid }) => {
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
            {modal && modalRender(modal)}
            <div className="card">
                <div className="card-header text-uppercase">
                    <h3>{AMENITY_CATEGORY_TEXT_CONFIG.AMENITY_CATEGORY_PAGE_HEADER}</h3>
                </div>
                <div className="card-body">
                    <AmenityCategorySearch
                        onHandleSearch={onHandleSearch}
                        options={options}
                    />
                    <AmenityCategoryGrid
                        data={amenityCategories}
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

export default AmenityCategoryContainer;