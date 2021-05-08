import PropTypes from 'prop-types';
import Grid from '../../../shared/components/grid/Grid';

const CountryGrid = ({
    data,
    options,
    totalItems,
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
            fieldName: 'Code',
            dataField: 'code',
            isSort: true,
        },
        {
            fieldName: 'Name',
            dataField: 'name',
            isSort: true,
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
        },
    ];

    const {
        currentPage,
        pageSize,
        sortField,
        sortDirection
    } = options

    return (
        <div className="card card-info">
            <div className="card-body">
                <div className="row mb-2">
                    <div className="col-sm-8">
                        <h4>Countries: {totalItems}</h4>
                    </div>
                    <div className="col-sm-4 d-flex justify-content-end">
                        <button type="button" className="btn btn-info" onClick={() => showModal()}>
                            Add New
                    </button>
                    </div>
                </div>
                <Grid
                    total={totalItems}
                    data={data}
                    columns={columns}
                    currentPage={currentPage}
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

export default CountryGrid;

CountryGrid.propTypes = {
    data: PropTypes.array,
    totalItems: PropTypes.number,
    options: PropTypes.object,
    showModal: PropTypes.func,
    onDelete: PropTypes.func,
    onHandlePageChange: PropTypes.func,
    onHandlePageSizeChange: PropTypes.func,
    onHandleSortChange: PropTypes.func
};

CountryGrid.defaultProps = {
    data: [],
    totalItems: 0,
    options: {}
};
