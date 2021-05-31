import PropTypes from 'prop-types';
import Grid from '../../../shared/components/grid/Grid';
import { ROOMTYPE_TEXT_CONFIG } from '../constants/resources';

const RoomTypeGrid = ({
    data,
    options,
    totalItems,
    onHandlePageChange,
    onHandlePageSizeChange,
    showModal,
    onDelete,
    dataReady,
    onHandleSortChange
}) => {
    const columns = [
        {
            fieldName: 'Id',
            dataField: '_id',
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
            fieldName: 'Status',
            dataField: 'status'
        },
        {
            fieldName: 'Action',
            type: 'action',
            onEdit: showModal,
            onDelete: onDelete,
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
                        <h4>{ROOMTYPE_TEXT_CONFIG.ROOMTYPE_TOTAL_LBL}:{totalItems}</h4>
                    </div>
                    <div className="col-sm-4 d-flex justify-content-end">
                        <button
                            type="button"
                            className="btn btn-info"
                            onClick={() => showModal()}
                        >
                            {ROOMTYPE_TEXT_CONFIG.ROOMTYPE_ADD_BTN}
                        </button>
                    </div>
                </div>
                <Grid
                    columns={columns}
                    currentPage={pageNumber}
                    pageSize={pageSize}
                    sortField={sortField}
                    sortDirection={sortDirection}
                    total={totalItems}
                    data={data}
                    dataReady={dataReady}
                    onPageNumberChange={onHandlePageChange}
                    onPageSizeChange={onHandlePageSizeChange}
                    onSortFieldChange={onHandleSortChange}
                />
            </div>
        </div>
    )
}

export default RoomTypeGrid;

RoomTypeGrid.propTypes = {
    data: PropTypes.array,
    totalItems: PropTypes.number,
    options: PropTypes.object,
    showModal: PropTypes.func,
    onDelete: PropTypes.func,
    onHandlePageChange: PropTypes.func,
    onHandlePageSizeChange: PropTypes.func,
    onHandleSortChange: PropTypes.func
}

RoomTypeGrid.defaultProps = {
    data: [],
    totalItems: 0,
    options: {}
}