import { Form } from 'react-bootstrap';
import { withFormsy } from 'formsy-react';
import classNames from 'classnames';

const FormsyTextarea = (props) => {

    const changeValue = (event) => {
        props.setValue(event.currentTarget.value);
    }

    const {
        textareaProps,
        type,
        value,
        isPristine,
        label
    } = props;

    const errorMessages = !isPristine ? props.errorMessages : [];
    const isValid = _.isEmpty(errorMessages);

    return (
        <Form.Group className='mb-3'>
            <Form.Label>{label}</Form.Label>
            <Form.Control as="textarea"
                {...textareaProps}
                className={classNames({ 'is-invalid': !isValid })}
                type={type}
                value={value || ''}
                onChange={changeValue}
            >

            </Form.Control>
            {!_.isEmpty(errorMessages) && (
                errorMessages.map((error, index) => {
                    return (
                        <Form.Text
                            className="invalid-feedback"
                            key={index}
                            style={{ display: 'block', fontSize: '100%' }}
                        >
                            {error}
                        </Form.Text>
                    )
                })
            )}
        </Form.Group>
    )
}

export default withFormsy(FormsyTextarea);