import PropTypes from 'prop-types';
import Grid from '../../../shared/components/grid/Grid';
import { BREAKFAST_TEXT_CONFIG } from '../constants/resources';

const BreakfastGrid = ({
    data,
    options,
    totalItems,
    dataReady,
    showModal,
    onDelete,
    onHandlePageChange,
    onHandlePageSizeChange,
    onHandleSortChange
}) => {
    const columns = [
        {
            fieldName: 'Id',
            dataField: 'id',
            isHidden: true,
        },
        {
            fieldName: 'Name',
            dataField: 'name',
            isSort: true,
        },
        {
            fieldName: 'Description',
            dataField: 'description',
        },
        {
            fieldName: 'Status',
            dataField: 'status',
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
                        <h4>{BREAKFAST_TEXT_CONFIG.BREAKFAST_TOTAL_LBL}: {totalItems}</h4>
                    </div>
                    <div className="col-sm-4 d-flex justify-content-end">
                        <button type="button" className="btn btn-info" onClick={() => showModal()}>
                            {BREAKFAST_TEXT_CONFIG.BREAKFAST_ADD_BTN}
                        </button>
                    </div>
                </div>
                <Grid
                    total={totalItems}
                    data={data}
                    dataReady={dataReady}
                    columns={columns}
                    currentPage={pageNumber}
                    pageSize={pageSize}
                    sortField={sortField}
                    sortDirection={sortDirection}
                    onPageNumberChange={onHandlePageChange}
                    onPageSizeChange={onHandlePageSizeChange}
                    onSortFieldChange={onHandleSortChange}
                />
            </div>
        </div>
    );
};

export default BreakfastGrid;

BreakfastGrid.propTypes = {
    data: PropTypes.array,
    totalItems: PropTypes.number,
    options: PropTypes.object,
    showModal: PropTypes.func,
    onDelete: PropTypes.func,
    onHandlePageChange: PropTypes.func,
    onHandlePageSizeChange: PropTypes.func,
    onHandleSortChange: PropTypes.func
};

BreakfastGrid.defaultProps = {
    data: [],
    totalItems: 0,
    options: {}
};