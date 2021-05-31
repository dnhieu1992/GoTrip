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
import { PROPERTYTYPE_TEXT_CONFIG } from './constants/resources';

const PropertyTypeContainer = () => {
    const [state, setState] = useState({});
    const didMountRef = useRef(false);
    const fetchPropertyTypesRef = useRef(false);
    const [properties, setProperties] = useState([]);

    const {
        total,
        data,
        options,
        isValid,
        propertyType,
        isShow,
        dataReady,
        isLoading,
        searchParam
    } = state;
    useEffect(() => {
        if (!didMountRef.current) {
            getAllProperties();
            onHandleSearch({});
            didMountRef.current = true;
        }

        if (didMountRef.current && fetchPropertyTypesRef.current) {
            fetchPropertyTypes();
        }
    });

    const getAllProperties = () => {
        getProperties().then((properties) => {
            setProperties(properties);
        }).catch(error => {
            console.log(error);
        })
    }

    const fetchPropertyTypes = () => {

        fetchPropertyTypesRef.current = false;

        const {
            searchParam = {},
            options = {},
        } = state;

        getPropertyTypes({ ...searchParam, ...options }, ({ total, propertyTypes }) => {
            const data = propertyTypes.map(propertyType => {
                return {
                    ...propertyType,
                    propertyName: propertyType.property.name
                }
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
    }

    const onHandleSearch = (searchParam = {}, optionParams = {}) => {
        const options = {
            pageNumber: optionParams.pageNumber || 1,
            pageSize: optionParams.pageSize || 50,
            sortField: optionParams.sortField || null,
            sortDirection: optionParams.sortDirection || null
        }

        fetchPropertyTypesRef.current = true;

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

    const onHandleSearchChange = (param) => {
        setState({
            ...state,
            searchParam: param
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
        fetchPropertyTypesRef.current = !!isSearch;

        setState({
            ...state,
            isShow: false,
            isValid: false,
            errorMessage: {},
            propertyType: null,
            dataReady: !isSearch,
            isLoading: false
        });

    }

    const onSavePropertyType = (propertyType) => {
        setState({ ...state, isLoading: true })
        if (state.propertyType._id) {
            updatePropertyType({ ...propertyType, id: state.propertyType._id },
                () => {
                    onClose(true);
                },
                () => setState({ ...state, isLoading: false }));
        } else {
            createPropertyType(propertyType,
                () => {
                    onClose(true);
                },
                () => setState({ ...state, isLoading: false }));
        }
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
                    isloading={isLoading}
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
            {isShow && modalRender()}
            <div className="card">
                <div className="card-header text-uppercase">
                    <h3>{PROPERTYTYPE_TEXT_CONFIG.PROPERTYTYPE_PAGE_HEADER}</h3>
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
