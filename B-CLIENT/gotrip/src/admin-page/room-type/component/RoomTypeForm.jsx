import Formsy from 'formsy-react';
import { useState } from 'react';
import { FormsyElement, LoaderButton } from '../../../shared/components/index.js';
import { ROOM_TYPE_TEXT_CONFIG } from '../constants/resources';
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
                            placeholder: ROOM_TYPE_TEXT_CONFIG.ROOM_TYPE_NAME_FIELD_LBL,
                        }}
                        name="name"
                        label={ROOM_TYPE_TEXT_CONFIG.ROOM_TYPE_NAME_FIELD_LBL}
                        value={name}
                        required
                        validationError={ROOM_TYPE_TEXT_CONFIG.REQUIRED_FIELD_MSG}
                    />
                </div>
                <div className="form-group">
                    <FormsyInput
                        inputProps={{
                            id: 'description',
                            type: 'text',
                            placeholder: ROOM_TYPE_TEXT_CONFIG.ROOM_TYPE_DESCRIPTION_FIELD_LBL,
                        }}
                        name='description'
                        label={ROOM_TYPE_TEXT_CONFIG.ROOM_TYPE_DESCRIPTION_FIELD_LBL}
                        value={description}
                        required
                        validationError={ROOM_TYPE_TEXT_CONFIG.REQUIRED_FIELD_MSG}
                    />
                </div>
                <div className="form-group">
                    <FormsySelect
                        name='status'
                        value={status}
                        dataSource={STATUSES}
                        label={ROOM_TYPE_TEXT_CONFIG.ROOM_TYPE_STATUS_FIELD_LBL}
                        required
                        validationError={ROOM_TYPE_TEXT_CONFIG.REQUIRED_FIELD_MSG}
                    />
                </div>
                <div className="form-group">
                    <div className="col-sm-12 d-flex justify-content-end">
                        <LoaderButton
                            type="button"
                            className="mr-5"
                            onClick={() => onClose(false)}
                        >
                            {ROOM_TYPE_TEXT_CONFIG.ROOM_TYPE_CLOSE_BTN}
                        </LoaderButton>

                        <LoaderButton
                            type="submit"
                            disabled={!isValid}
                            isLoading={isLoading}
                        >
                            {ROOM_TYPE_TEXT_CONFIG.ROOM_TYPE_SUBMIT_BTN}
                        </LoaderButton>
                    </div>
                </div>
            </div>
        </Formsy>
    )
}

export default RoomTypeForm;