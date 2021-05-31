import { useState, useRef, useEffect } from 'react';
import Modal from '../../shared/components/forms/Modal';
import BreakfastGrid from './component/BreakfastGrid';
import BreakfastSearch from './component/BreakfastSearch';
import BreakfastForm from './component/BreakfastForm';

import {
    getBreakfasts,
    updateBreakfast,
    createNewBreakfast,
    deleteBreakfast
} from './api/apiHandle.js';
import { BREAKFAST_TEXT_CONFIG } from './constants/resources';

const BreakfastContainer = () => {
    const [state, setState] = useState({});
    const didMountRef = useRef(false);
    const fetchBreakfastsRef = useRef(false);

    const {
        total,
        breakfasts,
        options,
        isValid,
        breakfast,
        isShow,
        dataReady,
        isLoading,
        searchParam,
    } = state;

    useEffect(() => {
        if (!didMountRef.current) {
            onHandleSearch({});
            didMountRef.current = true;
        }

        if (didMountRef.current && fetchBreakfastsRef.current) {
            fetchBreakfasts();
        }
    });

    const fetchBreakfasts = () => {
        fetchBreakfastsRef.current = false;

        const {
            searchParam = {},
            options = {}
        } = state;

        getBreakfasts({ ...searchParam, ...options }, ({ total, breakfasts }) => {
            setTimeout(() => {
                setState({
                    ...state,
                    total,
                    breakfasts,
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

        fetchBreakfastsRef.current = true;

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
            description: '',
            status: ''
        };

        const options = {
            ...state.options,
            pageNumber: 1
        };

        onHandleSearch(searchParam, options);
    };

    const showModal = (breakfast = {}) => {
        setState({
            ...state,
            isShow: true,
            breakfast: breakfast
        });
    };

    const onClose = (isSearch) => {
        fetchBreakfastsRef.current = !!isSearch;

        setState({
            ...state,
            isShow: false,
            isValid: false,
            errorMessage: {},
            bed: null,
            dataReady: !isSearch,
            isLoading: false
        });
    };

    const onSaveBreakfast = (breakfast) => {
        setState({ ...state, isLoading: true })
        if (state.breakfast._id) {
            updateBreakfast({ ...breakfast, id: state.breakfast._id },
                () => {
                    onClose(true);
                },
                () => setState({ ...state, isLoading: false }));
        } else {
            createNewBreakfast(breakfast,
                () => {
                    onClose(true);
                },
                () => setState({ ...state, isLoading: false }));
        }
    };

    const onDelete = ({ _id }) => {
        const { searchParam, options } = state;

        deleteBreakfast(_id, () => {
            onHandleSearch(searchParam, options);
        });
    };

    const modalRender = () => {
        return (
            <Modal
                classNames={'modal-lg'}
                title={breakfast?._id ? 'Edit Breakfast' : 'Add New Breakfast'}
                onClose={onClose}
            >
                <BreakfastForm
                    isLoading={isLoading}
                    breakfast={breakfast}
                    isValid={isValid}
                    onClose={onClose}
                    onSaveBreakfast={onSaveBreakfast}
                />
            </Modal>
        );
    };

    return (
        <>
            {isShow && modalRender()}
            <div className="card">
                <div className="card-header text-uppercase">
                    <h3>{BREAKFAST_TEXT_CONFIG.BREAKFAST_PAGE_HEADER}</h3>
                </div>
                <div className="card-body">
                    <BreakfastSearch
                        searchParam={searchParam}
                        onHandleSearchChange={onHandleSearchChange}
                        onHandleSearch={onHandleSearch}
                        onHandleResetForm={onHandleResetForm}
                    />
                    <BreakfastGrid
                        data={breakfasts}
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

export default BreakfastContainer;