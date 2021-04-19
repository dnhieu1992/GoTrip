
import { useState } from 'react';
import Modal from '../../shared/components/forms/Modal';
import TypesOfAccommodationGrid from './component/TypesOfAccommodationGrid';
import TypesOfAccommodationSearch from './component/TypesOfAccommodationSearch';
import TypesOfAccommodationForm from './component/TypesOfAccommodationForm';

const TypesOfAccommodationContainer = () => {


    const mockDatas = [
        { id: 1, name: 'Hotels', amount: 769854, status: 'Actived' },
        { id: 2, name: 'Apartments', amount: 699393, status: 'Actived' },
        { id: 3, name: 'Resorts', amount: 18212, status: 'Actived' },
        { id: 4, name: 'Villas', amount: 368425, status: 'Actived' },
        { id: 5, name: 'Cabins', amount: 29531, status: 'Actived' },
        { id: 6, name: 'Cottages', amount: 129312, status: 'Actived' },
        { id: 7, name: 'Glamping', amount: 9482, status: 'Actived' },
        { id: 8, name: 'Serviced Apartments', amount: 31594, status: 'Actived' }
    ];

    const [ data, setData] = useState(mockDatas.slice(0, 5));
    const [ searchParam, setSearchParam] = useState({});
    const [ options, setOptions] = useState({ currentPage: 1});
    const [ isShow, setIsShow] = useState(false);
    const [ typesOfAccommodation, setTypesOfAccommodation] = useState({});

    const onHandleSearchChange = (param) => {
        setSearchParam(param);
    }

    const onHandleSearch = ({typesOfAccommodationName, status}) => {
        const accommodations = mockDatas.filter((item) => {
            if((!typesOfAccommodationName || (item.name.toLowerCase().indexOf(typesOfAccommodationName.toLowerCase()) > -1))
            && (!status || (item.status.indexOf(status) >-1))) {
                return item;
            }
        });
        const result = accommodations.slice((options.currentPage - 1) * options.pageSize, options.currentPage * options.pageSize)
        setData(accommodations);
    }

    const onHandlePageChange = (pageNumber) => {
        const result = mockDatas.slice((pageNumber - 1) * options.pageSize, pageNumber * options.pageSize);
        setData(result);
        setOptions({ ...options, currentPage: pageNumber});

    }

    const onHandleResetForm = () => {
        setSearchParam({});
        const result = mockDatas.slice((options.currentPage - 1) * options.pageSize, options.currentPage * options.pageSize);
        setData(result);
    }

    const addNewForm = () => {
        setIsShow(true);
    }

    const onClose = () => {
        setIsShow(false);
        setTypesOfAccommodation({});
    }

    const onSaveTypesOfAccommodation = () => {
        data.push(typesOfAccommodation);
        setData(data);
        onClose();
    }

    const onSaveFormChange = (typesOfAccommodation) => {
        console.log("typesOfAccommodation: ",typesOfAccommodation);
        setTypesOfAccommodation(typesOfAccommodation);
    }

    const modalRender = () => {
        return (
            <Modal classNames = {'modal-lg'}
                title = "Add New Types Of Accommodation"
                onClose = {onClose}
                onSave = {onSaveTypesOfAccommodation}>
                <TypesOfAccommodationForm 
                    typesOfAccommodation = {typesOfAccommodation}
                    onSaveFormChange = {onSaveFormChange}
                    onClose = {onClose}
                    onSaveTypesOfAccommodation = {onSaveTypesOfAccommodation}/>
                
            </Modal>
        )
    }
    return (
        <>
            {isShow && modalRender()}
            <div className = "card">
                <div className="card-header text-uppercase">
                    <h3>Types-Of-Accommodation</h3>
                </div>
                <div className="card-body">
                <TypesOfAccommodationSearch
                    searchParam = {searchParam}
                    onHandleSearchChange = {onHandleSearchChange}
                    onHandleSearch = {onHandleSearch}
                    onHandleResetForm = {onHandleResetForm}
                />
                <TypesOfAccommodationGrid
                    data = {data}
                    options = {options}
                    totalItems = {mockDatas.length}
                    onHandlePageChange = {onHandlePageChange}
                    addNewForm = {addNewForm}
                />
                </div>
            </div>
        </>
    )
}

export default TypesOfAccommodationContainer;