import PropTypes from 'prop-types';
import { STATUSES } from '../constants/country';
import { Input, Label, FormGroup, Button, Select, Row } from '../../../shared/components/index';
import { COUNTRY_TEXT_CONFIG } from '../constants/resources';

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
    console.log(name, code, status, searchParam);

    const onHandleFieldChange = (e) => {
        if (e?.target) {
            onHandleSearchChange({
                ...searchParam,
                [e.target.name]: e.target.value
            });
        }
    };

    return (
        <div className="card card-info">
            <div className="card-header">
                <h3 className="card-title">{COUNTRY_TEXT_CONFIG.COUNTRY_SEARCH_HEADER_LBL}</h3>
            </div>
            <form className="form-horizontal" autoComplete="off">
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-6">
                            <FormGroup as={Row}>
                                <Label className="col-sm-2">
                                    {COUNTRY_TEXT_CONFIG.COUNTRY_NAME_FIELD_LBL}
                                </Label>
                                <div className="col-sm-10">
                                    <Input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder={COUNTRY_TEXT_CONFIG.COUNTRY_NAME_FIELD_LBL}
                                        value={name}
                                        onChange={onHandleFieldChange}
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
                                    <Input
                                        type="text"
                                        id="countryCode"
                                        name="code"
                                        placeholder={COUNTRY_TEXT_CONFIG.COUNTRY_CODE_FIELD_LBL}
                                        value={code}
                                        onChange={onHandleFieldChange}
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
            </form>
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
