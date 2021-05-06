import { useState, useRef, useEffect } from 'react';
import Modal from '../../shared/components/forms/Modal';
import CityGrid from './component/CityGrid';
import CitySearch from './component/CitySearch';
import CityForm from './component/CityForm';
import {
    getCities,
    updateCity,
    createNewCity,
    deleteCity,
    getCountries
} from './api/apiHandle.js';

const CityContainer = () => {
    const [total, setTotal] = useState(0);
    const [data, setData] = useState([]);
    const [countries, setCountries] = useState([]);
    const [searchParam, setSearchParam] = useState({});
    const [options, setOptions] = useState({ currentPage: 1, pageSize: 10 });
    const [isShow, setIsShow] = useState(false);
    const [city, setCity] = useState({});
    const didMountRef = useRef(false);

    useEffect(() => {
        if (!didMountRef.current) {
            getAllCountries();
            onHandleSearch({});
            didMountRef.current = true;
        }
    });

    const getAllCountries = () => {
        getCountries().then((countries) => {
            setCountries(countries);
        }).catch(error => {
            console.log(error);
        });
    }

    const onHandleSearchChange = (param) => {
        setSearchParam(param);
    };

    const onHandleSearch = ({ cityName, countryId, status }, options = {}) => {
        const params = {
            name: cityName,
            countryId: countryId,
            status: status,
            pageNumber: options.pageNumber || 1,
            pageSize: options.pageSize || 10
        }

        Object.keys(params).forEach(key => {
            if (!params[key] || (typeof (params[key]) === "string" && params[key] === '')) {
                delete params[key];
            }
        });

        getCities(params).then(({ total, cities }) => {
            const data = [];

            cities.forEach(city => {
                let { _id, name } = city.country;

                data.push({
                    ...city,
                    id: city._id,
                    countryId: _id,
                    countryName: name
                });
            });

            setData(data);
            setTotal(total);
        }).catch(error => {
            console.log(error);
        });
    };

    const onHandlePageChange = (pageNumber) => {
        onHandleSearch(searchParam, { pageSize: options.pageSize, pageNumber });
        setOptions({ ...options, currentPage: pageNumber });
    };

    const onHandlePageSizeChange = (pageSize) => {
        onHandleSearch(searchParam, { pageSize: pageSize, pageNumber: 1 });
        setOptions({ pageSize, currentPage: 1 });
    };

    const onHandleResetForm = () => {
        setSearchParam({});
        onHandleSearch({}, { pageSize: options.pageSize, pageNumber: 1 })
    };

    const onAddNew = () => {
        setIsShow(true);
    };
    const onClose = () => {
        setIsShow(false);
        setCity({});
    };

    const onSaveCity = (city) => {
        if (city.id) {
            updateCity(city).then(() => {
                onHandleSearch(searchParam);
                onClose();
            }).catch(error => {
                console.log(error);
            });
        }
        else {
            createNewCity(city).then(() => {
                onHandleSearch(searchParam);
                onClose();
            }).catch(error => {
                console.log(error);
            });
        }
    };

    const onSaveFormChange = (city) => {
        setCity(city);
    }

    const onEdit = (city) => {
        setCity(city);
        setIsShow(true);
    }

    const onDelete = ({ _id }) => {
        deleteCity(_id).then(() => {
            onHandleSearch(searchParam);
        }).catch(error => {
            console.log(error);
        });
    }

    const modalRender = () => {
        return (
            <Modal classNames={'modal-lg'}
                title={city.id ? 'Edit City' : 'Add New City'}
                onClose={onClose}
                onSave={onSaveCity}>
                <CityForm city={city}
                    countries={countries}
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
                    <CitySearch
                        searchParam={searchParam}
                        countries={countries}
                        onHandleSearchChange={onHandleSearchChange}
                        onHandleSearch={onHandleSearch}
                        onHandleResetForm={onHandleResetForm}
                    />
                    <CityGrid
                        data={data}
                        options={options}
                        totalItems={total}
                        onHandlePageChange={onHandlePageChange}
                        onHandlePageSizeChange={onHandlePageSizeChange}
                        onAddNew={onAddNew}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                </div>
            </div>
        </>
    )
}

export default CityContainer;
