import { useState } from 'react';
import Formsy from 'formsy-react';
import { FormsyElement, LoaderButton } from '../../../shared/components/index.js';
import { STATUSES } from '../constants/breakfast';
import { BREAKFAST_TEXT_CONFIG } from '../constants/resources';
const {
    FormsyInput,
    FormsySelect
} = FormsyElement

const BreakfastForm = ({
    breakfast,
    isLoading,
    onClose,
    onSaveBreakfast
}) => {
    const [isValid, setIsValid] = useState(true);

    const {
        name,
        description,
        status
    } = breakfast;

    const onSubmit = (modal) => {
        onSaveBreakfast(modal);
    }

    const onValid = () => {
        setIsValid(true);
    }

    const onInvalid = () => {
        setIsValid(false);
    }

    return (
        <Formsy id="addNew" onSubmit={onSubmit} onValid={onValid} onInvalid={onInvalid}>
            <div className="card-body">
                <div className="form-group">
                    <FormsyInput
                        inputProps={{
                            id: 'name',
                            type: 'text',
                            placeholder: BREAKFAST_TEXT_CONFIG.BREAKFAST_NAME_FIELD_LBL,
                        }}
                        name="name"
                        label={BREAKFAST_TEXT_CONFIG.BREAKFAST_NAME_FIELD_LBL}
                        value={name}
                        required
                        validationError={BREAKFAST_TEXT_CONFIG.REQUIRED_FIELD_MSG}
                    />
                </div>
                <div className="form-group">
                    <FormsyInput
                        inputProps={{
                            id: 'description',
                            type: 'text',
                            placeholder: BREAKFAST_TEXT_CONFIG.BREAKFAST_DESCRIPTION_FIELD_LBL,
                        }}
                        name="description"
                        label={BREAKFAST_TEXT_CONFIG.BREAKFAST_DESCRIPTION_FIELD_LBL}
                        value={description}
                        required
                        validationError={BREAKFAST_TEXT_CONFIG.REQUIRED_FIELD_MSG}
                    />
                    {/* <label>Description</label>
                    <textarea
                        className="form-control"
                        name="description"
                        value={description}
                        label={BED_TEXT_CONFIG.BED_DESCRIPTION_FIELD_LBL}
                        required
                    >
                    </textarea> */}
                </div>
                <div className="form-group">
                    <FormsySelect
                        name='status'
                        value={status}
                        dataSource={STATUSES}
                        label={BREAKFAST_TEXT_CONFIG.BREAKFAST_STATUS_FIELD_LBL}
                        required
                        validationError={BREAKFAST_TEXT_CONFIG.REQUIRED_FIELD_MSG}
                    />
                </div>
                <div className="form-group">
                    <div className="col-sm-12 d-flex justify-content-end">
                        <LoaderButton
                            type="button"
                            className="btn btn-danger mr-5"
                            onClick={() => onClose(false)}
                        >
                            {BREAKFAST_TEXT_CONFIG.BREAKFAST_CLOSE_BTN}
                        </LoaderButton>
                        <LoaderButton
                            type="submit"
                            disabled={!isValid}
                            isLoading={isLoading}
                        >
                            {BREAKFAST_TEXT_CONFIG.BREAKFAST_SUBMIT_BTN}
                        </LoaderButton>
                    </div>
                </div>
            </div>
        </Formsy>
    );
};

export default BreakfastForm;

