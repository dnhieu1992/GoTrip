import { useState } from 'react';
import Formsy from 'formsy-react';
import { FormsyElement, LoaderButton } from '../../../shared/components/index.js';
import { STATUSES } from '../constants/city';
import { CITY_TEXT_CONFIG } from '../constants/resources';
import PropTypes from 'prop-types';

const {
    FormsyInput,
    FormsySelect
} = FormsyElement

const CityForm = ({
    city,
    countries,
    isLoading,
    onClose,
    onSaveCity
}) => {
    const [isValid, setIsValid] = useState(true);

    const {
        name,
        status
    } = city;

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

    const onSubmit = (modal) => {
        onSaveCity(modal);
    }

    const onValid = () => {
        setIsValid(true);
    }

    const onInvalid = () => {
        setIsValid(false);
    }

    return (
        <Formsy id="addNew" onSubmit={onSubmit} onValid={onValid} onInvalid={onInvalid}>
            <div className="card-body">
                <div className="form-group">
                    <FormsyInput
                        inputProps={{
                            id: 'name',
                            type: 'text',
                            placeholder: CITY_TEXT_CONFIG.CITY_NAME_FIELD_LBL,
                        }}
                        name="name"
                        label={CITY_TEXT_CONFIG.CITY_NAME_FIELD_LBL}
                        value={name}
                        required
                        validationError={CITY_TEXT_CONFIG.REQUIRED_FIELD_MSG}
                    />
                </div>
                <div className="form-group">
                    <FormsySelect
                        name='countryId'
                        value={city?.country?._id}
                        dataSource={data}
                        label={CITY_TEXT_CONFIG.CITY_COUNTRYID_FIELD_LBL}
                        required
                        validationError={CITY_TEXT_CONFIG.REQUIRED_FIELD_MSG}
                    />
                </div>
                <div className="form-group">
                    <FormsySelect
                        name='status'
                        value={status}
                        dataSource={STATUSES}
                        label={CITY_TEXT_CONFIG.CITY_STATUS_FIELD_LBL}
                        required
                        validationError={CITY_TEXT_CONFIG.REQUIRED_FIELD_MSG}
                    />
                </div>
                <div className="form-group">
                    <div className="col-sm-12 d-flex justify-content-end">
                        <LoaderButton
                            type="button"
                            className="btn btn-danger mr-5"
                            onClick={() => onClose(false)}
                        >
                            {CITY_TEXT_CONFIG.CITY_CLOSE_BTN}
                        </LoaderButton>
                        <LoaderButton
                            type="submit"
                            disabled={!isValid}
                            isLoading={isLoading}
                        >
                            {CITY_TEXT_CONFIG.CITY_SUBMIT_BTN}
                        </LoaderButton>
                    </div>
                </div>
            </div>
        </Formsy>
    );
};

export default CityForm;