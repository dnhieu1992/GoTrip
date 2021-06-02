import { Form } from 'react-bootstrap';
import { withFormsy } from 'formsy-react';
import classNames from 'classnames';

const FormsySelect = (props) => {
    const changeValue = (event) => {
        props.setValue(event.currentTarget.value);
    }

    const {
        value,
        label,
        dataSource,
        isPristine
    } = props;

    const errorMessages = !isPristine ? props.errorMessages : [];
    const isValid = _.isEmpty(errorMessages);

    const optionsRender = dataSource.map((item, index) => {
        return (
            <option key={`${item?.value}_${index}`}>
                {item?.label}
            </option>)
    });

    return (
        <Form.Group className='mb-3 form-select'>
            {label && (<Form.Label>{label}</Form.Label>)}
            <Form.Control as="select"
                value={value}
                className={classNames('form-select', { 'is-invalid': !isValid })}
                onChange={changeValue}
            >
                {optionsRender}
            </Form.Control>
            {
                errorMessages.map((error, index) => {
                    return (
                        <Form.Text
                            key={index}
                            className="invalid-feedback"
                            style={{ display: 'block', fontSize: '100%' }}
                        >
                            {error}
                        </Form.Text>
                    )
                })
            }
        </Form.Group >
    )
}

export default withFormsy(FormsySelect);