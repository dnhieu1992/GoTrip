import PropTypes from 'prop-types';
import Grid from '../../../shared/components/grid/Grid';

const CountryGrid = ({
  data,
  options,
  totalItems,
  onHandlePageChange,
  onAddNew,
  onEdit,
  onDelete,
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
    },
    {
      fieldName: 'Name',
      dataField: 'name',
    },
    {
      fieldName: 'Status',
      dataField: 'status',
    },
    {
      fieldName: 'Action',
      type: 'action',
      onEdit: onEdit,
      onDelete: onDelete,
    },
  ];

  return (
    <div className="card card-info">
      <div className="card-body">
        <div className="row mb-2">
          <div className="col-sm-8">
            <h4>Countries: {totalItems}</h4>
          </div>
          <div className="col-sm-4 d-flex justify-content-end">
            <button type="button" className="btn btn-info" onClick={onAddNew}>
              Add New
            </button>
          </div>
        </div>
        <Grid
          data={data}
          columns={columns}
          currentPage={options.currentPage}
          pageSize={options.pageSize}
          total={totalItems}
          onPageNumberChange={onHandlePageChange}
        />
      </div>
    </div>
  );
};
export default CountryGrid;
CountryGrid.propTypes = {
  data: PropTypes.array,
  totalItems: PropTypes.number,
};
CountryGrid.defaultProps = {
  data: [],
  totalItems: 0,
};
