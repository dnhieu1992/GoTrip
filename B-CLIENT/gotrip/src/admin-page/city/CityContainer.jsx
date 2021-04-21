import { useState } from 'react';
import Modal from '../../shared/components/forms/Modal';
import CityGrid from './component/CityGrid';
import CitySearch from './component/CitySearch';
import CityForm from './component/CityForm';

const CityContainer = () => {

    const mockDatas = [
        { id: 1, name: 'Đà Lạt', country: 'Việt Nam', status: "Actived" },
        { id: 2, name: 'TP.Hồ Chí Minh', country: 'Việt Nam', status: "Actived" },
        { id: 3, name: 'New York', country: 'United State', status: "Actived" },
        { id: 4, name: 'Los Angeles', country: 'United State', status: "Actived" },
        { id: 5, name: 'Thượng Hải', country: 'Trung Quốc', status: "Actived" },
        { id: 6, name: 'Bắc Kinh', country: 'Trung Quốc', status: "Actived" },
        { id: 7, name: 'Delhi', country: 'Ấn Độ', status: "Actived" },
        { id: 8, name: 'Mumbai', country: 'Ấn Độ', status: "Actived" },
    ];

    const [data, setData] = useState(mockDatas.slice(0, 5));
    const [searchParam, setSearchParam] = useState({});
    const [options, setOptions] = useState({ currentPage: 1 });
    const [isShow, setIsShow] = useState(false);
    const [city, setCity] = useState({});

    const onHandleSearchChange = (param) => {
        setSearchParam(param);
    }

    const onHandleSearch = ({ cityName, cityCountry, status }) => {
        const cities = mockDatas.filter(item => {

            if ((!cityName || (item.name.toLowerCase().indexOf(cityName.toLowerCase()) > -1))
                && (!cityCountry || (item.country.toLowerCase().indexOf(cityCountry.toLowerCase()) > -1))
                && (!status || (item.status.indexOf(status) > -1))) {
                return item;
            }
            debugger;
        });
        const result = cities.slice((options.currentPage - 1) * options.pageSize, options.currentPage * options.pageSize);
        setData(cities);
    };

    const onHandlePageChange = (pageNumber) => {
        const result = mockDatas.slice((pageNumber - 1) * options.pageSize, pageNumber * options.pageSize);
        setData(result);
        setOptions({ ...options, currentPage: pageNumber });
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
        setCity({});
    }
    const onSaveCity = () => {
        data.push(city);
        setData(data);
        onClose();
    }

    const onSaveFormChange = (city) => {
        setCity(city);
    }

    const modalRender = () => {
        return (
            <Modal classNames={'modal-lg'}
                title="Add New City"
                onClose={onClose}
                onSave={onSaveCity}>
                <CityForm city={city}
                    onSaveFormChange={onSaveFormChange}
                    onClose={onClose}
                    onSaveCity={onSaveCity} />
            </Modal>
        )
    }

    return (
        <>
            {isShow && modalRender()}
            <div className="card">
                <div className="card-header text-uppercase">
                    <h3>City</h3>
                </div>
                <div className="card-body">
                    <CitySearch searchParam={searchParam}
                        onHandleSearchChange={onHandleSearchChange}
                        onHandleSearch={onHandleSearch}
                        onHandleResetForm={onHandleResetForm}
                    />
                    <CityGrid data={data}
                        options={options}
                        totalItems={mockDatas.length}
                        onHandlePageChange={onHandlePageChange}
                        addNewForm={addNewForm} />
                </div>
            </div>
        </>
    )
}

export default CityContainer;
