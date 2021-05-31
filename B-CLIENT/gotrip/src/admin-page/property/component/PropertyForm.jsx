import { useState } from 'react';
import Formsy from 'formsy-react';
import { FormsyElement, LoaderButton } from '../../../shared/components/index.js';
import { PROPERTY_TEXT_CONFIG } from '../constants/resources.js';
import { STATUSES } from '../../country/constants/country.js';

const {
    FormsyInput,
    FormsySelect
} = FormsyElement

const PropertyForm = ({
    property,
    onClose,
    onSaveProperty,
    isLoading
}) => {
    const [isValid, setIsValid] = useState(true);
    const {
        name,
        description,
        status
    } = property;

    const submit = (modal) => {
        onSaveProperty(modal);
    }

    const enableButton = () => {
        setIsValid(true);
    }

    const disableButton = () => {
        setIsValid(fasle);
    }

    return (
        <Formsy id="addNew" onSubmit={submit} onValid={enableButton} onInValid={disableButton}>
            <div className="card-body">
                <div className="form-group">
                    <FormsyInput
                        inputProps={{
                            id: 'name',
                            type: 'text',
                            placeholder: PROPERTY_TEXT_CONFIG.PROPERTY_NAME_FIELD_LBL,
                        }}
                        name="name"
                        label={PROPERTY_TEXT_CONFIG.PROPERTY_NAME_FIELD_LBL}
                        value={name}
                        required
                        validationError={PROPERTY_TEXT_CONFIG.REQUIRED_FIELD_MSG}
                    />
                </div>
                <div className="form-group">
                    <FormsyInput
                        inputProps={{
                            id: 'description',
                            type: 'text',
                            placeholder: PROPERTY_TEXT_CONFIG.PROPERTY_DESCRIPTION_FIELD_LBL,
                        }}
                        name='description'
                        label={PROPERTY_TEXT_CONFIG.PROPERTY_DESCRIPTION_FIELD_LBL}
                        value={description}
                        required
                        validationError={PROPERTY_TEXT_CONFIG.REQUIRED_FIELD_MSG}
                    />
                </div>
                <div className="form-group">
                    <FormsySelect
                        name='status'
                        value={status}
                        dataSource={STATUSES}
                        label={PROPERTY_TEXT_CONFIG.PROPERTY_STATUS_FIELD_LBL}
                        required
                        validationError={PROPERTY_TEXT_CONFIG.REQUIRED_FIELD_MSG}
                    />
                </div>
                <div className="form-group">
                    <div className="col-sm-12 d-flex justify-content-end">
                        <LoaderButton
                            type="button"
                            className="mr-5"
                            onClick={() => onClose(false)}
                        >
                            {PROPERTY_TEXT_CONFIG.PROPERTY_CLOSE_BTN}
                        </LoaderButton>
                        <LoaderButton
                            type="submit"
                            disabled={!isValid}
                            isLoading={isLoading}
                        >
                            {PROPERTY_TEXT_CONFIG.PROPERTY_SUBMIT_BTN}
                        </LoaderButton>
                    </div>
                </div>
            </div>
        </Formsy>
    )
}
export default PropertyForm;