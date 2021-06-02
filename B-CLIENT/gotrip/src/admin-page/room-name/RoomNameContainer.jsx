import { useState, useRef, useEffect } from 'react';
import { Modal } from '../../shared/components';
import {
    createRoomName,
    deleteRoomName,
    getRoomNames,
    getRoomTypes,
    updateRoomName
} from './api/apiHandle';
import RoomNameForm from './component/RoomNameForm';
import RoomNameGrid from './component/RoomNameGrid';
import RoomNameSearch from './component/RoomNameSearch';
import { ROOM_NAME_TEXT_CONFIG } from './constants/resources';

const RoomNameContainer = () => {
    const [state, setState] = useState({});
    const didMountRef = useRef(false);
    const fetchRoomNamesRef = useRef(false);

    const {
        total,
        data,
        options,
        isValid,
        roomName,
        isShow,
        dataReady,
        isLoading,
        searchParam,
        roomTypes=[]
    } = state;

    useEffect(async() => {
        if (!didMountRef.current) {
            await getAllRoomTypes();
            onHandleSearch({});
            didMountRef.current = true;
        }

        if (didMountRef.current && fetchRoomNamesRef.current) {
            fetchRoomNames();
        }
    });

    const getAllRoomTypes = async() => {
        await getRoomTypes().then((roomTypes) => {
            setState({
                ...state,
                roomTypes:roomTypes
            })
        }).catch(error => {
            console.log(error);
        });
    }

    const fetchRoomNames = () => {
        fetchRoomNamesRef.current = false;

        const {
            searchParam = {},
            options = {}
        } = state;

        getRoomNames({ ...searchParam, ...options }, ({ total, roomNames }) => {
            const data = roomNames.map(roomName => {
                return {
                    ...roomName,
                    roomTypeName: roomName?.roomType?.name
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
        })
    }

    const onHandleSearch = (searchParam = {}, optionParams = {}) => {
        const options = {
            pageNumber: optionParams.pageNumber || 1,
            pageSize: optionParams.pageSize || 50,
            sortField: optionParams.sortField || null,
            sortDirection: optionParams.sortDirection || null
        }

        fetchRoomNamesRef.current = true;

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
            roomNameName: '',
            roomType: '',
            status: ''
        }

        const options = {
            ...state.options,
            pageNumber: 1
        }

        onHandleSearch(searchParam, options);
    }

    const showModal = (roomName = {}) => {
        setState({
            ...state,
            isShow: true,
            isValid: !!roomName._id,
            roomName: roomName
        });
    }

    const onClose = (isSearch) => {
        fetchRoomNamesRef.current = !!isSearch;

        setState({
            ...state,
            isShow: false,
            isValid: false,
            roomName: null,
            dataReady: !isSearch,
            isLoading: false
        });
    }

    const onSaveRoomName = (roomName) => {
        setState({ ...state, isLoading: true })
        if (state.roomName._id) {
            updateRoomName({ ...roomName, id: state.roomName._id },
                () => {
                    onClose(true);
                },
                () => setState({ ...state, isLoading: false }));
        } else {
            createRoomName(roomName,
                () => {
                    onClose(true);
                },
                () => setState({ ...state, isLoading: false }))
        }
    }

    const onDelete = ({ _id }) => {
        const { searchParam, options } = state;

        deleteRoomName(_id, () => {
            onHandleSearch(searchParam, options);
        });
    }

    const modalRender = () => {
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
            {isShow && modalRender()}
            <div className="card">
                <div className="card-header text-uppercase">
                    <h3>{ROOM_NAME_TEXT_CONFIG.ROOM_NAME_PAGE_HEADER}</h3>
                </div>
                <div className="card-body">
                    <RoomNameSearch
                        searchParam={searchParam}
                        roomTypes={roomTypes}
                        onHandleSearchChange={onHandleSearchChange}
                        onHandleSearch={onHandleSearch}
                        onHandleResetForm={onHandleResetForm}
                    />

                    <RoomNameGrid
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

export default RoomNameContainer;