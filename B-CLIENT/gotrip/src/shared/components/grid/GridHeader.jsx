import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSortAmountUp,
    faSortAmountDownAlt,
} from '@fortawesome/free-solid-svg-icons';
import { SORT_DIRECTION } from '../../constants/constant';

const GridHeader = ({
    columns,
    sortField,
    sortDirection,
    onSortChange
}) => {
    const renderHeaderColumns = columns.map(({ isHidden, isSort, fieldName, dataField }) => {
        return (
            <th
                key={fieldName}
                className={classNames({ 'd-none': isHidden })}
                onClick={() => onSortChange(dataField)}
            >
                <div className="row">
                    <div className="col-sm-12 ">
                        {fieldName}
                        {isSort && (
                            <div className="pull-right">
                                {dataField === sortField && (
                                    <FontAwesomeIcon
                                        icon={
                                            sortDirection.toLowerCase() === SORT_DIRECTION.ASC
                                                ? faSortAmountUp
                                                : faSortAmountDownAlt
                                        }
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </th>
        );
    });

    return (
        <thead>
            <tr>{renderHeaderColumns}</tr>
        </thead>
    );
};
export default GridHeader;

GridHeader.propTypes = {
    columns: PropTypes.array,
    sortField: PropTypes.string,
    sortDirection: PropTypes.string,
};

GridHeader.defaultProps = {
    columns: [],
};
