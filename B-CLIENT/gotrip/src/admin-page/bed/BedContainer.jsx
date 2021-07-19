import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Modal from '../../shared/components/forms/Modal';
import BedGrid from './component/BedGrid';
import BedSearch from './component/BedSearch';
import BedForm from './component/BedForm';

import {
    getBeds,
    updateBed,
    createNewBed,
    deleteBed,
    showModal,
    closeModal
} from './actions/bed';
import { BED_TEXT_CONFIG } from './constants/resources';

const BedContainer = () => {
    const { bedPageData } = useSelector(state => ({ bedPageData: state.bed }));
    const dispatch = useDispatch();

    const {
        total,
        beds,
        options,
        dataReady,
        searchParams,
        modal,
        isFetch
    } = bedPageData;

    useEffect(async () => {
        dispatch(getBeds());
    }, []);

    useEffect(() => {
        if (isFetch) {
            dispatch(getBeds({}));
        }
    }, [isFetch])

    const onHandleSearch = (searchParams, options) => {
        dispatch(getBeds(searchParams, options));
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

    const onShow = (bed = {}) => {
        dispatch(showModal(bed));
    }

    const onClose = () => {
        dispatch(closeModal());
    }

    const onSaveBed = (bed) => {
        if (modal.bed._id) {
            dispatch(updateBed({ ...bed, id: modal.bed._id }));
        } else {
            dispatch(createNewBed(bed));
        }
    }

    const onDelete = ({ _id }) => {
        dispatch(deleteBed(_id));
    }

    const modalRender = ({ isLoading, bed, isValid }) => {
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
            {modal && modalRender(modal)}
            <div className="card">
                <div className="card-header text-uppercase">
                    <h3>{BED_TEXT_CONFIG.BED_PAGE_HEADER}</h3>
                </div>
                <div className="card-body">
                    <BedSearch
                        options={options}
                        onHandleSearch={onHandleSearch}
                    />
                    <BedGrid
                        data={beds}
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

export default BedContainer;