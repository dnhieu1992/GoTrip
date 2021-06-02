import PropTypes from 'prop-types';
import { Button, FormGroup, Input, Label, Row, Select } from '../../../shared/components';
import { ROOM_NAME_TEXT_CONFIG } from '../constants/resources';
import { STATUSES } from '../constants/roomName';

const RoomNameSearch = ({
    searchParam,
    onHandleSearchChange,
    onHandleSearch,
    onHandleResetForm,
    roomTypes
}) => {
    console.log(roomTypes)
    const {
        name = '',
        roomTypeId = '',
        status = ''
    } = searchParam;

    const onHandleFieldChange = (e) => {
        if (e?.target) {
            onHandleSearchChange({
                ...searchParam,
                [e.target.name]: e.target.value
            });
        }
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
            <form className="form-horizontal" autoComplete="off">
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-6">
                            <FormGroup as={Row}>
                                <Label className="col-sm-2">
                                    {ROOM_NAME_TEXT_CONFIG.ROOM_NAME_NAME_FIELD_LBL}
                                </Label>
                                <div className="col-sm-10">
                                    <Input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder={ROOM_NAME_TEXT_CONFIG.ROOM_NAME_NAME_FIELD_LBL}
                                        value={name}
                                        onChange={onHandleFieldChange}
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
                                    <Select
                                        inputProps={{ name: 'roomTypeId' }}
                                        value={roomTypeId}
                                        onChange={onHandleFieldChange}
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
                                    <Select
                                        inputProps={{ name: 'status' }}
                                        value={status}
                                        onChange={onHandleFieldChange}
                                        dataSource={STATUSES}
                                    />
                                </div>
                            </FormGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 d-flex justify-content-end">
                            <Button
                                variant="info"
                                className="mr-3"
                                onClick={() => onHandleSearch(searchParam)}
                            >
                                {ROOM_NAME_TEXT_CONFIG.ROOM_NAME_SEARCH_BTN}
                            </Button>
                            <Button
                                variant="info"
                                onClick={onHandleResetForm}
                            >
                                {ROOM_NAME_TEXT_CONFIG.ROOM_NAME_RESET_BTN}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default RoomNameSearch;

RoomNameSearch.propTypes = {
    searchParam: PropTypes.object,
    onHandleSearchChange: PropTypes.func.isRequired,
    onHandleSearch: PropTypes.func.isRequired,
    onHandleResetForm: PropTypes.func.isRequired
}

RoomNameSearch.defaultProps = {
    searchParam: {}
}