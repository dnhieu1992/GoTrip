import { useState } from 'react';
import Formsy from 'formsy-react';
import { FormsyElement, LoaderButton } from '../../../shared/components/index.js';
import { STATUSES } from '../constants/country';
import { COUNTRY_TEXT_CONFIG } from '../constants/resources';
const {
    FormsyInput,
    FormsySelect
} = FormsyElement

const CountryForm = ({
    country,
    isLoading,
    onClose,
    onSaveCountry
}) => {
    const [isValid, setIsValid] = useState(true);

    const {
        name,
        code,
        status
    } = country;

    const submit = (modal) => {
        onSaveCountry(modal)
    }

    const enableButton = () => {
        setIsValid(true);
    }

    const disableButton = () => {
        setIsValid(false);
    }

    return (
        <Formsy id="addNew" onSubmit={submit} onValid={enableButton} onInvalid={disableButton}>
            <div className="card-body">
                <div className="form-group">
                    <FormsyInput
                        inputProps={{
                            id: 'name',
                            type: 'text',
                            placeholder: COUNTRY_TEXT_CONFIG.COUNTRY_NAME_FIELD_LBL,
                        }}
                        name="name"
                        label={COUNTRY_TEXT_CONFIG.COUNTRY_NAME_FIELD_LBL}
                        value={name}
                        required
                        validationError={COUNTRY_TEXT_CONFIG.REQUIRED_FIELD_MSG}
                    />
                </div>
                <div className="form-group">
                    <FormsyInput
                        inputProps={{
                            id: 'code',
                            type: 'text',
                            placeholder: COUNTRY_TEXT_CONFIG.COUNTRY_CODE_FIELD_LBL,
                        }}
                        name='code'
                        label={COUNTRY_TEXT_CONFIG.COUNTRY_CODE_FIELD_LBL}
                        value={code}
                        required
                        validationError={COUNTRY_TEXT_CONFIG.REQUIRED_FIELD_MSG}
                    />
                </div>
                <div className="form-group">
                    <FormsySelect
                        name='status'
                        value={status}
                        dataSource={STATUSES}
                        label={COUNTRY_TEXT_CONFIG.COUNTRY_STATUS_FIELD_LBL}
                        required
                        validationError={COUNTRY_TEXT_CONFIG.REQUIRED_FIELD_MSG}
                    />
                </div>
                <div className="form-group">
                    <div className="col-sm-12 d-flex justify-content-end">
                        <LoaderButton
                            type="button"
                            className="mr-5"
                            onClick={() => onClose(false)}
                        >
                            {COUNTRY_TEXT_CONFIG.COUNTRY_CLOSE_BTN}
                        </LoaderButton>
                        <LoaderButton
                            type="submit"
                            disabled={!isValid}
                            isLoading={isLoading}
                        >
                            {COUNTRY_TEXT_CONFIG.COUNTRY_SUBMIT_BTN}
                        </LoaderButton>
                    </div>
                </div>
            </div>
        </Formsy>
    );
};

export default CountryForm;
