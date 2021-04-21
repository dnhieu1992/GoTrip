import PropTypes from 'prop-types';
import Grid from '../../../shared/components/grid/Grid';

const CityGrid = ({
  data,
  options,
  totalItems,
  onHandlePageChange,
  addNewForm,
  editForm,
  deleteForm
}) => {
  const columns = [
    {
      fieldName: 'Id',
      dataField: 'id',
      isHidden: true
    },
    {
      fieldName: 'Name',
      dataField: 'name'
    },
    {
      fieldName: 'Country',
      dataField: 'country'
    },
    {
      fieldName: 'Status',
      dataField: 'status'
    },
    {
      fieldName: 'Action',
      type: 'action',
      onEdit: editForm,
      onDelete: deleteForm
    }
  ];


  return (
    <div className="card card-info">
      <div className="card-body">
        <div className="row mb-2">
          <div className="col-sm-8">
            <h4>Cities: {totalItems}</h4>
          </div>
          <div className="col-sm-4 d-flex justify-content-end">
            <button type="button" className="btn btn-info" onClick={addNewForm}>Add New</button>
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

  )
}
export default CityGrid;
CityGrid.propTypes = {
  data: PropTypes.array,
  totalItems: PropTypes.number
};
CityGrid.defaultProps = {
  data: [],
  totalItems: 0
};