import { Form } from 'react-bootstrap';
import { withFormsy } from 'formsy-react';
import classNames from 'classnames';

const FormsyInput = (props) => {

    const changeValue = (event) => {
        props.setValue(event.currentTarget.value);
    }

    const {
        inputProps,
        value,
        isPristine,
        label
    } = props;

    const errorMessages = !isPristine ? props.errorMessages : [];
    const isValid = _.isEmpty(errorMessages);

    return (
        <Form.Group className='mb-3'>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                {...inputProps}
                className={classNames({ 'is-invalid': !isValid })}
                type="text"
                value={value || ''}
                onChange={changeValue}
            />
            {!_.isEmpty(errorMessages) && (
                errorMessages.map((error, index) => {
                    return (
                        <Form.Text className="invalid-feedback" key={index} style={{ display: 'block', fontSize:'100%' }}>
                            {error}
                        </Form.Text>
                    )
                })
            )}
        </Form.Group>
    )
}

export default withFormsy(FormsyInput);