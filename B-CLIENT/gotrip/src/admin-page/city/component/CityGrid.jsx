import PropTypes from 'prop-types';
import Grid from '../../../shared/components/grid/Grid';
import { CITY_TEXT_CONFIG } from '../constants/resources';

const CityGrid = ({
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
  console.log(data);
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
      fieldName: 'Country',
      dataField: 'countryName',
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
            <h4>{CITY_TEXT_CONFIG.CITY_TOTAL_LBL}: {totalItems}</h4>
          </div>
          <div className="col-sm-4 d-flex justify-content-end">
            <button type="button" className="btn btn-info" onClick={() => showModal()}>
              {CITY_TEXT_CONFIG.CITY_ADD_BTN}
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
export default CityGrid;

CityGrid.propTypes = {
  data: PropTypes.array,
  totalItems: PropTypes.number,
  options: PropTypes.object,
  showModal: PropTypes.func,
  onDelete: PropTypes.func,
  onHandlePageChange: PropTypes.func,
  onHandlePageSizeChange: PropTypes.func,
  onHandleSortChange: PropTypes.func
};

CityGrid.defaultProps = {
  data: [],
  totalItems: 0,
  options: {}
};