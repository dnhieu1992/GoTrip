import Formsy from 'formsy-react';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import { STATUSES } from '../constants/city';
import { Input, Label, FormGroup, Button, FormsyElement, Select, Row } from '../../../shared/components/index';
import { CITY_TEXT_CONFIG } from '../constants/resources';

const {
    FormsyInput,
    FormsySelect
} = FormsyElement;

const CitySearch = ({
    options,
    countries,
    onHandleSearch
}) => {
    const formRef = useRef();

    const onReset = () => {
        formRef.current.updateInputsWithValue({
            name: '',
            status: '',
            contryId: ''
        });
        onHandleSearch({
            name: '',
            status: '',
            countryId: ''
        }, { ...options, pageNumber: 1 })
    }

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

    return (
        <div className="card card-info">
            <div className="card-header">
                <h3 className="card-title">{CITY_TEXT_CONFIG.CITY_SEARCH_HEADER_LBL}</h3>
            </div>
            <Formsy className="form-horizontal" autoComplete="off" onSubmit={onHandleSearch} ref={formRef}>
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-6">
                            <FormGroup as={Row}>
                                <Label className="col-sm-2">
                                    {CITY_TEXT_CONFIG.CITY_NAME_FIELD_LBL}
                                </Label>
                                <div className="col-sm-10">
                                    <FormsyInput
                                        inputProps={{
                                            type: 'text',
                                            id: 'name',
                                            placeholder: CITY_TEXT_CONFIG.CITY_NAME_FIELD_LBL
                                        }}
                                        name="name"
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
                                    <FormsySelect
                                        name='countryId'
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
                                {CITY_TEXT_CONFIG.CITY_SEARCH_BTN}
                            </Button>
                            <Button
                                variant="info"
                                onClick={onReset}
                            >
                                {CITY_TEXT_CONFIG.CITY_RESET_BTN}
                            </Button>
                        </div>
                    </div>
                </div>
            </Formsy>
        </div>
    )
}
export default CitySearch;

CitySearch.propTypes = {
    options: PropTypes.object,
    onHandleSearch: PropTypes.func.isRequired
};

CitySearch.defaultProps = {
    options: {},
    countries: {},
};