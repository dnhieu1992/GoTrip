import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../shared/components';
import { closeModal, createNewRoomName, deleteRoomName, getRoomNames, getRoomTypes, showModal, updateRoomName } from './actions/roomName';
import RoomNameForm from './component/RoomNameForm';
import RoomNameGrid from './component/RoomNameGrid';
import RoomNameSearch from './component/RoomNameSearch';
import { ROOM_NAME_TEXT_CONFIG } from './constants/resources';

const RoomNameContainer = () => {
    const { roomNamePageData } = useSelector(state => ({ roomNamePageData: state.roomName }));
    const dispatch=useDispatch();
   
    const {
        total,
        options,
        roomNames,
        dataReady,
        roomTypes,
        searchParams,
        modal,
        isFetch
    } = roomNamePageData;

    useEffect(async () => {
        dispatch(getRoomTypes());
        dispatch(getRoomNames());
    },[]);

    useEffect(() => {
        if (isFetch) {
            dispatch(getRoomNames({}));
        }
    },[isFetch]);

    const onHandleSearch = (searchParams, options) => {
        dispatch(getRoomNames(searchParams, options));
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

    const onShow = (roomName = {}) => {
        dispatch(showModal(roomName));
    }

    const onClose = () => {
        dispatch(closeModal());
    }

    const onSaveRoomName = (roomName) => {
        if (modal.roomName._id) {
            dispatch(updateRoomName({ ...roomName, id: modal.roomName._id }));
        } else {
            dispatch(createNewRoomName(roomName));
        }
    }

    const onDelete = ({ _id }) => {
        dispatch(deleteRoomName(_id));
    }

    const modalRender = ({ isLoading, roomName, isValid }) => {
        return (
            <Modal
                classNames={'modal-lg'}
                title={roomName?.id ? 'Edit Room Name' : 'Add New RoomName'}
                onClose={onClose}
            >
                <RoomNameForm
                    isLoading={isLoading}
                    roomName={roomName}
                    roomTypes={roomTypes}
                    isValid={isValid}
                    onClose={onClose}
                    onSaveRoomName={onSaveRoomName}
                />
            </Modal>
        )
    }

    return (
        <>
            {modal && modalRender(modal)}
            <div className="card">
                <div className="card-header text-uppercase">
                    <h3>{ROOM_NAME_TEXT_CONFIG.ROOM_NAME_PAGE_HEADER}</h3>
                </div>
                <div className="card-body">
                    <RoomNameSearch
                        roomTypes={roomTypes}
                        onHandleSearch={onHandleSearch}
                        options={options}
                    />

                    <RoomNameGrid
                        data={roomNames}
                        roomTypes={roomTypes}
                        options={options}
                        totalItems={total}
                        dataReady={dataReady}
                        showModal={onShow}
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

export default RoomNameContainer;