import Formsy from 'formsy-react';
import { useState } from 'react';
import { FormsyElement, LoaderButton } from '../../../shared/components/index.js';
import { ROOMTYPE_TEXT_CONFIG } from '../constants/resources';
import { STATUSES } from '../constants/roomType';

const {
    FormsyInput,
    FormsySelect
} = FormsyElement

const RoomTypeForm = ({
    roomType,
    onClose,
    onSaveRoomType,
    isLoading
}) => {
    const [isValid, setIsValid] = useState(true);

    const {
        name,
        description,
        status
    } = roomType;

    const submit = (modal) => {
        onSaveRoomType(modal);
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
                            placeholder: ROOMTYPE_TEXT_CONFIG.ROOMTYPE_NAME_FIELD_LBL,
                        }}
                        name="name"
                        label={ROOMTYPE_TEXT_CONFIG.ROOMTYPE_NAME_FIELD_LBL}
                        value={name}
                        required
                        validationError={ROOMTYPE_TEXT_CONFIG.REQUIRED_FIELD_MSG}
                    />
                </div>
                <div className="form-group">
                    <FormsyInput
                        inputProps={{
                            id: 'description',
                            type: 'text',
                            placeholder: ROOMTYPE_TEXT_CONFIG.ROOMTYPE_DESCRIPTION_FIELD_LBL,
                        }}
                        name='description'
                        label={ROOMTYPE_TEXT_CONFIG.ROOMTYPE_DESCRIPTION_FIELD_LBL}
                        value={description}
                        required
                        validationError={ROOMTYPE_TEXT_CONFIG.REQUIRED_FIELD_MSG}
                    />
                </div>
                <div className="form-group">
                    <FormsySelect
                        name='status'
                        value={status}
                        dataSource={STATUSES}
                        label={ROOMTYPE_TEXT_CONFIG.ROOMTYPE_STATUS_FIELD_LBL}
                        required
                        validationError={ROOMTYPE_TEXT_CONFIG.REQUIRED_FIELD_MSG}
                    />
                </div>
                <div className="form-group">
                    <div className="col-sm-12 d-flex justify-content-end">
                        <LoaderButton
                            type="button"
                            className="mr-5"
                            onClick={() => onClose(false)}
                        >
                            {ROOMTYPE_TEXT_CONFIG.ROOMTYPE_CLOSE_BTN}
                        </LoaderButton>

                        <LoaderButton
                            type="submit"
                            disabled={!isValid}
                            isLoading={isLoading}
                        >
                            {ROOMTYPE_TEXT_CONFIG.ROOMTYPE_SUBMIT_BTN}
                        </LoaderButton>
                    </div>
                </div>
            </div>
        </Formsy>
    )
}

export default RoomTypeForm;