import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { withFormsy } from 'formsy-react';

const FormsyInput = (props) => {

    const changeValue = (event) => {
        props.setValue(event.currentTarget.value);
    }

    const {
        inputProps,
        value,
        isPristine
    } = props;

    const errorMessages = !isPristine ? props.errorMessages : [];

    return (
        <>
            <Form.Control
                {...inputProps}
                type="text"
                value={value || ''}
                onChange={changeValue}
            />
            {!_.isEmpty(errorMessages) && (
                errorMessages.map((error, index) => {
                    return (
                        <div className="invalid-feedback" key={index} style={{ display: 'block' }}>
                            {error}
                        </div>
                    )
                })
            )}
        </>
    )
}

export default withFormsy(FormsyInput);

// FormsyInput.propTypes = {
//     id: PropTypes.string,
//     type: PropTypes.string,
//     size: PropTypes.string,
//     placeholder: PropTypes.string,
//     readOnly: PropTypes.bool,
//     disabled: PropTypes.bool,
//     htmlSize: PropTypes.any,
//     className: PropTypes.string,
//     value: PropTypes.any,
//     errors: PropTypes.array,
//     onChange: PropTypes.func,
// };

// FormsyInput.defaultProps = {
//     type: 'text',
//     size: 'md',
//     placeholder: '',
//     readOnly: false,
//     disabled: false,
//     value: null,
//     errors: [],
//     onChange: () => { },
// };