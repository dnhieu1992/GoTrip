import PropTypes from 'prop-types';
import classNames from 'classnames';

const GridPagination = ({
    currentPage,
    pageSize,
    total,
    onPageNumberChange
}) => {
    const renderPagination = (currentPage, pageSize, total) => {
        const pageNumbers = [];

        for (let i = 1; i <= Math.ceil(total / pageSize); i++) {
            pageNumbers.push(i);
        }

        const renderPaginations = pageNumbers.map((pageNumber) => {
            let className = classNames('paginate_button page-item ', { 'active': pageNumber === currentPage });
            return (
                <li className={className}
                    onClick={() => onPageNumberChange(pageNumber)}
                >
                    <p className="page-link">{pageNumber}</p>
                </li>
            )
        });

        return renderPaginations;
    }

    return (
        <div className="dataTables_paginate paging_simple_numbers"
            id="example2_paginate">
            <ul className="pagination">
                {currentPage > 1 && (
                    <li className={classNames('paginate_button page-item previous')}
                        id="example2_previous"
                        onClick={() => onPageNumberChange(currentPage - 1)}
                    >
                        <p className="page-link">Previous</p>
                    </li>
                )}

                {renderPagination(currentPage, pageSize, total)}

                {currentPage < Math.ceil(total / pageSize) && (
                    <li className={classNames('paginate_button page-item next')}
                        id="example2_next"
                        onClick={() => onPageNumberChange(currentPage + 1)}
                    >
                        <p className="page-link">Next</p>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default GridPagination;

GridPagination.propTypes = {
    currentPage: PropTypes.number,
    pageSize: PropTypes.number,
    total: PropTypes.number,
};

GridPagination.defaultProps = {
    currentPage: 1,
    pageSize: 10,
    total: 0
};