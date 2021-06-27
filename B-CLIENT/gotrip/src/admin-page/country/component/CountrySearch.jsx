import { useRef } from 'react';
import PropTypes from 'prop-types';
import { STATUSES } from '../constants/country';
import { Label, FormGroup, Button, Row } from '../../../shared/components/index';
import Formsy from 'formsy-react';
import { FormsyElement } from '../../../shared/components/index.js';
import { COUNTRY_TEXT_CONFIG } from '../constants/resources';

const {
    FormsyInput,
    FormsySelect
} = FormsyElement

const CountrySearch = ({
    onHandleSearch,
    options,
}) => {
    const formRef = useRef();

    const onReset = () => {
        const resetParamsValue = { name: '', code: '', status: '' };
        formRef.current.updateInputsWithValue(resetParamsValue);
        onHandleSearch(resetParamsValue, { ...options, pageNumber: 1 });
    }

    return (
        <div className="card card-info">
            <div className="card-header">
                <h3 className="card-title">{COUNTRY_TEXT_CONFIG.COUNTRY_SEARCH_HEADER_LBL}</h3>
            </div>
            <Formsy className="form-horizontal" autoComplete="off" onSubmit={onHandleSearch} ref={formRef}>
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-6">
                            <FormGroup as={Row}>
                                <Label className="col-sm-2">
                                    {COUNTRY_TEXT_CONFIG.COUNTRY_NAME_FIELD_LBL}
                                </Label>
                                <div className="col-sm-10">
                                    <FormsyInput
                                        inputProps={{
                                            id: 'name',
                                            type: 'text',
                                            placeholder: COUNTRY_TEXT_CONFIG.COUNTRY_NAME_FIELD_LBL,
                                        }}
                                        name="name"
                                    />
                                </div>
                            </FormGroup>
                        </div>
                        <div className="col-sm-6">
                            <FormGroup as={Row}>
                                <Label className="col-sm-2">
                                    {COUNTRY_TEXT_CONFIG.COUNTRY_CODE_FIELD_LBL}
                                </Label>
                                <div className="col-sm-10">
                                    <FormsyInput
                                        inputProps={{
                                            id: 'countryCode',
                                            type: 'text',
                                            placeholder: COUNTRY_TEXT_CONFIG.COUNTRY_CODE_FIELD_LBL,
                                        }}
                                        name="code"
                                    />
                                </div>
                            </FormGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <FormGroup as={Row}>
                                <Label className="col-sm-2">
                                    {COUNTRY_TEXT_CONFIG.COUNTRY_STATUS_FIELD_LBL}
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
                                {COUNTRY_TEXT_CONFIG.COUNTRY_SEARCH_BTN}
                            </Button>
                            <Button
                                variant="info"
                                onClick={onReset}
                            >
                                {COUNTRY_TEXT_CONFIG.COUNTRY_RESET_BTN}
                            </Button>
                        </div>
                    </div>
                </div>
            </Formsy>
        </div>
    );
};

CountrySearch.propTypes = {
    onHandleSearch: PropTypes.func.isRequired,
    options: PropTypes.object,
};

CountrySearch.defaultProps = {
    options: {}
};

export default CountrySearch;
