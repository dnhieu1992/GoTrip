import Formsy from 'formsy-react';
import { useState } from 'react';
import { FormsyElement, LoaderButton } from '../../../shared/components';
import { STATUSES } from '../constants/propertyType';
import { PROPERTYTYPE_TEXT_CONFIG } from '../constants/resources';

const {
    FormsyInput,
    FormsySelect
} = FormsyElement

const PropertyTypeForm = ({
    propertyType,
    onClose,
    onSavePropertyType,
    properties,
    isLoading
}) => {
    const [isValid, setIsValid] = useState(true);

    const {
        name,
        property,
        description,
        status
    } = propertyType;

    const submit = (modal) => {
        onSavePropertyType(modal);
    }

    const enableButton = () => {
        setIsValid(true);
    }

    const disableButton = () => {
        setIsValid(false);
    }

    const data = properties.map(property => {
        return {
            value: property._id,
            label: property.name
        }
    })

    data.unshift({
        value: '',
        label: ''
    })

    return (
        <Formsy
            id="addNew"
            onSubmit={submit}
            onValid={enableButton}
            onInvalid={disableButton}
        >
            <div className="card-body">
                <div className="form-group">
                    <FormsyInput
                        inputProps={{
                            id: 'name',
                            type: 'text',
                            placeholder: PROPERTYTYPE_TEXT_CONFIG.PROPERTYTYPE_NAME_FIELD_LBL,
                        }}
                        name="name"
                        label={PROPERTYTYPE_TEXT_CONFIG.PROPERTYTYPE_NAME_FIELD_LBL}
                        value={name}
                        required
                        validationError={PROPERTYTYPE_TEXT_CONFIG.REQUIRED_FIELD_MSG}
                    />
                </div>
                <div className="form-group">
                    <FormsyInput
                        inputProps={{
                            id: 'description',
                            type: 'text',
                            placeholder: PROPERTYTYPE_TEXT_CONFIG.PROPERTYTYPE_DESCRIPTION_FIELD_LBL
                        }}
                        name="description"
                        label={PROPERTYTYPE_TEXT_CONFIG.PROPERTYTYPE_DESCRIPTION_FIELD_LBL}
                        value={description}
                        required
                        validationError={PROPERTYTYPE_TEXT_CONFIG.REQUIRED_FIELD_MSG}
                    />
                </div>
                <div className="form-group">
                    <FormsySelect
                        name='propertyId'
                        value={property}
                        dataSource={data}
                        label={PROPERTYTYPE_TEXT_CONFIG.PROPERTYTYPE_PROPERTY_FIELD_LBL}
                        required
                        validationError={PROPERTYTYPE_TEXT_CONFIG.REQUIRED_FIELD_MSG}

                    />

                    {/* <label>Property</label>
                    <select
                        className={classNames("form-control", { "is-invalid": propertyTypePropertyErrorMsg })}
                        aria-label="Default select example"
                        name="propertyId"
                        value={property._id}
                        onChange={onHandlePropertyChange}>
                        <option value=""></option>
                        {
                            properties.map(property => {
                                console.log(property)
                                return (
                                    <option key={property._id} value={property._id}>{property.name}</option>
                                )
                            })
                        }
                    </select>
                    {propertyTypePropertyErrorMsg && (
                        <div className="invalid-feedback">
                            {propertyTypePropertyErrorMsg}
                        </div>
                    )} */}
                </div>
                <div className="form-group">
                    <FormsySelect
                        name='status'
                        value={status}
                        dataSource={STATUSES}
                        label={PROPERTYTYPE_TEXT_CONFIG.PROPERTYTYPE_STATUS_FIELD_LBL}
                        required
                        validationError={PROPERTYTYPE_TEXT_CONFIG.REQUIRED_FIELD_MSG}
                    />
                </div>
                <div className="form-group">
                    <div className="col-sm-12 d-flex justify-content-end">
                        <LoaderButton
                            type="button"
                            className="btn btn-danger mr-5"
                            onClick={() => onClose(false)}
                        >
                            {PROPERTYTYPE_TEXT_CONFIG.PROPERTYTYPE_CLOSE_BTN}
                        </LoaderButton>
                        <LoaderButton
                            type="submit"
                            className="btn btn-info"
                            disabled={!isValid}
                            isLoading={isLoading}
                        >
                            {PROPERTYTYPE_TEXT_CONFIG.PROPERTYTYPE_SUBMIT_BTN}
                        </LoaderButton>
                    </div>
                </div>
            </div>
        </Formsy>
    );
}

export default PropertyTypeForm