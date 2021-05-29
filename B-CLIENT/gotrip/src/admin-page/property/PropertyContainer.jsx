import { useEffect, useRef, useState } from 'react';
import Modal from '../../shared/components/forms/Modal';
import PropertyGrid from './component/PropertyGrid';
import PropertySearch from './component/PropertySearch';
import PropertyForm from './component/PropertyForm';
import {
    getProperties,
    updateProperty,
    createNewProperty,
    deleteProperty
} from './api/apiHandle.js';

const PropertyContainer = () => {

    const [state, setState] = useState({});
    const didMountRef = useRef(false);
    const fetPropertiesRef = useRef(false);

    const {
        total,
        searchParam,
        options,
        isShow,
        property,
        dataReady,
        properties,
        isValid,
        errorMessage
    } = state;

    useEffect(() => {
        if (!didMountRef.current) {
            onHandleSearch({});
            didMountRef.current = true;
        }

        if (didMountRef.current && fetPropertiesRef.current) {
            fetProperties();
        }
    });

    const fetProperties = () => {
        fetPropertiesRef.current = false;
        const {
            searchParam = {},
            options = {}
        } = state;

        getProperties({ ...searchParam, ...options }, ({ total, properties }) => {
            setTimeout(() => {
                setState({
                    ...state,
                    total,
                    properties,
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

        fetPropertiesRef.current = true;

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
            propertyName: '',
            status: ''
        }

        const options = {
            ...state.options,
            pageNumber: 1
        }

        onHandleSearch(searchParam, options);
    }

    const showModal = (property = {}) => {
        setState({
            ...state,
            isShow: true,
            isValid: !!property._id,
            property: property,
            errorMessage: {}
        });
    }

    const onClose = (isSearch) => {
        fetPropertiesRef.current = !!isSearch;

        setState({
            ...state,
            isShow: false,
            isValid: false,
            errorMessage: {},
            property: null,
            dataReady: !isSearch
        });
    }

    const onSaveProperty = (property) => {
        const propertyID = {...property,id:property._id}
        if (property._id) {
            updateProperty(propertyID, () => {
                onClose(true);
            });
        } else {
            createNewProperty(property, () => {
                onClose(true);
            });
        }
    }

    const onDelete = ({ _id }) => {
        const { searchParam, options } = state;

        deleteProperty(_id, () => {
            onHandleSearch(searchParam, options);
        });
    }

    const onSaveFormChange = (property) => {
        let isValid = true;
        let errorMessage = {};

        if (!property.name || !property.description || !property.status) {
            isValid = false;
        }

        if (!property.name && property.name !== undefined) {
            const propertyNameErrorMsg = "The property name is required.";
            errorMessage = { ...errorMessage, propertyNameErrorMsg }
            isValid = false;
        }

        if (!property.description && property.description !== undefined) {
            const propertyDescriptionErrorMsg = "The property description is required.";
            errorMessage = { ...errorMessage, propertyDescriptionErrorMsg }
            isValid = false;
        }

        if (!property.status && property.status !== undefined) {
            const propertyStatusErrorMsg = "The property Status is required.";
            errorMessage = { ...errorMessage, propertyStatusErrorMsg }
            isValid = false;
        }

        setState({
            ...state,
            property,
            isValid,
            errorMessage
        });
    }

    const modalRender = () => {
        return (
            <Modal classNames={'modal-lg'}
                title={property?.id ? 'Edit Property' : 'Add New Property'}
                onClose={onClose}
            >
                <PropertyForm
                    property={property}
                    isValid={isValid}
                    errorMessage={errorMessage}
                    onSaveFormChange={onSaveFormChange}
                    onClose={onClose}
                    onSaveProperty={onSaveProperty}
                />

            </Modal>
        )
    }
    return (
        <>
            {isShow && modalRender()}
            <div className="card">
                <div className="card-header text-uppercase">
                    <h3>Property</h3>
                </div>
                <div className="card-body">
                    <PropertySearch
                        searchParam={searchParam}
                        onHandleSearchChange={onHandleSearchChange}
                        onHandleSearch={onHandleSearch}
                        onHandleResetForm={onHandleResetForm}
                    />
                    <PropertyGrid
                        data={properties}
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

export default PropertyContainer;