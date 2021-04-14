import GridCol from './GridCol';

const GridRow = ({ data, columns }) => {

    const renderColumns = (object, columns) => {
        return columns.map((column) => {
            return (
                <GridCol isHidden={column.isHidden || false} value={object[column.dataField]} />
            )
        })
    }

    const renderRows = data.map((item, index) => {
        return (
            <tr key={index}>
                {renderColumns(item, columns)}
            </tr>
        )
    });

    return (

        <tbody>
            {console.log("test render row:",renderRows)}
            { renderRows}
        </tbody>
    )
}

export default GridRow;