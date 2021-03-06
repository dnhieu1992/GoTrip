import PropTypes from 'prop-types';
import Grid from '../../../shared/components/grid/Grid';
import { PROPERTY_TYPE_TEXT_CONFIG } from '../constants/resources';

const PropertyTypeGrid = ({
    data,
    options,
    totalItems,
    onHandlePageChange,
    onHandlePageSizeChange,
    onDelete,
    showModal,
    dataReady,
    onHandleSortChange
}) => {
    const columns = [
        {
            fieldName: 'Id',
            dataField: 'id',
            isHidden: true
        },
        {
            fieldName: 'Name',
            dataField: 'name',
            isSort: true
        },
        {
            fieldName: 'Description',
            dataField: 'description',
            isSort: true
        },
        {
            fieldName: 'Property',
            dataField: 'propertyName',
            isSort: true
        },
        {
            fieldName: 'Status',
            dataField: 'status'
        },
        {
            fieldName: 'Action',
            type: 'action',
            onEdit: showModal,
            onDelete: onDelete
        }
    ];

    const {
        pageNumber,
        pageSize,
        sortField,
        sortDirection
    } = options

    return (
        <div className="card card-info">
            <div className="card-body">
                <div className="row mb-2">
                    <div className="col-sm-8">
                        <h4>{PROPERTY_TYPE_TEXT_CONFIG.PROPERTY_TYPE_TOTAL_LBL}:{totalItems}</h4>
                    </div>
                    <div className="col-sm-4 d-flex justify-content-end">
                        <button
                            type="button"
                            className="btn btn-info"
                            onClick={() => showModal()}
                        >
                            {PROPERTY_TYPE_TEXT_CONFIG.PROPERTY_TYPE_ADD_BTN}
                        </button>
                    </div>
                </div>
                <Grid
                    data={data}
                    columns={columns}
                    dataReady={dataReady}
                    currentPage={pageNumber}
                    pageSize={pageSize}
                    sortField={sortField}
                    sortDirection={sortDirection}
                    total={totalItems}
                    onPageNumberChange={onHandlePageChange}
                    onPageSizeChange={onHandlePageSizeChange}
                    onSortFieldChange={onHandleSortChange}
                />
            </div>
        </div>
    )
}
export default PropertyTypeGrid;

PropertyTypeGrid.propTypes = {
    data: PropTypes.array,
    totalItems: PropTypes.number,
    options: PropTypes.object,
    showModal: PropTypes.func,
    onDelete: PropTypes.func,
    onHandlePageChange: PropTypes.func,
    onHandlePageSizeChange: PropTypes.func,
    onHandelSortChange: PropTypes.func
}

PropertyTypeGrid.defaultProps = {
    data: [],
    totalItems: 0,
    options: {}
}