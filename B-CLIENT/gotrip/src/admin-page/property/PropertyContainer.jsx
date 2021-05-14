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
    const [total, setTotal] = useState(0);
    const [data, setData] = useState([]);
    const [searchParam, setSearchParam] = useState({});
    const [options, setOptions] = useState({ currentPage: 1, pageSize: 5 });
    const [isShow, setIsShow] = useState(false);
    const [property, setProperty] = useState({});
    const didMountRef = useRef(false);
    const [dataReady, setDateReady] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    useEffect(() => {
        if (!didMountRef.current) {
            onHandleSearch({});
            didMountRef.current = true;
        }
    });

    const onHandleSearchChange = (param) => {
        setSearchParam(param);
    }

    const onHandleSearch = ({ propertyName, status }, options = {}) => {
        const params = {
            name: propertyName,
            status: status,
            pageNumber: options.pageNumber || 1,
            pageSize: options.pageSize || 10,
            sortField: options.sortField,
            sortDirection: options.sortDirection
        }

        setDateReady(false);

        getProperties(params).then(({ total, properties }) => {
            setData(properties);
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
        debugger
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
            propertyName: '',
            status: ''
        });
    }

    const showModal = (property = {}) => {
        setProperty(property);
        if (property) {
            setProperty(property);
            setIsValid(true);
        }
        setIsShow(true);
    }

    const onClose = () => {
        setIsShow(false);
        setIsValid(false);
        setErrorMessage({});
        setProperty({});
    }

    const onSaveProperty = (property) => {
        if (property._id) {
            const updateRequest = { ...property, id: property._id }
            updateProperty(updateRequest).then(() => {
                onHandleSearch(searchParam);
                onClose();
            }).catch(error => {
                console.log(error);
            })
        } else {
            createNewProperty(property).then(() => {
                onHandleSearch(searchParam);
                onClose();
            }).catch(error => {
                console.log(error);
            })
        }
    }

    const onSaveFormChange = (property) => {
        setProperty(property);
        onHandleValidationForm(property);
    }

    const onDelete = ({ _id }) => {
        deleteProperty(_id).then(() => {
            onHandleSearch(searchParam);
        }).catch(error => {
            console.log(error);
        })
    }

    const onHandleValidationForm = (property) => {
        let isValid = property.name && property.description && property.status;
        let errorMessage = {};

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

        setIsValid(isValid);
        setErrorMessage(errorMessage);
    }

    const modalRender = () => {
        return (
            <Modal classNames={'modal-lg'}
                title={property.id ? 'Edit Property' : 'Add New Property'}
                onClose={onClose}
            >
                <PropertyForm
                    property={property}
                    onSaveFormChange={onSaveFormChange}
                    onClose={onClose}
                    onSaveProperty={onSaveProperty}
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

export default PropertyContainer;