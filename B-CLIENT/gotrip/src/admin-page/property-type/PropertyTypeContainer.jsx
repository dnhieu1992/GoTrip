import { useState, useRef, useEffect } from 'react';
import Modal from '../../shared/components/forms/Modal';
import PropertyTypeForm from './component/PropertyTypeForm';
import PropertyTypeGrid from './component/PropertyTypeGrid';
import PropertyTypeSearch from './component/PropertyTypeSearch';

import {
    getPropertyTypes,
    createPropertyType,
    updatePropertyType,
    deletePropertyType,
    getProperties
} from './api/apiHandle.js';

const PropertyTypeContainer = () => {
    const [total, setTotal] = useState(0);
    const [data, setData] = useState([]);
    const [searchParam, setSearchParam] = useState({});
    const [options, setOptions] = useState({ currentPage: 1, pageSize: 5 });
    const [isShow, setIsShow] = useState(false);
    const [propertyType, setPropertyType] = useState({});
    const didMountRef = useRef(false);
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        if (!didMountRef.current) {
            getAllProperties();
            onHandleSearch({});
            didMountRef.current = true;
        }
    });

    const getAllProperties = () => {
        getProperties().then((properties) => {
            setProperties(properties);
        }).catch(error => {
            console.log(error);
        })
    }

    const onHandleSearchChange = (param) => {
        setSearchParam(param);
    }

    const onHandleSearch = ({ propertyTypeName, propertyId, status }, options = {}) => {
        const params = {
            name: propertyTypeName,
            property: propertyId,
            status: status,
            pageNumber: options.pageNumber || 1,
            pageSize: options.pageSize || 10
        }

        Object.keys(params).forEach(key => {
            if (!params[key] || (typeof (params[key]) === "string" && params[key] === '')) {
                delete params[key];
            }
        });

        getPropertyTypes(params).then(({ total, propertyTyes }) => {
            const data = [];
            //console.log("pro",propertyTyes)
            propertyTyes.forEach(propertyType => {
                let name=propertyType.property?propertyType.property.name:""
                data.push({
                    ...propertyType,
                    id: propertyType._id,
                    property: name,
                });
            });

            setData(data);
            setTotal(total);
        }).catch(error => {
            console.log(error);
        });
    }

    const onHandlePageChange = (pageNumber) => {
        onHandleSearch(searchParam, { pageSize: options.pageSize, pageNumber });
        setOptions({ ...options, currentPage: pageNumber });
    }


    const onHandlePageSizeChange = (pageSize) => {
        onHandleSearch(searchParam, { pageSize: pageSize, pageNumber: 1 });
        setOptions({ pageSize, currentPage: 1 });
    }

    const onHandleResetForm = () => {
        setSearchParam({});
        onHandleSearch({}, { pageSize: options.pageSize, pageNumber: 1 });
    }

    const onAddNew = () => {
        setIsShow(true);
    }

    const onClose = () => {
        setIsShow(false);
        setPropertyType({});
    }

    const onSavePropertyType = (propertyType) => {

        if (propertyType.id) {
            updatePropertyType(propertyType).then(() => {
                onHandleSearch(searchParam);
                onClose();
            }).catch(error => {
                console.log(error);
            });
        } else {
            createPropertyType(propertyType).then(() => {
                onHandleSearch(searchParam);
                onClose();
            }).catch(error => {
                console.log(error);
            });
        }
    }

    const onSaveFormChange = (propertyType) => {
        setPropertyType(propertyType);
    }

    const onEdit = (propertyType) => {
        setPropertyType(propertyType);
        setIsShow(true);
    }

    const onDelete = ({ _id }) => {
        deletePropertyType(_id).then(() => {
            onHandleSearch(searchParam);
        }).catch(error => {
            console.log(error);
        });
    }

    const modalRender = () => {
        return (
            <Modal
                classNames={'modal-lg'}
                title={propertyType.id ? 'Edit Property Type' : 'Add New PropertyType'}
                onClose={onClose}
                onSave={onSavePropertyType}>

                <PropertyTypeForm
                    propertyType={propertyType}
                    properties={properties}
                    onSaveFormChange={onSaveFormChange}
                    onClose={onClose}
                    onSavePropertyType={onSavePropertyType}
                />
            </Modal>
        )
    }

    return (
        <>
            {isShow && modalRender()}
            <div className="card">
                <div className="card-header text-uppercase">
                    <h3>Property Type</h3>
                </div>
                <div className="card-body">
                    <PropertyTypeSearch
                        searchParam={searchParam}
                        properties={properties}
                        onHandleSearchChange={onHandleSearchChange}
                        onHandleSearch={onHandleSearch}
                        onHandleResetForm={onHandleResetForm}
                    />
                    <PropertyTypeGrid
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

export default PropertyTypeContainer;
