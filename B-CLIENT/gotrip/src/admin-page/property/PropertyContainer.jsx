import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Modal from '../../shared/components/forms/Modal';
import PropertyGrid from './component/PropertyGrid';
import PropertySearch from './component/PropertySearch';
import PropertyForm from './component/PropertyForm';
import { closeModal, createNewProperty, deleteProperty, getProperties, showModal, updateProperty } from './actions/property';
import { PROPERTY_TEXT_CONFIG } from './constants/resources';

const PropertyContainer = () => {
    const { propertyPageData } = useSelector(state => ({ propertyPageData: state.property }));
    const dispatch = useDispatch();

    const {
        total,
        searchParams,
        options,
        dataReady,
        properties,
        modal,
        isFetch
    } = propertyPageData;

    useEffect(() => {
        dispatch(getProperties());
    }, []);

    useEffect(() => {
        if (isFetch) {
            dispatch(getProperties({}));
        }
    }, [isFetch])

    const onHandleSearch = (searchParams, options) => {
        dispatch(getProperties(searchParams, options));
    };

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

    const onShow = (property = {}) => {
        dispatch(showModal(property));
    }

    const onClose = () => {
        dispatch(closeModal());
    }

    const onSaveProperty = async (property) => {
        if (modal.property._id) {
            dispatch(updateProperty({ ...property, id: modal.property._id }));
        } else {
            dispatch(createNewProperty(property));
        }
    }

    const onDelete = ({ _id }) => {
        dispatch(deleteProperty(_id));
    }

    const modalRender = ({ isLoading, property, isValid }) => {
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
            {modal && modalRender(modal)}
            <div className="card">
                <div className="card-header text-uppercase">
                    <h3>{PROPERTY_TEXT_CONFIG.PROPERTY_PAGE_HEADER}</h3>
                </div>
                <div className="card-body">
                    <PropertySearch
                        onHandleSearch={onHandleSearch}
                        options={options}
                    />
                    <PropertyGrid
                        data={properties}
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

export default PropertyContainer;