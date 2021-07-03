import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../shared/components/forms/Modal';
import { closeModal, createNewPropertyType, deletePropertyType, getProperties, getPropertyTypes, showModal, updatePropertyType } from './actions/propertyType';
import PropertyTypeForm from './component/PropertyTypeForm';
import PropertyTypeGrid from './component/PropertyTypeGrid';
import PropertyTypeSearch from './component/PropertyTypeSearch';
import { PROPERTY_TYPE_TEXT_CONFIG } from './constants/resources';

const PropertyTypeContainer = () => {
    const { propertyTypePageData } = useSelector(state => ({ propertyTypePageData: state.propertyType }));
    const dispatch = useDispatch();
    const {
        total,
        searchParams,
        options,
        dataReady,
        propertyTypes,
        modal,
        isFetch,
        properties
    } = propertyTypePageData;

    useEffect(async () => {
        dispatch(getProperties());
        dispatch(getPropertyTypes());
    }, []);

    useEffect(() => {
        if (isFetch) {
            dispatch(getPropertyTypes({}));
        }
    }, [isFetch]);

    const onHandleSearch = (searchParams, options) => {
        dispatch(getPropertyTypes(searchParams, options));
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

    const onShow = (propertyType = {}) => {
        dispatch(showModal(propertyType));
    }

    const onClose = () => {
        dispatch(closeModal());

    }

    const onSavePropertyType = (propertyType) => {
        if (modal.propertyType._id) {
            dispatch(updatePropertyType({ ...propertyType, id: modal.propertyType._id }));
        } else {
            dispatch(createNewPropertyType(propertyType));
        }
    }

    const onDelete = ({ _id }) => {
        dispatch(deletePropertyType(_id));
    }

    const modalRender = ({ isLoading, propertyType, isValid }) => {
        return (
            <Modal
                classNames={'modal-lg'}
                title={propertyType?.id ? 'Edit Property Type' : 'Add New PropertyType'}
                onClose={onClose}
            >

                <PropertyTypeForm
                    isLoading={isLoading}
                    propertyType={propertyType}
                    properties={properties}
                    isValid={isValid}
                    onClose={onClose}
                    onSavePropertyType={onSavePropertyType}
                />
            </Modal>
        )
    }

    return (
        <>
            {modal && modalRender(modal)}
            <div className="card">
                <div className="card-header text-uppercase">
                    <h3>{PROPERTY_TYPE_TEXT_CONFIG.PROPERTY_TYPE_PAGE_HEADER}</h3>
                </div>
                <div className="card-body">
                    <PropertyTypeSearch
                        options={options}
                        properties={properties}
                        onHandleSearch={onHandleSearch}
                    />
                    <PropertyTypeGrid
                        data={propertyTypes}
                        options={options}
                        totalItems={total}
                        dataReady={dataReady}
                        showModal={onShow}
                        onHandlePageChange={onHandlePageChange}
                        onHandlePageSizeChange={onHandlePageSizeChange}
                        onDelete={onDelete}
                        onHandleSortChange={onHandleSortChange}
                    />
                </div>
            </div>
        </>
    )
}

export default PropertyTypeContainer;
