import Formsy from 'formsy-react';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import { Button, FormGroup, FormsyElement, Input, Label, Row, Select } from '../../../shared/components';
import { STATUSES } from '../constants/amenityCategory';
import { AMENITY_CATEGORY_TEXT_CONFIG } from '../constants/resources';

const {
    FormsyInput,
    FormsySelect
} = FormsyElement

const AmenityCategorySearch = ({
    onHandleSearch,
    options
}) => {
    const formRef = useRef();

    const onReset = () => {
        const resetParamsValue = { name: '', status: '' }
        formRef.current.updateInputsWithValue(resetParamsValue);
        onHandleSearch(resetParamsValue, { ...options, pageNumber: 1 });
    }

    return (
        <div className="card card-info">
            <div className="card-header">
                <h3 className="card-title">{AMENITY_CATEGORY_TEXT_CONFIG.AMENITY_CATEGORY_SEARCH_HEADER_LBL}</h3>
            </div>
            <Formsy className="form-horizontal" autoComplete="off" onSubmit={onHandleSearch} ref={formRef}>
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-6">
                            <FormGroup as={Row}>
                                <Label className="col-sm-2">
                                    {AMENITY_CATEGORY_TEXT_CONFIG.AMENITY_CATEGORY_NAME_FIELD_LBL}
                                </Label>
                                <div className="col-sm-10">
                                    <FormsyInput
                                        inputProps={{
                                            type: "text",
                                            id: "name",
                                            placeholder: AMENITY_CATEGORY_TEXT_CONFIG.AMENITY_CATEGORY_NAME_FIELD_LBL
                                        }}
                                        name="name"
                                    />

                                </div>
                            </FormGroup>
                        </div>
                        <div className="col-sm-6">
                            <FormGroup as={Row}>
                                <Label className="col-sm-2">
                                    {AMENITY_CATEGORY_TEXT_CONFIG.AMENITY_CATEGORY_STATUS_FIELD_LBL}
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
                                className="mr-3"
                            >
                                {AMENITY_CATEGORY_TEXT_CONFIG.AMENITY_CATEGORY_SEARCH_BTN}
                            </Button>
                            <Button
                                variant="info"
                                onClick={onReset}
                            >
                                {AMENITY_CATEGORY_TEXT_CONFIG.AMENITY_CATEGORY_RESET_BTN}
                            </Button>
                        </div>
                    </div>
                </div>
            </Formsy>
        </div>
    )
}

export default AmenityCategorySearch;

AmenityCategorySearch.PropTypes = {
    onHandleSearch: PropTypes.func.isRequired,
    options: PropTypes.object
}

AmenityCategorySearch.defaultProps = {
    options: {},
}