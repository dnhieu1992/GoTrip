import Formsy from 'formsy-react';
import { useState } from 'react';
import { FormsyElement, LoaderButton } from '../../../shared/components';
import { STATUSES } from '../constants/propertyType';
import { PROPERTY_TYPE_TEXT_CONFIG } from '../constants/resources';

const {
    FormsyInput,
    FormsySelect
} = FormsyElement

const PropertyTypeForm = ({
    propertyType,
    onClose,
    onSavePropertyType,
    properties,
    isLoading
}) => {
    const [isValid, setIsValid] = useState(true);

    const {
        name,
        description,
        status
    } = propertyType;

    const submit = (modal) => {
        onSavePropertyType(modal);
    }

    const enableButton = () => {
        setIsValid(true);
    }

    const disableButton = () => {
        setIsValid(false);
    }

    const data = properties.map(property => {
        return {
            value: property._id,
            label: property.name
        }
    })

    data.unshift({
        value: '',
        label: ''
    })

    return (
        <Formsy
            id="addNew"
            onSubmit={submit}
            onValid={enableButton}
            onInvalid={disableButton}
        >
            <div className="card-body">
                <div className="form-group">
                    <FormsyInput
                        inputProps={{
                            id: 'name',
                            type: 'text',
                            placeholder: PROPERTY_TYPE_TEXT_CONFIG.PROPERTY_TYPE_NAME_FIELD_LBL,
                        }}
                        name="name"
                        label={PROPERTY_TYPE_TEXT_CONFIG.PROPERTY_TYPE_NAME_FIELD_LBL}
                        value={name}
                        required
                        validationError={PROPERTY_TYPE_TEXT_CONFIG.REQUIRED_FIELD_MSG}
                    />
                </div>
                <div className="form-group">
                    <FormsyInput
                        inputProps={{
                            id: 'description',
                            type: 'text',
                            placeholder: PROPERTY_TYPE_TEXT_CONFIG.PROPERTY_TYPE_DESCRIPTION_FIELD_LBL
                        }}
                        name="description"
                        label={PROPERTY_TYPE_TEXT_CONFIG.PROPERTY_TYPE_DESCRIPTION_FIELD_LBL}
                        value={description}
                        required
                        validationError={PROPERTY_TYPE_TEXT_CONFIG.REQUIRED_FIELD_MSG}
                    />
                </div>
                <div className="form-group">
                    <FormsySelect
                        name='propertyId'
                        value={propertyType?.property?._id}
                        dataSource={data}
                        label={PROPERTY_TYPE_TEXT_CONFIG.PROPERTY_TYPE_PROPERTY_FIELD_LBL}
                        required
                        validationError={PROPERTY_TYPE_TEXT_CONFIG.REQUIRED_FIELD_MSG}

                    />
                </div>
                <div className="form-group">
                    <FormsySelect
                        name='status'
                        value={status}
                        dataSource={STATUSES}
                        label={PROPERTY_TYPE_TEXT_CONFIG.PROPERTY_TYPE_STATUS_FIELD_LBL}
                        required
                        validationError={PROPERTY_TYPE_TEXT_CONFIG.REQUIRED_FIELD_MSG}
                    />
                </div>
                <div className="form-group">
                    <div className="col-sm-12 d-flex justify-content-end">
                        <LoaderButton
                            type="button"
                            className="btn btn-danger mr-5"
                            onClick={() => onClose(false)}
                        >
                            {PROPERTY_TYPE_TEXT_CONFIG.PROPERTY_TYPE_CLOSE_BTN}
                        </LoaderButton>
                        <LoaderButton
                            type="submit"
                            className="btn btn-info"
                            disabled={!isValid}
                            isLoading={isLoading}
                        >
                            {PROPERTY_TYPE_TEXT_CONFIG.PROPERTY_TYPE_SUBMIT_BTN}
                        </LoaderButton>
                    </div>
                </div>
            </div>
        </Formsy>
    );
}

export default PropertyTypeForm