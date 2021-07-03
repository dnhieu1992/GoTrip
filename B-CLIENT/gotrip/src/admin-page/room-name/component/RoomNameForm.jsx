import Formsy from "formsy-react";
import { useState } from "react";
import { FormsyElement, LoaderButton } from "../../../shared/components";
import { ROOM_NAME_TEXT_CONFIG } from "../constants/resources";
import { STATUSES } from "../constants/roomName";
import PropTypes from 'prop-types';

const {
    FormsyInput,
    FormsySelect
} = FormsyElement

const RoomNameForm = ({
    roomName,
    onClose,
    onSaveRoomName,
    roomTypes,
    isLoading
}) => {
    const [isValid, setIsValid] = useState(true);

    const {
        name,
        description,
        status
    } = roomName;

    const onSubmit = (modal) => {
        onSaveRoomName(modal);
    }

    const onValid = () => {
        setIsValid(true);
    }

    const onInValid = () => {
        setIsValid(false);
    }

    const data = roomTypes.map(roomType => {
        return {
            value: roomType._id,
            label: roomType.name
        }
    })
    data.unshift({
        value: '',
        label: ''
    })

    return (
        <Formsy
            id="addNew"
            onSubmit={onSubmit}
            onValid={onValid}
            onInValid={onInValid}
        >
            <div className="card-body">
                <div className="form-group">
                    <FormsyInput
                        inputProps={{
                            id: 'name',
                            type: 'text',
                            placeholder: ROOM_NAME_TEXT_CONFIG.ROOM_NAME_NAME_FIELD_LBL,
                        }}
                        name="name"
                        label={ROOM_NAME_TEXT_CONFIG.ROOM_NAME_NAME_FIELD_LBL}
                        value={name}
                        required
                        validationError={ROOM_NAME_TEXT_CONFIG.REQUIRED_FIELD_MSG}
                    />
                </div>
                <div className="form-group">
                    <FormsySelect
                        name='roomTypeId'
                        value={roomName?.roomType?._id}
                        dataSource={data}
                        label={ROOM_NAME_TEXT_CONFIG.ROOM_NAME_ROOM_TYPE_FIELD_LBL}
                        required
                        validationError={ROOM_NAME_TEXT_CONFIG.REQUIRED_FIELD_MSG}
                    />
                </div>
                <div className="form-group">
                    <FormsySelect
                        name='status'
                        value={status}
                        dataSource={STATUSES}
                        label={ROOM_NAME_TEXT_CONFIG.ROOM_NAME_STATUS_FIELD_LBL}
                        required
                        validationError={ROOM_NAME_TEXT_CONFIG.REQUIRED_FIELD_MSG}
                    />
                </div>
                <div className="form-group">
                    <div className="col-sm-12 d-flex justify-content-end">
                        <LoaderButton
                            type="button"
                            className="btn btn-danger mr-5"
                            onClick={() => onClose(false)}
                        >
                            {ROOM_NAME_TEXT_CONFIG.ROOM_NAME_CLOSE_BTN}
                        </LoaderButton>
                        <LoaderButton
                            type="submit"
                            className="btn btn-info"
                            disabled={!isValid}
                            isLoading={isLoading}
                        >
                            {ROOM_NAME_TEXT_CONFIG.ROOM_NAME_SUBMIT_BTN}
                        </LoaderButton>
                    </div>
                </div>
            </div>
        </Formsy>
    );
}

export default RoomNameForm;

RoomNameForm.propTypes = {
    roomTypes: PropTypes.array
}

RoomNameForm.defaulProps = {
    roomTypes: []
}

