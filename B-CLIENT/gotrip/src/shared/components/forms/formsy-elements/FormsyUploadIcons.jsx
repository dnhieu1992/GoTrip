import { useState, useRef } from 'react';
import { Form, Row } from 'react-bootstrap';
import { withFormsy } from 'formsy-react';
import classNames from 'classnames';

const FormsyUploadIcons = (props) => {
    const [state, setState] = useState({});
    const fileRef = useRef();

    const {
        file,
        imagePreviewUrl,
    } = state;

    const changeValue = (event) => {
        props.setValue(event.currentTarget.value);

        const reader = new FileReader();
        const file = event.target.files[0];
        if (file) {
            reader.onloadend = () => {
                setState({
                    ...state,
                    file,
                    imagePreviewUrl: reader.result,
                })
            }
            reader.readAsDataURL(file);
        }

       props.onFileChange(file);
    }

    const {
        inputProps,
        isPristine,
        label,
        layout,
        imageUrl,
        value
    } = props;

    const errorMessages = !isPristine ? props.errorMessages : [];
    const isValid = _.isEmpty(errorMessages);

    const renderErrors = !_.isEmpty(errorMessages) && errorMessages.map((error, index) => {
        return (
            <Form.Text className="invalid-feedback" key={index} style={{ display: 'block', fontSize: '100%' }}>
                {error}
            </Form.Text>
        )
    })

    return (
        <Form.Group as={Row} className='mb-3 formsy-upload-icons'>
            <Form.File {...inputProps}
                label={label}
                className={classNames(
                    { 'element-horizontal': layout === 'horizontal' },
                    { 'is-invalid': !isValid })
                }
                onChange={changeValue} />
            <div className="row image-preview" >
                {(imageUrl || imagePreviewUrl) && (
                    <>
                        <img id="img" className="image-preview" src={imagePreviewUrl || imageUrl} />
                        {/* <i className="fa fa-times" onClick={removeImage} ></i> */}
                    </>
                )}
            </div>
            {renderErrors}
        </Form.Group>
    )
}

export default withFormsy(FormsyUploadIcons);