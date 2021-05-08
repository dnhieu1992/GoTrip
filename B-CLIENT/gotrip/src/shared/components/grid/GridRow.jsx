import GridCol from './GridCol';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const GridRow = ({ data, columns }) => {
    const renderColumns = (object, columns, rowIndex) => {
        return columns.map((column, index) => {
            if (column.type === 'action') {
                return (
                    <td key={`Action_${rowIndex}_${index}`} style={{ width: '100px' }}>
                        {column.onEdit && (
                            <FontAwesomeIcon
                                className="mr-2"
                                style={{ color: '#FFC107' }}
                                icon={faEdit}
                                onClick={() => column.onEdit(object)}
                            />
                        )}
                        {column.onDelete && (
                            <FontAwesomeIcon
                                icon={faTrashAlt}
                                style={{ color: '#F44336' }}
                                onClick={() => column.onDelete(object)}
                            />
                        )}
                    </td>
                );
            }
            return (
                <GridCol
                    key={`Action_${rowIndex}_${index}`}
                    className={classNames({ 'd-none': column.isHidden })}
                    value={object[column.dataField]}
                />
            );
        });
    };

    const renderRows = data.map((item, index) => {
        return <tr key={`Row_${index}`}>{renderColumns(item, columns, index)}</tr>;
    });

    return <tbody>{renderRows}</tbody>;
};

export default GridRow;
