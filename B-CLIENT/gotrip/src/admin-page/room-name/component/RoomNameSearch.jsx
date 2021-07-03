import Formsy from 'formsy-react';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import { Button, FormGroup, FormsyElement, Label, Row, } from '../../../shared/components';
import { ROOM_NAME_TEXT_CONFIG } from '../constants/resources';
import { STATUSES } from '../constants/roomName';

const {
    FormsyInput,
    FormsySelect
} = FormsyElement;

const RoomNameSearch = ({
    onHandleSearch,
    options,
    roomTypes
}) => {
    const formRef = useRef();

    const onReset = () => {
        const resetParamsValue = {
            name: '',
            roomTypeId: '',
            status: ''
        }
        formRef.current.updateInputsWithValue(resetParamsValue);
        onHandleSearch(resetParamsValue, { ...options, pageNumber: 1 });
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
        <div className="card card-info">
            <div className="card-header">
                <h3 className="card-title">{ROOM_NAME_TEXT_CONFIG.ROOM_NAME_SEARCH_HEADER_LBL}</h3>
            </div>
            <Formsy className="form-horizontal" autoComplete="off" onSubmit={onHandleSearch} ref={formRef}>
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-6">
                            <FormGroup as={Row}>
                                <Label className="col-sm-2">
                                    {ROOM_NAME_TEXT_CONFIG.ROOM_NAME_NAME_FIELD_LBL}
                                </Label>
                                <div className="col-sm-10">
                                    <FormsyInput
                                        inputProps={{
                                            type: "text",
                                            id: "name",
                                            placeholder: ROOM_NAME_TEXT_CONFIG.ROOM_NAME_NAME_FIELD_LBL

                                        }}
                                        name="name"
                                    />
                                </div>
                            </FormGroup>
                        </div>
                        <div className="col-sm-6">
                            <FormGroup as={Row}>
                                <Label className="col-sm-2">
                                    {ROOM_NAME_TEXT_CONFIG.ROOM_NAME_ROOM_TYPE_FIELD_LBL}
                                </Label>
                                <div className="col-sm-10">
                                    <FormsySelect
                                        name='roomTypeId'
                                        dataSource={data}
                                    />
                                </div>
                            </FormGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <FormGroup as={Row}>
                                <Label className="col-sm-2" >
                                    {ROOM_NAME_TEXT_CONFIG.ROOM_NAME_STATUS_FIELD_LBL}
                                </Label>
                                <div className="col-sm-10">
                                    <FormsySelect
                                        name='status'
                                        dataSource={STATUSES}
                                    />
                                </div>
                            </FormGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 d-flex justify-content-end">
                            <Button
                                type="submit"
                                variant="info"
                                className="mr-3"
                            >
                                {ROOM_NAME_TEXT_CONFIG.ROOM_NAME_SEARCH_BTN}
                            </Button>
                            <Button
                                variant="info"
                                onClick={onReset}
                            >
                                {ROOM_NAME_TEXT_CONFIG.ROOM_NAME_RESET_BTN}
                            </Button>
                        </div>
                    </div>
                </div>
            </Formsy>
        </div>
    )
}

export default RoomNameSearch;

RoomNameSearch.propTypes = {
    onHandleSearch: PropTypes.func.isRequired,
    options: PropTypes.object,
    roomTypes: PropTypes.array
}

RoomNameSearch.defaultProps = {
    options: {},
    roomTypes: []
}