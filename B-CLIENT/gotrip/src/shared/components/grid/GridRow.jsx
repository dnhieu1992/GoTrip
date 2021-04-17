import GridCol from './GridCol';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const GridRow = ({
    data,
    columns,
    onEdit,
    onRemove
}) => {

    const renderColumns = (object, columns) => {
        return columns.map((column) => {
            if (column.type === 'action') {
                return (
                    <td style={{ width: '100px' }}>
                        <FontAwesomeIcon onClick={()=>{alert("edit")}} className='mr-2' style={{ color: '#FFC107' }} icon={faEdit} />
                        <FontAwesomeIcon onClick={onRemove} icon={faTrashAlt} style={{ color: '#F44336' }} />
                    </td>
                )
            }
            return (
                <GridCol className={classNames({ 'd-none': column.isHidden })} value={object[column.dataField]} />
            )
        })
    };

    const renderRows = data.map((item, index) => {
        return (
            <tr key={index}>
                {renderColumns(item, columns)}
            </tr>
        )
    });

    return (
        <tbody>
            { renderRows}
        </tbody>
    )
}

export default GridRow;