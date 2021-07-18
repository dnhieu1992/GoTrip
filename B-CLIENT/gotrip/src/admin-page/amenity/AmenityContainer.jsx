import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Modal from '../../shared/components/forms/Modal';
import AmenityGrid from './component/AmenityGrid';
import AmenitySearch from './component/AmenitySearch';
import AmenityForm from './component/AmenityForm';

import{
    getAmenities,
    updateAmenity,
    createNewAmenity,
    deleteAmenity,
    getAmenityCategories,
    showModal,
    closeModal
} from './actions/amenity';

import { AMENITY_TEXT_CONFIG } from './constants/resources';

const AmenityContainer = () => {
    const { amenityPageData } = useSelector(state => ({ amenityPageData: state.amenity }));
    const dispatch = useDispatch();

    const {
        total,
        amenities,
        amenityCategories,
        options,
        dataReady,
        searchParams,
        modal,
        isFetch
    } = amenityPageData;

    useEffect(async () => {
        dispatch(getAmenities());
        dispatch(getAmenityCategories());
    }, []);

    useEffect(() => {
        if (isFetch) {
            dispatch(getAmenities({}));
        }
    }, [isFetch])

    const onHandleSearch = (searchParams, options) => {
        dispatch(getAmenities(searchParams, options));
    }

    const onHandlePageChange = (pageNumber) => {
        const optionsUpdate = {
            ...options,
            pageNumber
        }

        onHandleSearch(searchParams, optionsUpdate);
    }

    const onHandlePageSizeChange = (pageSize) => {
        const optionUpdate = {
            ...options,
            pageSize,
            pageNumber: 1
        }

        onHandleSearch(searchParams, optionUpdate);
    }

    const onHandleSortChange = (sortField, sortDirection) => {

        const optionsUpdate = {
            ...options,
            sortField,
            sortDirection
        }

        onHandleSearch(searchParams, optionsUpdate);
    }

    const onShow = (amenity = {}) => {
        dispatch(showModal(amenity));
    }

    const onClose = () => {
        dispatch(closeModal());
    }

    const onSaveAmenity = (amenity) => {
        if (modal.amenity._id) {
            dispatch(updateAmenity({ ...amenity, id: modal.amenity._id }));
        } else {
            dispatch(createNewAmenity(amenity));
        }
    }

    const onDelete = ({ _id }) => {
        dispatch(deleteAmenity(_id));
    }

    const modalRender = ({ isLoading, amenity, isValid }) => {
        return (
            <Modal 
                classNames={'modal-lg'}
                title={amenity?._id ? AMENITY_TEXT_CONFIG.AMENITY_UPDATE_HEADER_LBL : AMENITY_TEXT_CONFIG.AMENITY_CREATE_HEADER_LBL}
                onClose={onClose}
            >
                <AmenityForm
                    isLoading={isLoading}
                    amenity={amenity}
                    amenityCategories={amenityCategories}
                    isValid={isValid}
                    onClose={onClose}
                    onSaveAmenity={onSaveAmenity}
                />
            </Modal>
        );
    };

    return (
        <>
            {modal && modalRender(modal)}
            <div className="card">
                <div className="card-header text-uppercase">
                    <h3>{AMENITY_TEXT_CONFIG.AMENITY_PAGE_HEADER}</h3>
                </div>
                <div className="card-body">
                    <AmenitySearch
                        options={options}
                        amenityCategories={amenityCategories}
                        onHandleSearch={onHandleSearch}
                    />
                    <AmenityGrid
                        data={amenities}
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

export default AmenityContainer;
