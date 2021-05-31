import { Form } from 'react-bootstrap';

const Select = (props) => {
    const {
        inputProps,
        value,
        dataSource,
        onChange
    } = props;

    const optionsRender = dataSource.map((item, index) => {
        return (
            <option key={`${item?.value}_${index}`} value={item.value}>
                {item?.label}
            </option>
            );
    });

    return (
        <Form.Control as="select"
            {...inputProps}
            value={value}
            onChange={onChange}
        >
            {optionsRender}
        </Form.Control>

    )
}

export default Select;