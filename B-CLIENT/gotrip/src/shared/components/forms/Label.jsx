import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

const Label = ({ children }) => {
    return (
        <Form.Label>{children}</Form.Label>
    )
}

export default Label;

Label.propTypes = {
    children: PropTypes.element.isRequired
};