import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSortAmountUp,
  faSortAmountDownAlt,
} from '@fortawesome/free-solid-svg-icons';

const GridHeader = ({ columns, sortField, sortDirection, onSortChange }) => {
  const renderHeaderColumns = columns.map((column) => {
    return (
      <th
        className={classNames({ 'd-none': column.isHidden })}
        key={column.fieldName}
        onClick={() => onSortChange(column.fieldName)}
      >
        <div className="row">
          <div className="col-sm-8">{column.fieldName}</div>

          <div className="d-flex justify-content-end align-items-center col-sm-4">
            {column.fieldName === sortField && (
              <FontAwesomeIcon
                icon={
                  sortDirection.toLowerCase() === 'asc'
                    ? faSortAmountUp
                    : faSortAmountDownAlt
                }
              />
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
