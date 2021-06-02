import { useEffect, useRef, useState } from 'react';
import Modal from '../../shared/components/forms/Modal';
import RoomTypeGrid from './component/RoomTypeGrid';
import RoomTypeSearch from './component/RoomTypeSearch';
import RoomTypeForm from './component/RoomTypeForm';

import {
    getRoomTypes,
    updateRoomType,
    createNewRoomType,
    deleteRoomType
} from './api/apiHandle.js';
import { ROOM_TYPE_TEXT_CONFIG } from './constants/resources';

const RoomTypeContainer = () => {
    const [state, setState] = useState({});
    const didMountRef = useRef(false);
    const fetchRoomTypesRef = useRef(false);

    const {
        total,
        searchParam,
        options,
        isShow,
        roomType,
        dataReady,
        roomTypes,
        isValid,
        isLoading
    } = state;

    useEffect(() => {
        if (!didMountRef.current) {
            onHandleSearch({});
            didMountRef.current = true;
        }

        if (didMountRef.current && fetchRoomTypesRef.current) {
            fetchRoomTypes();
        }
    });

    const fetchRoomTypes = () => {
        fetchRoomTypesRef.current = false;
        const {
            searchParam = {},
            options = {}
        } = state;

        getRoomTypes({ ...searchParam, ...options }, ({ total, roomTypes }) => {
            setTimeout(() => {
                setState({
                    ...state,
                    total,
                    roomTypes,
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

        fetchRoomTypesRef.current = true;

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
            description: '',
            status: ''
        }

        const options = {
            ...state.options,
            pageNumber: 1
        }

        onHandleSearch(searchParam, options);
    }

    const showModal = (roomType = {}) => {
        setState({
            ...state,
            isShow: true,
            roomType: roomType
        });
    }

    const onClose = (isSearch) => {
        fetchRoomTypesRef.current = !!isSearch;

        setState({
            ...state,
            isShow: false,
            isValid: false,
            errorMessage: {},
            roomType: null,
            dataReady: !isSearch,
            isLoading: false
        });
    }

    const onSaveRoomType = (roomType) => {
        setState({ ...state, isLoading: true });
        if (state.roomType._id) {
            updateRoomType({ ...roomType, id: state.roomType._id },
                () => {
                    onClose(true);
                },
                () => setState({ ...state, isLoading: false }));
        } else {
            createNewRoomType(roomType,
                () => {
                    onClose(true);
                },
                () => setState({ ...state, isLoading: false }));
        }
    }

    const onDelete = ({ _id }) => {
        const { searchParam, options } = state;

        deleteRoomType(_id, () => {
            onHandleSearch(searchParam, options);
        });
    }

    const modalRender = () => {
        return (
            <Modal classNames={'modal-lg'}
                title={roomType?.id ? 'Edit Room Type' : 'Add Room Type'}
                onClose={onClose}
            >
                <RoomTypeForm
                    isLoading={isLoading}
                    roomType={roomType}
                    isValid={isValid}
                    onClose={onClose}
                    onSaveRoomType={onSaveRoomType}
                />
            </Modal>
        )
    }
    return (
        <>
            {isShow && modalRender()}
            <div className="card">
                <div className="card-header text-uppercase">
                    <h3>{ROOM_TYPE_TEXT_CONFIG.ROOM_TYPE_PAGE_HEADER}</h3>
                </div>
                <div className="card-body">
                    <RoomTypeSearch
                        searchParam={searchParam}
                        onHandleSearchChange={onHandleSearchChange}
                        onHandleSearch={onHandleSearch}
                        onHandleResetForm={onHandleResetForm}
                    />
                    <RoomTypeGrid
                        data={roomTypes}
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

export default RoomTypeContainer;