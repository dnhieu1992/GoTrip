import PropTypes from 'prop-types';
import { STATUSES } from '../constants/country';
import { Input, Label, FormGroup, Button, Select, Row } from '../../../shared/components/index';
import Formsy from 'formsy-react';
import { FormsyElement, LoaderButton } from '../../../shared/components/index.js';
import { COUNTRY_TEXT_CONFIG } from '../constants/resources';

const {
    FormsyInput,
    FormsySelect
} = FormsyElement

const CountrySearch = ({
    searchParam,
    onHandleSearchChange,
    onHandleSearch,
    onHandleResetForm,
}) => {
    const {
        name,
        code,
        status
    } = searchParam;

    return (
        <div className="card card-info">
            <div className="card-header">
                <h3 className="card-title">{COUNTRY_TEXT_CONFIG.COUNTRY_SEARCH_HEADER_LBL}</h3>
            </div>
            <Formsy className="form-horizontal" autoComplete="off" onSubmit={onHandleSearch}>
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
                                        value={name}
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
                                        value={code}
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
                                        value={status}
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
                                onClick={onHandleResetForm}
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
    searchParam: PropTypes.shape({
        name: PropTypes.string,
        code: PropTypes.string,
        status: PropTypes.string,
    }),
    onHandleSearchChange: PropTypes.func.isRequired,
    onHandleSearch: PropTypes.func.isRequired,
    onHandleResetForm: PropTypes.func.isRequired,
};

CountrySearch.defaultProps = {
    searchParam: {
        name: '',
        code: '',
        status: ''
    },
};

export default CountrySearch;
