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
    const [total, setTotal] = useState(0);
    const [data, setData] = useState([]);
    const [searchParam, setSearchParam] = useState({});
    const [options, setOptions] = useState({ currentPage: 1, pageSize: 10 });
    const [isShow, setIsShow] = useState(false);
    const [propertyType, setPropertyType] = useState({});
    const didMountRef = useRef(false);
    const [properties, setProperties] = useState([]);
    const [dataReady, setDateReady] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    useEffect(() => {
        if (!didMountRef.current) {
            getAllProperties();
            onHandleSearch({});
            didMountRef.current = true;
        }
    });

    const getAllProperties = () => {
        getProperties().then((properties) => {
            setProperties(properties);
        }).catch(error => {
            console.log(error);
        })
    }

    const onHandleSearchChange = (param) => {
        setSearchParam(param);
    }

    const onHandleSearch = ({ propertyTypeName, propertyId, status }, options = {}) => {
        const params = {
            name: propertyTypeName,
            property: propertyId,
            status: status,
            pageNumber: options.pageNumber || 1,
            pageSize: options.pageSize || 10,
            sortField: options.sortField,
            sortDirection: options.sortDirection
        }

        setDateReady(false);

        getPropertyTypes(params).then(({ total, propertyTypes }) => {
            const data = [];
            propertyTypes.forEach(propertyType => {
                let name = propertyType.property ? propertyType.property.name : ""
                data.push({
                    ...propertyType,
                    id: propertyType._id,
                    property: name,
                });
            });

            setData(data);
            setTotal(total);
        }).catch(error => {
            console.log(error);
        }).finally(() => {
            setTimeout(() => { setDateReady(true) }, 2000);
        });
    }

    const onHandlePageChange = (pageNumber) => {
        onHandleSearch(searchParam, {
            pageSize: options.pageSize,
            pageNumber
        });
        setOptions({
            ...options,
            currentPage: pageNumber
        });
    }


    const onHandlePageSizeChange = (pageSize) => {
        onHandleSearch(searchParam, {
            pageSize: pageSize,
            pageNumber: 1
        });
        setOptions({
            pageSize,
            currentPage: 1
        });
    }

    const onHandleSortChange = (sortField, sortDirection) => {
        onHandleSearch(searchParam, {
            sortField,
            sortDirection
        });

        setOptions({
            sortField,
            sortDirection
        });
    }

    const onHandleResetForm = () => {
        onHandleSearch({}, {
            pageSize: options.pageSize,
            pageNumber: 1
        });
        setSearchParam({
            propertyTypeName: '',
            property: '',
            status: ''
        });
    }

    const showModal = (propertyType = {}) => {
        setPropertyType(propertyType);
        if (propertyType) {
            setPropertyType(propertyType);
            setIsValid(true);
        }

        setIsShow(true);
    }

    const onClose = () => {
        setIsShow(false);
        setIsValid(false);
        setErrorMessage({});
        setPropertyType({});

    }

    const onSavePropertyType = (propertyType) => {

        if (propertyType.id) {
            updatePropertyType(propertyType).then(() => {
                onHandleSearch(searchParam);
                onClose();
            }).catch(error => {
                console.log(error);
            });
        } else {
            createPropertyType(propertyType).then(() => {
                onHandleSearch(searchParam);
                onClose();
            }).catch(error => {
                console.log(error);
            });
        }
    }

    const onSaveFormChange = (propertyType) => {
        setPropertyType(propertyType);
        onHandleValidationForm(propertyType);
    }

    const onDelete = ({ _id }) => {
        deletePropertyType(_id).then(() => {
            onHandleSearch(searchParam);
        }).catch(error => {
            console.log(error);
        });
    }

    const onHandleValidationForm = (propertyType) => {
        let isValid = propertyType.name && propertyType.description && propertyType.propertyId && propertyType.status;
        let errorMessage = {};

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

        setIsValid(isValid);
        setErrorMessage(errorMessage);
    }

    const modalRender = () => {
        return (
            <Modal
                classNames={'modal-lg'}
                title={propertyType.id ? 'Edit Property Type' : 'Add New PropertyType'}
                onClose={onClose}
            >

                <PropertyTypeForm
                    propertyType={propertyType}
                    properties={properties}
                    onSaveFormChange={onSaveFormChange}
                    onClose={onClose}
                    onSavePropertyType={onSavePropertyType}
                    isValid={isValid}
                    errorMessage={errorMessage}
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
