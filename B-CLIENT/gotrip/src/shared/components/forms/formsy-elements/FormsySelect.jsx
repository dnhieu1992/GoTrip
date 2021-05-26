import { Form } from 'react-bootstrap';
import { withFormsy } from 'formsy-react';

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

    return (
        <Form.Group>
            <Form.Label>{label}</Form.Label>
            <Form.Control as="select" onChange={changeValue} value={value}>
                <option value=""></option>
                {dataSource.map((item, index) => {
                    return <option key={`${item?.value}_${index}`}>{item?.label}</option>
                })}
            </Form.Control>
            {
                errorMessages.map((error, index) => {
                    return (
                        <div className="invalid-feedback" key={index} style={{ display: 'block' }}>
                            {error}
                        </div>
                    )
                })
            }
        </Form.Group >
    )
}

export default withFormsy(FormsySelect);