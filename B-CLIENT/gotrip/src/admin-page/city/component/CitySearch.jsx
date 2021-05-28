import PropTypes from 'prop-types';
import { STATUSES } from '../constants/city';
import { Input, Label, FormGroup, Button, Select, Row } from '../../../shared/components/index';
import { CITY_TEXT_CONFIG } from '../constants/resources';

const CitySearch = ({
    searchParam,
    countries,
    onHandleSearchChange,
    onHandleSearch,
    onHandleResetForm
}) => {
    const {
        name = '',
        countryId = '',
        status = ''
    } = searchParam;

    const data = countries.map(country => {
        return {
            value: country._id,
            label: country.name
        }
    })

    data.unshift({
        value: '',
        label: 'Choose the country...'
    })

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
                <h3 className="card-title">{CITY_TEXT_CONFIG.CITY_SEARCH_HEADER_LBL}</h3>
            </div>
            <form className="form-horizontal" autoComplete="off">
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-6">
                            <FormGroup as={Row}>
                                <Label className="col-sm-2">
                                    {CITY_TEXT_CONFIG.CITY_NAME_FIELD_LBL}
                                </Label>
                                <div className="col-sm-10">
                                    <Input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder={CITY_TEXT_CONFIG.CITY_NAME_FIELD_LBL}
                                        value={name}
                                        onChange={onHandleFieldChange}
                                    />
                                </div>
                            </FormGroup>
                        </div>
                        <div className="col-sm-6">
                            <FormGroup as={Row}>
                                <Label className="col-sm-2">
                                    {CITY_TEXT_CONFIG.CITY_COUNTRYID_FIELD_LBL}
                                </Label>
                                <div className="col-sm-10">
                                    <Select
                                        inputProps={{ name: 'countryId' }}
                                        value={countryId}
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
                                <Label className="col-sm-2">
                                    {CITY_TEXT_CONFIG.CITY_STATUS_FIELD_LBL}
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
                                {CITY_TEXT_CONFIG.CITY_SEARCH_BTN}
                            </Button>
                            <Button
                                variant="info"
                                onClick={onHandleResetForm}
                            >
                                {CITY_TEXT_CONFIG.CITY_RESET_BTN}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default CitySearch;

CitySearch.propTypes = {
    searchParam: PropTypes.object,
    onHandleSearchChange: PropTypes.func.isRequired,
    onHandleSearch: PropTypes.func.isRequired,
    onHandleResetForm: PropTypes.func.isRequired,
};

CitySearch.defaultProps = {
    searchParam: {},
};