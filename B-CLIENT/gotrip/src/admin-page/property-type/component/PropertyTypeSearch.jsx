import Formsy from 'formsy-react';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import { Button, FormGroup, FormsyElement, Label, Row } from '../../../shared/components';
import { STATUSES } from '../constants/propertyType';
import { PROPERTY_TYPE_TEXT_CONFIG } from '../constants/resources';

const {
    FormsyInput,
    FormsySelect
} = FormsyElement;

const PropertyTypeSearch = ({
    onHandleSearch,
    properties,
    options
}) => {
    const formRef = useRef();

    const onReset = () => {
        formRef.current.updateInputsWithValue({
            name: '',
            status: '',
            propertyId: ''
        });
        onHandleSearch({
            name: '',
            status: '',
            propertyId: ''
        }, { ...options, pageNumber: 1 })
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
        <div className="card card-info">
            <div className="card-header">
                <h3 className="card-title">{PROPERTY_TYPE_TEXT_CONFIG.PROPERTY_TYPE_SEARCH_HEADER_LBL}</h3>
            </div>
            <Formsy className="form-horizontal" autoComplete="off" onSubmit={onHandleSearch} ref={formRef}>
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-6">
                            <FormGroup as={Row}>
                                <Label className="col-sm-2">
                                    {PROPERTY_TYPE_TEXT_CONFIG.PROPERTY_TYPE_NAME_FIELD_LBL}
                                </Label>
                                <div className="col-sm-10">
                                    <FormsyInput
                                        inputProps={{
                                            type: "text",
                                            id: "name",
                                            placeholder: PROPERTY_TYPE_TEXT_CONFIG.PROPERTY_TYPE_NAME_FIELD_LBL

                                        }}
                                        name="name"
                                    />
                                </div>
                            </FormGroup>
                        </div>
                        <div className="col-sm-6">
                            <FormGroup as={Row}>
                                <Label className="col-sm-2">
                                    {PROPERTY_TYPE_TEXT_CONFIG.PROPERTY_TYPE_PROPERTY_FIELD_LBL}
                                </Label>
                                <div className="col-sm-10">
                                    <FormsySelect
                                        name='propertyId'
                                        dataSource={data}
                                    />
                                </div>
                            </FormGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <FormGroup as={Row}>
                                <Label className="col-sm-2" >
                                    {PROPERTY_TYPE_TEXT_CONFIG.PROPERTY_TYPE_STATUS_FIELD_LBL}
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
                                {PROPERTY_TYPE_TEXT_CONFIG.PROPERTY_TYPE_SEARCH_BTN}
                            </Button>
                            <Button
                                variant="info"
                                onClick={onReset}
                            >
                                {PROPERTY_TYPE_TEXT_CONFIG.PROPERTY_TYPE_RESET_BTN}
                            </Button>
                        </div>
                    </div>
                </div>
            </Formsy>
        </div>
    )
}
export default PropertyTypeSearch;

PropertyTypeSearch.propTypes = {
    onHandleSearch: PropTypes.func.isRequired,
    options: PropTypes.object
}

PropertyTypeSearch.defaultProps = {
    options: {},
    properties: []
}