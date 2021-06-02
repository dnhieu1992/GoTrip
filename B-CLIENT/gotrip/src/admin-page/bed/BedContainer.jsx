import { useState, useRef, useEffect } from 'react';
import Modal from '../../shared/components/forms/Modal';
import BedGrid from './component/BedGrid';
import BedSearch from './component/BedSearch';
import BedForm from './component/BedForm';

import {
    getBeds,
    updateBed,
    createNewBed,
    deleteBed
} from './api/apiHandle.js';
import { BED_TEXT_CONFIG } from './constants/resources';

const BedContainer = () => {
    const [state, setState] = useState({});
    const didMountRef = useRef(false);
    const fetchBedsRef = useRef(false);

    const {
        total,
        beds,
        options,
        isValid,
        bed,
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

        if (didMountRef.current && fetchBedsRef.current) {
            fetchBeds();
        }
    });

    const fetchBeds = () => {
        fetchBedsRef.current = false;

        const {
            searchParam = {},
            options = {}
        } = state;

        getBeds({ ...searchParam, ...options }, ({ total, beds }) => {
            setTimeout(() => {
                setState({
                    ...state,
                    total,
                    beds,
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

        fetchBedsRef.current = true;

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

    const showModal = (bed = {}) => {
        setState({
            ...state,
            isShow: true,
            bed: bed
        });
    };

    const onClose = (isSearch) => {
        fetchBedsRef.current = !!isSearch;

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

    const onSaveBed = (bed) => {
        setState({ ...state, isLoading: true })
        if (state.bed._id) {
            updateBed({ ...bed, id: state.bed._id },
                () => {
                    onClose(true);
                },
                () => setState({ ...state, isLoading: false }));
        } else {
            createNewBed(bed,
                () => {
                    onClose(true);
                },
                () => setState({ ...state, isLoading: false }));
        }
    };

    const onDelete = ({ _id }) => {
        const { searchParam, options } = state;

        deleteBed(_id, () => {
            onHandleSearch(searchParam, options);
        });
    };

    const modalRender = () => {
        return (
            <Modal
                classNames={'modal-lg'}
                title={bed?._id ? BED_TEXT_CONFIG.BED_UPDATE_HEADER_LBL : BED_TEXT_CONFIG.BED_CREATE_HEADER_LBL}
                onClose={onClose}
            >
                <BedForm
                    isLoading={isLoading}
                    bed={bed}
                    isValid={isValid}
                    onClose={onClose}
                    onSaveBed={onSaveBed}
                />
            </Modal>
        );
    };

    return (
        <>
            {isShow && modalRender()}
            <div className="card">
                <div className="card-header text-uppercase">
                    <h3>{BED_TEXT_CONFIG.BED_PAGE_HEADER}</h3>
                </div>
                <div className="card-body">
                    <BedSearch
                        searchParam={searchParam}
                        onHandleSearchChange={onHandleSearchChange}
                        onHandleSearch={onHandleSearch}
                        onHandleResetForm={onHandleResetForm}
                    />
                    <BedGrid
                        data={beds}
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

export default BedContainer;