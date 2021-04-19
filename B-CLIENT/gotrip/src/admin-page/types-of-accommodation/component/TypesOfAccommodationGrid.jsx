import PropTypes from 'prop-types';
import Grid from '../../../shared/components/grid/Grid';

const TypesOfAccommodationGrid = ({
    data,
    options,
    totalItems,
    onHandlePageChange,
    addNewForm
}) =>{
    const onEdit = () => {

    }
    const onDelete = () => {

    }
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
            fieldName: 'Amount',
            dataField: 'amount'
        },
        {
            fieldName: 'Status',
            dataField: 'status'
        },
        {
            fieldName: 'Action',
            type: 'action',
            onEdit: onEdit,
            onDelete: onDelete
        }
    ];

    return (
        <div className="card card-info">
            <div className="card-body">
                <div className="row mb-2">
                    <div className="col-sm-8">
                        <h4>Accommodation: {totalItems}</h4>
                    </div>
                    <div className="col-sm-4 d-flex justify-content-end">
                        <button type = "button" className = "btn btn-info" onClick = {addNewForm}>Add New</button>
                    </div>
                </div>
                <Grid data = {data}
                    columns = {columns}
                    currentPage = {options.currentPage}
                    pageSize = {options.pageSize}
                    total = {totalItems}
                    onHandlePageChange = {onHandlePageChange}/>
            </div>
        </div>
    )
}
export default TypesOfAccommodationGrid;
TypesOfAccommodationGrid.propTypes = {
    data: PropTypes.array,
    totalItems: PropTypes.number
};
TypesOfAccommodationGrid.defaultProps = {
    data: [],
    totalItems: 0
}