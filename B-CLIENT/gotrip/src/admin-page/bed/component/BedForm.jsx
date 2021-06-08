import { useState } from 'react';
import Formsy from 'formsy-react';
import { FormsyElement, LoaderButton } from '../../../shared/components/index.js';
import { STATUSES } from '../constants/bed';
import { BED_TEXT_CONFIG } from '../constants/resources';
const {
    FormsyInput,
    FormsySelect
} = FormsyElement

const BedForm = ({
    bed,
    isLoading,
    onClose,
    onSaveBed
}) => {
    const [isValid, setIsValid] = useState(true);

    const {
        name,
        description,
        status
    } = bed;

    const submit = (modal) => {
        onSaveBed(modal);
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
                            placeholder: BED_TEXT_CONFIG.BED_NAME_FIELD_LBL,
                        }}
                        name="name"
                        label={BED_TEXT_CONFIG.BED_NAME_FIELD_LBL}
                        value={name}
                        required
                        validationError={BED_TEXT_CONFIG.REQUIRED_FIELD_MSG}
                    />
                </div>
                <div className="form-group">
                    <FormsyElement.FormsyTextarea
                        textareaProps={{
                            id: 'description',
                            type: 'text',
                            placeholder: BED_TEXT_CONFIG.BED_DESCRIPTION_FIELD_LBL,
                        }}
                        name="description"
                        label={BED_TEXT_CONFIG.BED_DESCRIPTION_FIELD_LBL}
                        value={description}
                        required
                        validationError={BED_TEXT_CONFIG.REQUIRED_FIELD_MSG}
                    >
                    </FormsyElement.FormsyTextarea>
                </div>
                <div className="form-group">
                    <FormsySelect
                        name='status'
                        value={status}
                        dataSource={STATUSES}
                        label={BED_TEXT_CONFIG.BED_STATUS_FIELD_LBL}
                        required
                        validationError={BED_TEXT_CONFIG.REQUIRED_FIELD_MSG}
                    />
                </div>
                <div className="form-group">
                    <div className="col-sm-12 d-flex justify-content-end">
                        <LoaderButton
                            type="button"
                            className="btn btn-danger mr-5"
                            onClick={() => onClose(false)}
                        >
                            {BED_TEXT_CONFIG.BED_CLOSE_BTN}
                        </LoaderButton>
                        <LoaderButton
                            type="submit"
                            disabled={!isValid}
                            isLoading={isLoading}
                        >
                            {BED_TEXT_CONFIG.BED_SUBMIT_BTN}
                        </LoaderButton>
                    </div>
                </div>
            </div>
        </Formsy>
    );
};

export default BedForm;

