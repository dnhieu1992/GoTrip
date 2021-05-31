import { useState, useRef, useEffect } from 'react';
import Modal from '../../shared/components/forms/Modal';
import AmenityGrid from './component/AmenityGrid';
import AmenitySearch from './component/AmenitySearch';
import AmenityForm from './component/AmenityForm';
import {
    getAmenities,
    updateAmenity,
    createNewAmenity,
    deleteAmenity,
    getAmenityCategories
} from './api/apiHandle.js';
import { AMENITY_TEXT_CONFIG } from './constants/resources';

const AmenityContainer = () => {
    const [state, setState] = useState({});
    const [amenityCategories, setAmenityCategories] = useState([]);
    const didMountRef = useRef(false);
    const fetchAmenitiesRef = useRef(false);

    const {
        total,
        data,
        options,
        isValid,
        amenity,
        isShow,
        dataReady,
        isLoading,
        searchParam,
    } = state;

    useEffect(() => {
        if (!didMountRef.current) {
            getAllAmenityCategories();
            onHandleSearch({});
            didMountRef.current = true;
        }

        if (didMountRef.current && fetchAmenitiesRef.current) {
            fetchAmenities();
        }
    });

    const getAllAmenityCategories = () => {
        getAmenityCategories().then((amenityCategories) => {
            setAmenityCategories(amenityCategories);
        }).catch(error => {
            console.log(error);
        });
    }

    const fetchAmenities = () => {
        fetchAmenitiesRef.current = false;

        const {
            searchParam = {},
            options = {}
        } = state;

        getAmenities({ ...searchParam, ...options }, ({ total, amenities }) => {
            const data = amenities.map(amenity => {
                return {
                    ...amenity,
                    amenityCategoryName: amenity.amenityCategory.name
                }
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
    };

    const onHandleSearch = (searchParam = {}, optionParams = {}) => {
        const options = {
            pageNumber: optionParams.pageNumber || 1,
            pageSize: optionParams.pageSize || 50,
            sortField: optionParams.sortField || null,
            sortDirection: optionParams.sortDirection || null
        };

        fetchAmenitiesRef.current = true;
        setState({
            ...state,
            searchParam: searchParam,
            options: options,
            dataReady: false
        });
    };

    const onHandleSearchChange = (param) => {
        setState({
            ...state,
            searchParam: param
        });
    };

    const onHandlePageChange = (pageNumber) => {
        const { searchParam, options } = state;

        const optionsUpdate = {
            ...options,
            pageNumber
        };

        onHandleSearch(searchParam, optionsUpdate);
    };

    const onHandlePageSizeChange = (pageSize) => {
        const { searchParam, options } = state;

        const optionsUpdate = {
            ...options,
            pageSize,
            pageNumber: 1
        };

        onHandleSearch(searchParam, optionsUpdate);
    };

    const onHandleSortChange = (sortField, sortDirection) => {
        const { searchParam, options } = state;

        const optionsUpdate = {
            ...options,
            sortField,
            sortDirection
        };

        onHandleSearch(searchParam, optionsUpdate);
    };

    const onHandleResetForm = () => {
        const searchParam = {
            name: '',
            amenityCategoryId: '',
            status: ''
        };

        const options = {
            ...state.options,
            pageNumber: 1
        };

        onHandleSearch(searchParam, options);
    };

    const showModal = (amenity = {}) => {
        setState({
            ...state,
            isShow: true,
            amenity: amenity
        });
    };

    const onClose = (isSearch) => {
        fetchAmenitiesRef.current = !!isSearch;
        setState({
            ...state,
            isShow: false,
            isValid: false,
            errorMessage: {},
            amenity: null,
            dataReady: !isSearch,
            isLoading: false
        });
    };

    const onSaveAmenity = (amenity) => {
        setState({ ...state, isLoading: true })
        if (state.amenity._id) {
            updateAmenity({ ...amenity, id: state.amenity._id },
                () => {
                    onClose(true);
                },
                () => setState({ ...state, isLoading: false }));
        } else {
            createNewAmenity(amenity,
                () => {
                    onClose(true);
                },
                () => setState({ ...state, isLoading: false }));
        }
    };

    const onDelete = ({ _id }) => {
        const { searchParam, options } = state;

        deleteAmenity(_id, () => {
            onHandleSearch(searchParam, options);
        });
    };

    const modalRender = () => {
        return (
            <Modal classNames={'modal-lg'}
                title={amenity?._id ? 'Edit Amenity' : 'Add New Amenity'}
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
            {isShow && modalRender()}
            <div className="card">
                <div className="card-header text-uppercase">
                    <h3>{AMENITY_TEXT_CONFIG.AMENITY_PAGE_HEADER}</h3>
                </div>
                <div className="card-body">
                    <AmenitySearch
                        searchParam={searchParam}
                        amenityCategories={amenityCategories}
                        onHandleSearchChange={onHandleSearchChange}
                        onHandleSearch={onHandleSearch}
                        onHandleResetForm={onHandleResetForm}
                    />
                    <AmenityGrid
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

export default AmenityContainer;
