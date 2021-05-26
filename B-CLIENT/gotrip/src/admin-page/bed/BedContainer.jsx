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

const BedContainer = () => {
    const [state, setState] = useState({});
    const didMountRef = useRef(false);
    const fetBedsRef = useRef(false);

    const {
        total,
        beds,
        options,
        isValid,
        bed,
        isShow,
        dataReady,
        searchParam,
        errorMessage,
    } = state;

    useEffect(() => {
        if (!didMountRef.current) {
            onHandleSearch({});
            didMountRef.current = true;
        }

        if (didMountRef.current && fetBedsRef.current) {
            fetBeds();
        }
    });

    const fetBeds = () => {
        fetBedsRef.current = false;

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

        fetBedsRef.current = true;

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
            isValid: !!bed._id,
            bed: bed,
            errorMessage: {}
        });
    };

    const onClose = (isSearch) => {
        fetBedsRef.current = !!isSearch;

        setState({
            ...state,
            isShow: false,
            isValid: false,
            errorMessage: {},
            bed: null,
            dataReady: !isSearch
        });
    };

    const onSaveBed = (bed) => {
        if (bed._id) {
            updateBed(bed, () => {
                onClose(true);
            });
        } else {
            createNewBed(bed, () => {
                onClose(true);
            });
        };
    };

    const onSaveFormChange = (bed) => {
        let isValid = true;
        let errorMessage = {};

        if (!bed.name || !bed.description || !bed.status) {
            isValid = false;
        };

        if (!bed.name && bed.name !== undefined) {
            const bedNameErrorMsg = "The bed name is required.";
            errorMessage = { ...errorMessage, bedNameErrorMsg }
            isValid = false;
        };

        if (!bed.description && bed.description !== undefined) {
            const bedDescriptionErrorMsg = "The bed description is required.";
            errorMessage = { ...errorMessage, bedDescriptionErrorMsg }
            isValid = false;
        };

        if (!bed.status && bed.status !== undefined) {
            const bedStatusErrorMsg = "The bed status is required.";
            errorMessage = { ...errorMessage, bedStatusErrorMsg }
            isValid = false;
        };

        setState({
            ...state,
            bed,
            isValid,
            errorMessage
        });
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
                title={bed?._id ? 'Edit Bed' : 'Add New Bed'}
                onClose={onClose}
            >
                <BedForm
                    bed={bed}
                    isValid={isValid}
                    errorMessage={errorMessage}
                    onClose={onClose}
                    onSaveFormChange={onSaveFormChange}
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
                    <h3>Bed</h3>
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