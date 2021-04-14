import GridHeader from './GridHeader';
import GridRow from './GridRow';
import GridPagination from './GridPagination';

const Grid = (props) => {

    const GridHeaderRender = () => {
        const { columns } = props;
        const headerColumns = columns.map(item => {
            return item.fieldName;
        });
        return (<GridHeader headerColumns={headerColumns} />)
    }

    return (
        <section class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">DataTable with minimal features & hover style</h3>
                            </div>
                            <div class="card-body">
                                <div className="row">
                                    <div class="col-sm-12">
                                        <table id="example2" class="table table-bordered table-hover">
                                            {GridHeaderRender()}
                                            <GridRow data={props.data} columns={props.columns} />
                                        </table>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-12 col-md-5">
                                        <div class="dataTables_info" id="example2_info" role="status" aria-live="polite">Showing 1 to 10 of 57 entries</div>
                                    </div >
                                    <div class="col-sm-12 col-md-7 d-flex justify-content-end">
                                        <GridPagination />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section >
    )
}
export default Grid;