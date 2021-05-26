import { useState, useRef, useEffect } from 'react';
import Modal from '../../shared/components/forms/Modal';
import PropertyTypeForm from './component/PropertyTypeForm';
import PropertyTypeGrid from './component/PropertyTypeGrid';
import PropertyTypeSearch from './component/PropertyTypeSearch';

import {
    getPropertyTypes,
    createPropertyType,
    updatePropertyType,
    deletePropertyType,
    getProperties
} from './api/apiHandle.js';

const PropertyTypeContainer = () => {
    const [state, setState] = useState({});
    const didMountRef = useRef(false);
    const fetPropertyTypesRef = useRef(false);
    const [properties, setProperties] = useState([]);

    const {
        total,
        data,
        options,
        isValid,
        propertyType,
        isShow,
        dataReady,
        errorMessage,
        searchParam
    } = state;
    useEffect(() => {
        if (!didMountRef.current) {
            getAllProperties();
            onHandleSearch({});
            didMountRef.current = true;
        }

        if (didMountRef.current && fetPropertyTypesRef.current) {
            fetPropertyTypes();
        }
    });

    const getAllProperties = () => {
        getProperties().then((properties) => {
            setProperties(properties);
        }).catch(error => {
            console.log(error);
        })
    }

    const fetPropertyTypes = () => {
        fetPropertyTypesRef.current = false;

        const {
            searchParam = {},
            options = {},
        } = state;

        getPropertyTypes({ ...searchParam, ...options }, ({ total, propertyTypes }) => {
            const data = [];
            propertyTypes.forEach(propertyType => {
                let name = propertyType.property ? propertyType.property.name : ""
                data.push({
                    ...propertyType,
                    id: propertyType._id,
                    property: name,
                });
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
    }

    const onHandleSearch = (searchParam = {}, optionParams = {}) => {
        const options = {
            pageNumber: optionParams.pageNumber || 1,
            pageSize: optionParams.pageSize || 50,
            sortField: optionParams.sortField || null,
            sortDirection: optionParams.sortDirection || null
        }

        fetPropertyTypesRef.current = true;

        setState({
            ...state,
            searchParam: searchParam,
            options: options,
            dataReady: false
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

    const onHandleSearchChange = (param)=>{
        setState({
            ...state,
            searchParam:param
        });
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
            propertyTypeName: '',
            property: '',
            status: ''
        }

        const options = {
            ...state.options,
            pageNumber: 1
        }

        onHandleSearch(searchParam, options);
    }

    const showModal = (propertyType = {}) => {
        setState({
            ...state,
            isShow: true,
            isValid: !!propertyType._id,
            propertyType: propertyType,
            errorMessage: {}
        });
    }

    const onClose = (isSearch) => {
        fetPropertyTypesRef.current = !!isSearch;

        setState({
            ...state,
            isShow: false,
            isValid: false,
            errorMessage: {},
            propertyType: null,
            dataReady: !isSearch
        });

    }

    const onSavePropertyType = (propertyType) => {
        if (propertyType._id) {
            updatePropertyType(propertyType, () => {
                onClose(true);
            });
        } else {
            createPropertyType(propertyType, () => {
                onClose(true);
            });
        }
    }

    const onSaveFormChange = (propertyType) => {
        let isValid = true;
        let errorMessage = {};

        if (!propertyType.name || !propertyType.description || !propertyType.propertyId || !propertyType.status) {
            isValid = false;
        }

        if (!propertyType.name && propertyType.name !== undefined) {
            const propertyTypeNameErrorMsg = "The property type name is required.";
            errorMessage = { ...errorMessage, propertyTypeNameErrorMsg }
            isValid = false;
        }

        if (!propertyType.description && propertyType.description !== undefined) {
            const propertyTypeDescriptionErrorMsg = "The property type description is required.";
            errorMessage = { ...errorMessage, propertyTypeDescriptionErrorMsg }
            isValid = false;
        }

        if (!propertyType.propertyId && propertyType.propertyId !== undefined) {
            const propertyTypePropertyErrorMsg = "The property is required.";
            errorMessage = { ...errorMessage, propertyTypePropertyErrorMsg }
            isValid = false;
        }

        if (!propertyType.status && propertyType.status !== undefined) {
            const propertyTypeStatusErrorMsg = "The property type status is required.";
            errorMessage = { ...errorMessage, propertyTypeStatusErrorMsg }
            isValid = false;
        }

        setState({
            ...state,
            propertyType,
            isValid,
            errorMessage
        });
    }

    const onDelete = ({ _id }) => {
        const { searchParam, options } = state;

        deletePropertyType(_id, () => {
            onHandleSearch(searchParam, options);
        });
    }

    const modalRender = () => {
        return (
            <Modal
                classNames={'modal-lg'}
                title={propertyType?.id ? 'Edit Property Type' : 'Add New PropertyType'}
                onClose={onClose}
            >

                <PropertyTypeForm
                    propertyType={propertyType}
                    properties={properties}
                    isValid={isValid}
                    errorMessage={errorMessage}
                    onSaveFormChange={onSaveFormChange}
                    onClose={onClose}
                    onSavePropertyType={onSavePropertyType}
                />
            </Modal>
        )
    }

    return (
        <>
            {isShow && modalRender()}
            <div className="card">
                <div className="card-header text-uppercase">
                    <h3>Property Type</h3>
                </div>
                <div className="card-body">
                    <PropertyTypeSearch
                        searchParam={searchParam}
                        properties={properties}
                        onHandleSearchChange={onHandleSearchChange}
                        onHandleSearch={onHandleSearch}
                        onHandleResetForm={onHandleResetForm}
                    />
                    <PropertyTypeGrid
                        data={data}
                        options={options}
                        totalItems={total}
                        dataReady={dataReady}
                        showModal={showModal}
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
