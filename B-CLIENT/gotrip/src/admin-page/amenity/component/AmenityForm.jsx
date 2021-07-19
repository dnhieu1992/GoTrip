import { useState } from 'react';
import Formsy from 'formsy-react';
import { FormsyElement, LoaderButton } from '../../../shared/components/index.js';
import { STATUSES } from '../constants/amenity';
import { AMENITY_TEXT_CONFIG } from '../constants/resources';

const {
    FormsyInput,
    FormsySelect
} = FormsyElement

const AmenityForm = ({
    amenity,
    amenityCategories,
    isLoading,
    onClose,
    onSaveAmenity
}) => {
    const [isValid, setIsValid] = useState(true);

    const {
        name,
        description,
        status
    } = amenity;

    const data = amenityCategories.map(amenityCategory => {
        return {
            value: amenityCategory._id,
            label: amenityCategory.name
        }
    })

    data.unshift({
        value: '',
        label: 'Choose the amenity category...'
    })

    const onSubmit = (modal) => {
        onSaveAmenity(modal);
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
                            placeholder: AMENITY_TEXT_CONFIG.AMENITY_NAME_FIELD_LBL,
                        }}
                        name="name"
                        label={AMENITY_TEXT_CONFIG.AMENITY_NAME_FIELD_LBL}
                        value={name}
                        required
                        validationError={AMENITY_TEXT_CONFIG.REQUIRED_FIELD_MSG}
                    />
                </div>
                <div className="form-group">
                    <FormsyElement.FormsyTextarea
                        textareaProps={{
                            id: 'description',
                            type: 'text',
                            placeholder: AMENITY_TEXT_CONFIG.AMENITY_DESCRIPTION_FIELD_LBL,
                        }}
                        name="description"
                        label={AMENITY_TEXT_CONFIG.AMENITY_DESCRIPTION_FIELD_LBL}
                        value={description}
                        required
                        validationError={AMENITY_TEXT_CONFIG.REQUIRED_FIELD_MSG}
                    >
                    </FormsyElement.FormsyTextarea>
                </div>
                <div className="form-group">
                    <FormsySelect
                        name='amenityCategoryId'
                        value={amenity?.amenityCategory?._id}
                        dataSource={data}
                        label={AMENITY_TEXT_CONFIG.AMENITY_AMENITYCATEGORYID_FIELD_LBL}
                        required
                        validationError={AMENITY_TEXT_CONFIG.REQUIRED_FIELD_MSG}
                    />
                </div>
                <div className="form-group">
                    <FormsySelect
                        name='status'
                        value={status}
                        dataSource={STATUSES}
                        label={AMENITY_TEXT_CONFIG.AMENITY_STATUS_FIELD_LBL}
                        required
                        validationError={AMENITY_TEXT_CONFIG.REQUIRED_FIELD_MSG}
                    />
                </div>
                <div className="form-group">
                    <div className="col-sm-12 d-flex justify-content-end">
                        <LoaderButton
                            type="button"
                            className="btn btn-danger mr-5"
                            onClick={() => onClose(false)}
                        >
                            {AMENITY_TEXT_CONFIG.AMENITY_CLOSE_BTN}
                        </LoaderButton>
                        <LoaderButton
                            type="submit"
                            disabled={!isValid}
                            isLoading={isLoading}
                        >
                            {AMENITY_TEXT_CONFIG.AMENITY_SUBMIT_BTN}
                        </LoaderButton>
                    </div>
                </div>
            </div>
        </Formsy>
    );
};

export default AmenityForm;