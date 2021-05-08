import { useState } from 'react';
import PropTypes from 'prop-types';
import GridHeader from './GridHeader';
import GridRow from './GridRow';
import GridPagination from './GridPagination';
import { SORT_DIRECTION } from '../../constants/constant';

const Grid = ({
    columns,
    data,
    total,
    dataReady,
    currentPage,
    pageSize,
    pageOptions,
    onPageNumberChange,
    onPageSizeChange,
    onSortFieldChange,
}) => {
    const [sortOption, setSortOption] = useState({});

    const pageOptionsRender = pageOptions.map((pageSize) => {
        return (
            <option key={`pageOption_${pageSize}`} value={pageSize}>
                {pageSize}
            </option>
        );
    });

    const onSortChange = (sortingField) => {
        const {
            ASC,
            DESC
        } = SORT_DIRECTION;
        let sortDirection = DESC;

        if (sortingField === sortOption.sortField) {
            sortDirection = sortOption.sortDirection === ASC ? DESC : ASC;
        }

        onSortFieldChange(sortingField, sortDirection);
        setSortOption({ sortField: sortingField, sortDirection });
    };

    return (
        <>
            <div className="row">
                <div className="col-sm-12">
                    <table id="example2" className="table table-bordered table-hover">
                        <GridHeader
                            {...sortOption}
                            columns={columns}
                            onSortChange={onSortChange}
                        />
                        <GridRow key="row" data={data} columns={columns} dataReady={dataReady} />
                    </table>
                </div>
            </div>
            {total > 0 && (
                <>
                    <div className="row">
                        <div className="col-sm-12">
                            <label className="fs-6">Result Per Page</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2">
                            <select
                                className="form-control form-select"
                                id="pageOptions"
                                name="pageOptions"
                                value={pageSize}
                                onChange={(e) => onPageSizeChange(e.target.value)}
                            >
                                {pageOptionsRender}
                            </select>
                        </div>
                        <div className="col-sm-10 d-flex justify-content-end">
                            <GridPagination
                                dataReady={dataReady}
                                currentPage={currentPage}
                                pageSize={pageSize}
                                total={total}
                                onPageNumberChange={onPageNumberChange}
                            />
                        </div>
                    </div>
                </>
            )}
        </>
    );
};
export default Grid;

Grid.propTypes = {
    data: PropTypes.array,
    currentPage: PropTypes.number,
    pageSize: PropTypes.number,
    total: PropTypes.number,
    columns: PropTypes.array,
    dataReady: PropTypes.bool,
    pageOptions: PropTypes.array,
    onSortFieldChange: PropTypes.func,
    onPageSizeChange: PropTypes.func,
};

Grid.defaultProps = {
    data: [],
    currentPage: 1,
    pageSize: 50,
    total: 0,
    columns: [],
    dataReady: false,
    pageOptions: [10, 50, 100, 200],
    onSortFieldChange: () => { },
    onPageSizeChange: () => { },
};
