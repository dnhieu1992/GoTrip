import PropTypes from 'prop-types';
import { STATUSES } from '../constants/amenity';
import { Input, Label, FormGroup, Button, Select, Row } from '../../../shared/components/index';
import { AMENITY_TEXT_CONFIG } from '../constants/resources';

const AmenitySearch = ({
    searchParam,
    amenityCategories,
    onHandleSearchChange,
    onHandleSearch,
    onHandleResetForm
}) => {
    const {
        name = '',
        amenityCategoryId = '',
        status = ''
    } = searchParam;

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
                <h3 className="card-title">{AMENITY_TEXT_CONFIG.AMENITY_SEARCH_HEADER_LBL}</h3>
            </div>
            <form className="form-horizontal" autoComplete="off">
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-6">
                            <FormGroup as={Row}>
                                <Label className="col-sm-2">
                                    {AMENITY_TEXT_CONFIG.AMENITY_NAME_FIELD_LBL}
                                </Label>
                                <div className="col-sm-10">
                                    <Input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder={AMENITY_TEXT_CONFIG.AMENITY_NAME_FIELD_LBL}
                                        value={name}
                                        onChange={onHandleFieldChange}
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
                                    <Select
                                        inputProps={{ name: 'amenityCategoryId' }}
                                        value={amenityCategoryId}
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
                                    {AMENITY_TEXT_CONFIG.AMENITY_STATUS_FIELD_LBL}
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
                                {AMENITY_TEXT_CONFIG.AMENITY_SEARCH_BTN}
                            </Button>
                            <Button
                                variant="info"
                                onClick={onHandleResetForm}
                            >
                                {AMENITY_TEXT_CONFIG.AMENITY_RESET_BTN}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default AmenitySearch;

AmenitySearch.propTypes = {
    searchParam: PropTypes.object,
    onHandleSearchChange: PropTypes.func.isRequired,
    onHandleSearch: PropTypes.func.isRequired,
    onHandleResetForm: PropTypes.func.isRequired,
};

AmenitySearch.defaultProps = {
    searchParam: {},
};