import Formsy from 'formsy-react';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import { STATUSES } from '../constants/bed';
import { Input, Label, FormGroup, FormsyElement, Button, Select, Row } from '../../../shared/components/index';
import { BED_TEXT_CONFIG } from '../constants/resources';

const {
    FormsyInput,
    FormsySelect,
    FormsyTextarea
} = FormsyElement;

const BedSearch = ({
    options,
    onHandleSearch
}) => {
    const formRef = useRef();

    const onReset = () => {
        formRef.current.updateInputsWithValue({
            name: '',
            description: '',
            status: ''
        });
        onHandleSearch({
            name: '',
            description: '',
            status: ''
        }, { ...options, pageNumber: 1 })
    }

    return (
        <div className="card card-info">
            <div className="card-header">
                <h3 className="card-title">{BED_TEXT_CONFIG.BED_SEARCH_HEADER_LBL}</h3>
            </div>
            <Formsy className="form-horizontal" autoComplete="off" onSubmit={onHandleSearch} ref={formRef}>
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-6">
                            <FormGroup as={Row}>
                                <Label className="col-sm-2">
                                    {BED_TEXT_CONFIG.BED_NAME_FIELD_LBL}
                                </Label>
                                <div className="col-sm-10">
                                    <FormsyInput
                                        inputProps={{
                                            type: 'text',
                                            id: 'name',
                                            placeholder: BED_TEXT_CONFIG.BED_NAME_FIELD_LBL
                                        }}
                                        name="name"
                                    />
                                </div>
                            </FormGroup>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group row">
                                <Label className="col-sm-2">
                                    {BED_TEXT_CONFIG.BED_DESCRIPTION_FIELD_LBL}
                                </Label>
                                <div className="col-sm-10">
                                    <FormsyTextarea
                                        textareaProps={{
                                            id: 'description',
                                            type: 'text',
                                            placeholder: BED_TEXT_CONFIG.BED_DESCRIPTION_FIELD_LBL,
                                        }}
                                        name="description"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <FormGroup as={Row}>
                                <Label className="col-sm-2">
                                    {BED_TEXT_CONFIG.BED_STATUS_FIELD_LBL}
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
                                variant="info"
                                className="mr-3"
                                type="submit"
                            >
                                {BED_TEXT_CONFIG.BED_SEARCH_BTN}
                            </Button>
                            <Button
                                variant="info"
                                onClick={onReset}
                            >
                                {BED_TEXT_CONFIG.BED_RESET_BTN}
                            </Button>
                        </div>
                    </div>
                </div>
            </Formsy>
        </div>
    )
};

export default BedSearch;

BedSearch.propTypes = {
    options: PropTypes.object,
    onHandleSearch: PropTypes.func.isRequired
};

BedSearch.defaultProps = {
    options: {}
};