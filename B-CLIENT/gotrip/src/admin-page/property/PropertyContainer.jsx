import { useEffect, useRef, useState } from 'react';
import Modal from '../../shared/components/forms/Modal';
import PropertyGrid from './component/PropertyGrid';
import PropertySearch from './component/PropertySearch';
import PropertyForm from './component/PropertyForm';
import { 
    getProperties, 
    updateProperty, 
    createNewProperty, 
    deleteProperty 
} from './api/apiHandle.js';

const PropertyContainer = () => {
    const [total, setTotal] = useState(0);
    const [data, setData] = useState([]);
    const [searchParam, setSearchParam] = useState({});
    const [options, setOptions] = useState({ currentPage: 1, pageSize: 5 });
    const [isShow, setIsShow] = useState(false);
    const [property, setProperty] = useState({});
    const didMountRef = useRef(false);

    useEffect(() => {
        if (!didMountRef.current) {
            onHandleSearch({});
            didMountRef.current = true;
        }
    });

    const onHandleSearchChange = (param) => {
        setSearchParam(param);
    }

    const onHandleSearch = ({ propertyName, status }, options = {}) => {
        const params = {
            name: propertyName,
            status: status,
            pageNumber: options.pageNumber || 1,
            pageSize: options.pageSize || 10
        }

        Object.keys(params).forEach(key => {
            if (params[key] === undefined || params[key] === null || (typeof (params[key]) === "Strings" && params[key] === '')) {
                delete params[key];
            }
        });

        getProperties(params).then(({ total, properties }) => {
            setData(properties);
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

    const addNewForm = () => {
        setIsShow(true);
    }

    const onClose = () => {
        setIsShow(false);
        setProperty({});
    }

    const updateRequest = { ...property, id: property._id }

    const onSaveProperty = (property) => {
        if (property._id) {
            updateProperty(updateRequest).then(() => {
                onHandleSearch(searchParam);
                onClose();
            }).catch(error => {
                console.log(error);
            })
        } else {
            createNewProperty(property).then(() => {
                onHandleSearch(searchParam);
                onClose();
            }).catch(error => {
                console.log(error);
            })
        }
    }

    const onSaveFormChange = (property) => {
        setProperty(property);
    }

    const onEdit = (property) => {
        setProperty(property);
        setIsShow(true);
    }

    const onDelete = ({ _id }) => {
        deleteProperty(_id).then(() => {
            onHandleSearch(searchParam);
        }).catch(error => {
            console.log(error);
        })
    }

    const modalRender = () => {
        return (
            <Modal classNames={'modal-lg'}
                title={property.id ? 'Edit Property' : 'Add New Property'}
                onClose={onClose}
                onSave={onSaveProperty}>
                <PropertyForm
                    property={property}
                    onSaveFormChange={onSaveFormChange}
                    onClose={onClose}
                    onSaveProperty={onSaveProperty}
                />

            </Modal>
        )
    }
    return (
        <>
            {isShow && modalRender()}
            <div className="card">
                <div className="card-header text-uppercase">
                    <h3>Property</h3>
                </div>
                <div className="card-body">
                    <PropertySearch
                        searchParam={searchParam}
                        onHandleSearchChange={onHandleSearchChange}
                        onHandleSearch={onHandleSearch}
                        onHandleResetForm={onHandleResetForm}
                    />
                    <PropertyGrid
                        data={data}
                        options={options}
                        totalItems={total}
                        onHandlePageChange={onHandlePageChange}
                        onHandlePageSizeChange={onHandlePageSizeChange}
                        addNewForm={addNewForm}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                </div>
            </div>
        </>
    )
}

export default PropertyContainer;