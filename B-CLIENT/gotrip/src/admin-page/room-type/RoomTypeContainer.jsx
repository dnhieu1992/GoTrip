import { useEffect } from 'react';
import Modal from '../../shared/components/forms/Modal';
import RoomTypeGrid from './component/RoomTypeGrid';
import RoomTypeSearch from './component/RoomTypeSearch';
import RoomTypeForm from './component/RoomTypeForm';
import { ROOM_TYPE_TEXT_CONFIG } from './constants/resources';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, createNewRoomType, deleteRoomType, getRoomTypes, showModal, updateRoomType } from './actions/roomtype';

const RoomTypeContainer = () => {
    const { roomTypePageData } = useSelector(state => ({ roomTypePageData: state.roomType }));
    const dispatch = useDispatch();

    const {
        total,
        searchParams,
        options,
        dataReady,
        roomTypes,
        modal,
        isFetch
    } = roomTypePageData;

    useEffect(() => {
        dispatch(getRoomTypes());
    }, []);

    useEffect(() => {
        if (isFetch) {
            dispatch(getRoomTypes({}));
        }
    }, [isFetch])

    const onHandleSearch = (searchParams, options) => {
        dispatch(getRoomTypes(searchParams, options));
    }

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

    const onShow = (roomType = {}) => {
        dispatch(showModal(roomType));
    }

    const onClose = () => {
        dispatch(closeModal());
    }

    const onSaveRoomType = (roomType) => {
        if (modal.roomType._id) {
            dispatch(updateRoomType({ ...roomType, id: modal.roomType._id }));
        } else {
            dispatch(createNewRoomType(roomType));
        }
    }

    const onDelete = ({ _id }) => {
        dispatch(deleteRoomType(_id));
    }

    const modalRender = ({ isLoading, roomType, isValid }) => {
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
            {modal && modalRender(modal)}
            <div className="card">
                <div className="card-header text-uppercase">
                    <h3>{ROOM_TYPE_TEXT_CONFIG.ROOM_TYPE_PAGE_HEADER}</h3>
                </div>
                <div className="card-body">
                    <RoomTypeSearch
                        onHandleSearch={onHandleSearch}
                        options={options}
                    />
                    <RoomTypeGrid
                        data={roomTypes}
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

export default RoomTypeContainer;