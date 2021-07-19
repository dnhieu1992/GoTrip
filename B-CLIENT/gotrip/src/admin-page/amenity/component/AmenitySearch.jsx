import Formsy from 'formsy-react';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import { STATUSES } from '../constants/amenity';
import { Input, Label, FormGroup, FormsyElement, Button, Select, Row } from '../../../shared/components/index';
import { AMENITY_TEXT_CONFIG } from '../constants/resources';

const {
    FormsyInput,
    FormsySelect
} = FormsyElement;

const AmenitySearch = ({
    options,
    amenityCategories,
    onHandleSearch
}) => {
    const formRef = useRef();

    const onReset = () => {
        formRef.current.updateInputsWithValue({
            name: '',
            amenityCategoryId: '',
            status: ''
        });
        onHandleSearch({
            name: '',
            amenityCategoryId: '',
            status: ''
        }, { ...options, pageNumber: 1 })
    }


    debugger
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

    return (
        <div className="card card-info">
            <div className="card-header">
                <h3 className="card-title">{AMENITY_TEXT_CONFIG.AMENITY_SEARCH_HEADER_LBL}</h3>
            </div>
            <Formsy className="form-horizontal" autoComplete="off" onSubmit={onHandleSearch} ref={formRef}>
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-6">
                            <FormGroup as={Row}>
                                <Label className="col-sm-2">
                                    {AMENITY_TEXT_CONFIG.AMENITY_NAME_FIELD_LBL}
                                </Label>
                                <div className="col-sm-10">
                                    <FormsyInput
                                        inputProps={{
                                            type: 'text',
                                            id: 'name',
                                            placeholder: AMENITY_TEXT_CONFIG.AMENITY_NAME_FIELD_LBL
                                        }}
                                        name="name"
                                    />
                                </div>
                            </FormGroup>
                        </div>
                        <div className="col-sm-6">
                            <FormGroup as={Row}>
                                <Label className="col-sm-2">
                                    {AMENITY_TEXT_CONFIG.AMENITY_AMENITYCATEGORYID_FIELD_LBL}
                                </Label>
                                <div className="col-sm-10">
                                    <FormsySelect
                                        name='amenityCategoryId'
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
                                    {AMENITY_TEXT_CONFIG.AMENITY_STATUS_FIELD_LBL}
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
                                {AMENITY_TEXT_CONFIG.AMENITY_SEARCH_BTN}
                            </Button>
                            <Button
                                variant="info"
                                onClick={onReset}
                            >
                                {AMENITY_TEXT_CONFIG.AMENITY_RESET_BTN}
                            </Button>
                        </div>
                    </div>
                </div>
            </Formsy>
        </div>
    )
}
export default AmenitySearch;

AmenitySearch.propTypes = {
    options: PropTypes.object,
    onHandleSearch: PropTypes.func.isRequired
};

AmenitySearch.defaultProps = {
    options: {},
    amenities: {},
};