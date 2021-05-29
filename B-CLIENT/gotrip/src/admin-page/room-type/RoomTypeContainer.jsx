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

const RoomTypeContainer = () => {
    const [state, setState] = useState({});
    const didMountRef = useRef(false);
    const fetRoomTypesRef = useRef(false);

    const {
        total,
        searchParam,
        options,
        isShow,
        roomType,
        dataReady,
        roomTypes,
        isValid,
        errorMessage
    } = state;

    useEffect(() => {
        if (!didMountRef.current) {
            onHandleSearch({});
            didMountRef.current = true;
        }

        if (didMountRef.current && fetRoomTypesRef.current) {
            fetRoomTypes();
        }
    });

    const fetRoomTypes = () => {
        fetRoomTypesRef.current = false;
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

        fetRoomTypesRef.current = true;

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
            description:'',
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
            isValid: !!roomType._id,
            roomType: roomType,
            errorMessage: {}
        });
    }

    const onClose = (isSearch) => {
        fetRoomTypesRef.current = !!isSearch;

        setState({
            ...state,
            isShow: false,
            isValid: false,
            errorMessage: {},
            roomType: null,
            dataReady: !isSearch
        });
    }

    const onSaveRoomType = (roomType) => {
        console.log(roomType)
        const roomTypeId={...roomType,id:roomType._id}
        if (roomType._id) {
            updateRoomType(roomTypeId, () => {
                onClose(true);
            });
        } else {
            createNewRoomType(roomType, () => {
                onClose(true);
            });
        }
    }

    const onDelete = ({ _id }) => {
        const { searchParam, options } = state;

        deleteRoomType(_id, () => {
            onHandleSearch(searchParam, options);
        });
    }

    const onSaveFormChange = (roomType) => {
        let isValid = true;
        let errorMessage = {};

        if (!roomType.name || !roomType.description || !roomType.status) {
            isValid = false;
        }

        if (!roomType.name && roomType.name !== undefined) {
            const roomTypeNameErrorMsg = "The room type name is required.";
            errorMessage = { ...errorMessage, roomTypeNameErrorMsg }
            isValid = false;
        }

        if (!roomType.description && roomType.description !== undefined) {
            const roomTypeDescriptionErrorMsg = "The room type description is required.";
            errorMessage = { ...errorMessage, roomTypeDescriptionErrorMsg }
            isValid = false;
        }

        if (!roomType.status && roomType.status !== undefined) {
            const roomTypeStatusErrorMsg = "The room type status is required.";
            errorMessage = { ...errorMessage, roomTypeStatusErrorMsg }
            isValid = false;
        }

        setState({
            ...state,
            roomType,
            isValid,
            errorMessage
        });
    }

    const modalRender = () => {
        return (
            <Modal classNames={'modal-lg'}
                title={roomType?.id ? 'Edit Room Type' : 'Add Room Type'}
                onClose={onClose}
            >
                <RoomTypeForm
                    roomType={roomType}
                    isValid={isValid}
                    errorMessage={errorMessage}
                    onSaveFormChange={onSaveFormChange}
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
                    <h3>Room Type</h3>
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