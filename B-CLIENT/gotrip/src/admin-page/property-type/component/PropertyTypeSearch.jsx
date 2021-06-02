import PropTypes from 'prop-types';
import { Button, FormGroup, Input, Label, Row, Select } from '../../../shared/components';
import { STATUSES } from '../constants/propertyType';
import { PROPERTY_TYPE_TEXT_CONFIG } from '../constants/resources';

const PropertyTypeSearch = ({
    searchParam,
    onHandleSearchChange,
    onHandleSearch,
    onHandleResetForm,
    properties
}) => {
    const {
        name = '',
        propertyId = '',
        status = ''
    } = searchParam;

    const onHandleFieldChange = (e) => {
        if (e?.target) {
            onHandleSearchChange({
                ...searchParam,
                [e.target.name]: e.target.value
            });
        }
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
            <form className="form-horizontal" autoComplete="off">
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-6">
                            <FormGroup as={Row}>
                                <Label className="col-sm-2">
                                    {PROPERTY_TYPE_TEXT_CONFIG.PROPERTY_TYPE_NAME_FIELD_LBL}
                                </Label>
                                <div className="col-sm-10">
                                    <Input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder={PROPERTY_TYPE_TEXT_CONFIG.PROPERTY_TYPE_NAME_FIELD_LBL}
                                        value={name}
                                        onChange={onHandleFieldChange}
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
                                    <Select
                                        inputProps={{ name: 'propertyId' }}
                                        value={propertyId}
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
                                <Label className="col-sm-2" >
                                    {PROPERTY_TYPE_TEXT_CONFIG.PROPERTY_TYPE_STATUS_FIELD_LBL}
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
                                className="mr-3"
                                onClick={() => onHandleSearch(searchParam)}
                            >
                                {PROPERTY_TYPE_TEXT_CONFIG.PROPERTY_TYPE_SEARCH_BTN}
                            </Button>
                            <Button
                                variant="info"
                                onClick={onHandleResetForm}
                            >
                                {PROPERTY_TYPE_TEXT_CONFIG.PROPERTY_TYPE_RESET_BTN}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default PropertyTypeSearch;

PropertyTypeSearch.propTypes = {
    searchParam: PropTypes.object,
    onHandleSearchChange: PropTypes.func.isRequired,
    onHandleSearch: PropTypes.func.isRequired,
    onHandleResetForm: PropTypes.func.isRequired
}

PropertyTypeSearch.defaultProps = {
    searchParam: {}
}