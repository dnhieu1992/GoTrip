import Formsy from 'formsy-react';
import { useState } from 'react';
import { FormsyElement, LoaderButton } from '../../../shared/components';
import { STATUSES } from '../constants/amenityCategory';
import { AMENITY_CATEGORY_TEXT_CONFIG } from '../constants/resources';

const {
    FormsyInput,
    FormsySelect
}=FormsyElement

const AmenityCategoryForm=({
    amenityCategory,
    onClose,
    onSaveAmenityCategory,
    isLoading
})=>{
    const [isValid, setIsValid] = useState(true);

    const {
        name,
        description,
        status
    } = amenityCategory;

    const onSubmit = (modal)=>{
        onSaveAmenityCategory(modal);
    }

    const onValid=()=>{
        setIsValid(true);
    }

    const onInvalid=()=>{
        setIsValid(false);
    }

    return(
        <Formsy
            id="addMew"
            onSubmit={onSubmit}
            onValid={onValid}
            onInvalid={onInvalid}
        >
            <div className="card-body">
                <div className="form-group">
                    <FormsyInput
                        inputProps={{
                            id: 'name',
                            type: 'text',
                            placeholder: AMENITY_CATEGORY_TEXT_CONFIG.AMENITY_CATEGORY_NAME_FIELD_LBL,
                        }}
                        name="name"
                        label={AMENITY_CATEGORY_TEXT_CONFIG.AMENITY_CATEGORY_NAME_FIELD_LBL}
                        value={name}
                        required
                        validationError={AMENITY_CATEGORY_TEXT_CONFIG.REQUIRED_FIELD_MSG}
                    />
                </div>
                <div className="form-group">
                    <FormsyInput
                        inputProps={{
                            id: 'description',
                            type: 'text',
                            placeholder: AMENITY_CATEGORY_TEXT_CONFIG.AMENITY_CATEGORY_DESCRIPTION_FIELD_LBL,
                        }}
                        name='description'
                        label={AMENITY_CATEGORY_TEXT_CONFIG.AMENITY_CATEGORY_DESCRIPTION_FIELD_LBL}
                        value={description}
                        required
                        validationError={AMENITY_CATEGORY_TEXT_CONFIG.REQUIRED_FIELD_MSG}
                    />
                </div>
                <div className="form-group">
                    <FormsySelect
                        name='status'
                        value={status}
                        dataSource={STATUSES}
                        label={AMENITY_CATEGORY_TEXT_CONFIG.AMENITY_CATEGORY_STATUS_FIELD_LBL}
                        required
                        validationError={AMENITY_CATEGORY_TEXT_CONFIG.REQUIRED_FIELD_MSG}
                    />
                </div>
                <div className="form-group">
                    <div className="col-sm-12 d-flex justify-content-end">
                        <LoaderButton
                            type="button"
                            className="mr-5"
                            onClick={() => onClose(false)}
                        >
                            {AMENITY_CATEGORY_TEXT_CONFIG.AMENITY_CATEGORY_CLOSE_BTN}
                        </LoaderButton>

                        <LoaderButton
                            type="submit"
                            disabled={!isValid}
                            isLoading={isLoading}
                        >
                            {AMENITY_CATEGORY_TEXT_CONFIG.AMENITY_CATEGORY_SUBMIT_BTN}
                        </LoaderButton>
                    </div>
                </div>
            </div>
        </Formsy>
    )
}

export default AmenityCategoryForm