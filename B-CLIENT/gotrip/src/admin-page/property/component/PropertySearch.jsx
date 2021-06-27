import { useRef } from 'react';
import PropTypes from 'prop-types';
import { Button, FormGroup, Input, Label, Row, Select } from '../../../shared/components/index';
import { STATUSES } from '../constants/property';
import { PROPERTY_TEXT_CONFIG } from '../constants/resources';
import Formsy from 'formsy-react';
import { FormsyElement } from '../../../shared/components/index.js';
const {
    FormsyInput,
    FormsySelect
} = FormsyElement

const PropertySearch = ({
    onHandleSearch,
    options
}) => {
    const onReset = () => {
        formRef.current.updateInputsWithValue({
            name: '',
            code: '',
            status: ''
        });
        onHandleSearch({ name: '', status: '' }, { ...options, pageNumber: 1 });
    }

    const formRef = useRef();
    return (
        <div className="card card-info">
            <div className="card-header">
                <h3 className="card-title">{PROPERTY_TEXT_CONFIG.PROPERTY_SEARCH_HEADER_LBL}</h3>
            </div>
            {/* <form className="form-horizontal" autoComplete="off">
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-6">
                            <FormGroup as={Row}>
                                <Label className="col-sm-2">
                                    {PROPERTY_TEXT_CONFIG.PROPERTY_NAME_FIELD_LBL}
                                </Label>
                                <div className="col-sm-10">
                                    <Input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder={PROPERTY_TEXT_CONFIG.PROPERTY_NAME_FIELD_LBL}
                                        value={name}
                                        onChange={onHandleFieldChange}
                                    />
                                </div>
                            </FormGroup>
                        </div>
                        <div className="col-sm-6">
                            <FormGroup as={Row}>
                                <Label className="col-sm-2">
                                    {PROPERTY_TEXT_CONFIG.PROPERTY_STATUS_FIELD_LBL}
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
                                className='mr-3'
                                onClick={() => onHandleSearch(searchParam)}
                            >
                                {PROPERTY_TEXT_CONFIG.PROPERTY_SEARCH_BTN}
                            </Button>
                            <Button
                                variant="info"
                                onClick={onHandleResetForm}
                            >
                                {PROPERTY_TEXT_CONFIG.PROPERTY_RESET_BTN}
                            </Button>
                        </div>
                    </div>
                </div>
            </form> */}
            <Formsy className="form-horizontal" autoComplete="off" onSubmit={onHandleSearch} ref={formRef}>
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-6">
                            <FormGroup as={Row}>
                                <Label className="col-sm-2">
                                    {PROPERTY_TEXT_CONFIG.PROPERTY_NAME_FIELD_LBL}
                                </Label>
                                <div className="col-sm-10">
                                    <FormsyInput
                                        inputProps={{
                                            id: 'name',
                                            type: 'text',
                                            placeholder: PROPERTY_TEXT_CONFIG.PROPERTY_NAME_FIELD_LBL,
                                        }}
                                        name="name"
                                    />
                                </div>
                            </FormGroup>
                        </div>
                        <div className="col-sm-6">
                            <FormGroup as={Row}>
                                <Label className="col-sm-2">
                                    {PROPERTY_TEXT_CONFIG.PROPERTY_STATUS_FIELD_LBL}
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
                                className='mr-3'
                            >
                                {PROPERTY_TEXT_CONFIG.PROPERTY_SEARCH_BTN}
                            </Button>
                            <Button
                                variant="info"
                                onClick={onReset}
                            >
                                {PROPERTY_TEXT_CONFIG.PROPERTY_RESET_BTN}
                            </Button>
                        </div>
                    </div>
                </div>
            </Formsy>
        </div>
    )
}
export default PropertySearch;

PropertySearch.propTypes = {
    options: PropTypes.object,
    onHandleSearch: PropTypes.func.isRequired,
}

PropertySearch.defaultProps = {
    options: {},
}