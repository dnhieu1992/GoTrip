import Formsy from 'formsy-react';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import { Button, FormGroup, FormsyElement, Label, Row } from '../../../shared/components/index.js';
import { ROOM_TYPE_TEXT_CONFIG } from '../constants/resources';
import { STATUSES } from '../constants/roomType.js';

const {
    FormsyInput,
    FormsySelect
} = FormsyElement

const RoomTypeSearch = ({
    onHandleSearch,
    options
}) => {
    const formRef = useRef();

    const onReset = () => {
        const resetParamsValue = { name: '', status: '' }
        formRef.current.updateInputsWithValue(resetParamsValue);
        onHandleSearch(resetParamsValue, { ...options, pageNumber: 1 });
    }
    return (
        <div className="card card-info">
            <div className="card-header">
                <h3 className="card-title">{ROOM_TYPE_TEXT_CONFIG.ROOM_TYPE_SEARCH_HEADER_LBL}</h3>
            </div>
            <Formsy className="form-horizontal" autoComplete="off" onSubmit={onHandleSearch} ref={formRef}>
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-6">
                            <FormGroup as={Row}>
                                <Label className="col-sm-2">
                                    {ROOM_TYPE_TEXT_CONFIG.ROOM_TYPE_NAME_FIELD_LBL}
                                </Label>
                                <div className="col-sm-10">
                                    <FormsyInput
                                        inputProps={{
                                            type: "text",
                                            id: "name",
                                            placeholder: ROOM_TYPE_TEXT_CONFIG.ROOM_TYPE_NAME_FIELD_LBL
                                        }}

                                        name="name"
                                    />
                                </div>
                            </FormGroup>
                        </div>
                        <div className="col-sm-6">
                            <FormGroup as={Row}>
                                <Label className="col-sm-2">
                                    {ROOM_TYPE_TEXT_CONFIG.ROOM_TYPE_STATUS_FIELD_LBL}
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
                                {ROOM_TYPE_TEXT_CONFIG.ROOM_TYPE_SEARCH_BTN}
                            </Button>
                            <Button
                                variant="info"
                                onClick={onReset}
                            >
                                {ROOM_TYPE_TEXT_CONFIG.ROOM_TYPE_RESET_BTN}
                            </Button>
                        </div>
                    </div>
                </div>
            </Formsy>
        </div>
    )
}

export default RoomTypeSearch;

RoomTypeSearch.propTypes = {
    onHandleSearch: PropTypes.func.isRequired,
    options: PropTypes.object
}

RoomTypeSearch.defaultProps = {
    options: {},
}