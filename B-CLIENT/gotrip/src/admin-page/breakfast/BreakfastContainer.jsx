import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Modal from '../../shared/components/forms/Modal';
import BreakfastGrid from './component/BreakfastGrid';
import BreakfastSearch from './component/BreakfastSearch';
import BreakfastForm from './component/BreakfastForm';

import {
    getBreakfasts,
    updateBreakfast,
    createNewBreakfast,
    deleteBreakfast,
    showModal,
    closeModal
} from './actions/breakfast';
import { BREAKFAST_TEXT_CONFIG } from './constants/resources';

const BreakfastContainer = () => {
    const { breakfastPageData } = useSelector(state => ({ breakfastPageData: state.breakfast }));
    const dispatch = useDispatch();

    const {
        total,
        breakfasts,
        options,
        dataReady,
        searchParams,
        modal,
        isFetch
    } = breakfastPageData;

    useEffect(async () => {
        dispatch(getBreakfasts());
    }, []);

    useEffect(() => {
        if (isFetch) {
            dispatch(getBreakfasts({}));
        }
    }, [isFetch])

    const onHandleSearch = (searchParams, options) => {
        dispatch(getBreakfasts(searchParams, options));
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

    const onShow = (breakfast = {}) => {
        dispatch(showModal(breakfast));
    }

    const onClose = () => {
        dispatch(closeModal());
    }

    const onSaveBreakfast = (breakfast) => {
        if (modal.breakfast._id) {
            dispatch(updateBreakfast({ ...breakfast, id: modal.breakfast._id }));
        } else {
            dispatch(createNewBreakfast(breakfast));
        }
    }

    const onDelete = ({ _id }) => {
        dispatch(deleteBreakfast(_id));
    }

    const modalRender = ({ isLoading, breakfast, isValid }) => {
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
            {modal && modalRender(modal)}
            <div className="card">
                <div className="card-header text-uppercase">
                    <h3>{BREAKFAST_TEXT_CONFIG.BREAKFAST_PAGE_HEADER}</h3>
                </div>
                <div className="card-body">
                    <BreakfastSearch
                        options={options}
                        onHandleSearch={onHandleSearch}
                    />
                    <BreakfastGrid
                        data={breakfasts}
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

export default BreakfastContainer;