import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Modal from '../../shared/components/forms/Modal';
import PropertyGrid from './component/PropertyGrid';
import PropertySearch from './component/PropertySearch';
import PropertyForm from './component/PropertyForm';
import {
    // getProperties,
    updateProperty,
    createNewProperty,
    deleteProperty
} from './api/apiHandle.js';
import { getProperties } from './actions/property';
import { PROPERTY_TEXT_CONFIG } from './constants/resources';

const PropertyContainer = () => {
    const { propertyPageData } = useSelector(state => ({ propertyPageData: state.property }));
    const dispatch = useDispatch();

    const [state, setState] = useState({});
    const didMountRef = useRef(false);
    const fetchPropertiesRef = useRef(false);

    const {
        isShow,
        isLoading,
        property,
        isValid
    } = state;

    const {
        total,
        searchParam,
        options,
        dataReady,
        properties,
    } = propertyPageData;

    useEffect(() => {
        dispatch(getProperties());
    }, []);

    const fetchProperties = () => {
        fetchPropertiesRef.current = false;
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

        fetchPropertiesRef.current = true;

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
            property: property
        });
    }

    const onClose = (isSearch) => {
        fetchPropertiesRef.current = !!isSearch;

        setState({
            ...state,
            isShow: false,
            isValid: false,
            errorMessage: {},
            property: null,
            dataReady: !isSearch,
            isLoading: false
        });
    }

    const onSaveProperty = (property) => {
        // const propertyID = {...property,id:property._id}
        // if (property._id) {
        //     updateProperty(propertyID, () => {
        //         onClose(true);
        //     });
        // } else {
        //     createNewProperty(property, () => {
        //         onClose(true);
        //     });
        // }

        setState({ ...state, isLoading: true })
        if (state.property._id) {
            updateProperty({ ...property, id: state.property._id },
                () => {
                    onClose(true);
                },
                () => setState({ ...state, isLoading: false }));
        } else {
            createNewProperty(property,
                () => {
                    onClose(true);
                },
                () => setState({ ...state, isLoading: false }));
        }
    }

    const onDelete = ({ _id }) => {
        const { searchParam, options } = state;

        deleteProperty(_id, () => {
            onHandleSearch(searchParam, options);
        });
    }

    const modalRender = () => {
        return (
            <Modal classNames={'modal-lg'}
                title={property?.id ? 'Edit Property' : 'Add New Property'}
                onClose={onClose}
            >
                <PropertyForm
                    isLoading={isLoading}
                    property={property}
                    isValid={isValid}
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
                    <h3>{PROPERTY_TEXT_CONFIG.PROPERTY_PAGE_HEADER}</h3>
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