const GridHeader = ({ headerColumns }) => {
    const renderHeaderColumns = headerColumns.map(column => {
        return <th key={column}>{column}</th>
    })
    return (
        <thead>
            <tr>
                {renderHeaderColumns}
            </tr>
        </thead>
    )
}

export default GridHeader;