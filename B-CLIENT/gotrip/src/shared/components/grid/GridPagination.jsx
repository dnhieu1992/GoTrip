const GridPagination = ({ currentPage, pageSize, total }) => {

    const renderPagination = (currentPage, pageSize, total) => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(total / pageSize); i++) {
            pageNumbers.push(i);
        }
        const renderPaginations = pageNumbers.map((pageNumber) => {
            return (
                <li className={`paginate_button page-item ${pageNumber === currentPage && 'active'}`}>
                    <a href="#" aria-controls="example2" data-dt-idx="1" tabindex="0" className="page-link">{pageNumber}</a>
                </li>
            )
        });
        return renderPaginations;
    }

    const isRenderPagination = parseInt(total) > 0;

    return (
        isRenderPagination && (
            <div className="dataTables_paginate paging_simple_numbers" id="example2_paginate">
                <ul className="pagination">
                    <li className="paginate_button page-item previous disabled" id="example2_previous">
                        <a href="#" aria-controls="example2" data-dt-idx="0" tabIndex="0" className="page-link">Previous</a>
                    </li>
                    {renderPagination(currentPage, pageSize, total)}
                    <li className="paginate_button page-item next" id="example2_next">
                        <a href="#" aria-controls="example2" data-dt-idx="7" tabindex="0" className="page-link">Next</a>
                    </li>
                </ul>
            </div>
        )
    )
}

export default GridPagination;