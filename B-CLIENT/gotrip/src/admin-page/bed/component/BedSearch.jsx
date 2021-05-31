import PropTypes from 'prop-types';
import { STATUSES } from '../constants/bed';
import { Input, Label, FormGroup, Button, Select, Row } from '../../../shared/components/index';
import { BED_TEXT_CONFIG } from '../constants/resources';

const BedSearch = ({
    searchParam,
    onHandleSearchChange,
    onHandleSearch,
    onHandleResetForm
}) => {
    const {
        name = '',
        description = '',
        status = ''
    } = searchParam;

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
                <h3 className="card-title">{BED_TEXT_CONFIG.BED_SEARCH_HEADER_LBL}</h3>
            </div>
            <form className="form-horizontal" autoComplete="off">
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-6">
                            <FormGroup as={Row}>
                                <Label className="col-sm-2">
                                    {BED_TEXT_CONFIG.BED_NAME_FIELD_LBL}
                                </Label>
                                <div className="col-sm-10">
                                    <Input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder={BED_TEXT_CONFIG.BED_NAME_FIELD_LBL}
                                        value={name}
                                        onChange={onHandleFieldChange}
                                    />
                                </div>
                            </FormGroup>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group row">
                                <Label className="col-sm-2">
                                    {BED_TEXT_CONFIG.BED_DESCRIPTION_FIELD_LBL}
                                </Label>
                                <div className="col-sm-10">
                                    <textarea
                                        className="form-control"
                                        id="description"
                                        name="description"
                                        value={description}
                                        onChange={onHandleFieldChange}
                                    >
                                    </textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <FormGroup as={Row}>
                                <Label className="col-sm-2">
                                    {BED_TEXT_CONFIG.BED_STATUS_FIELD_LBL}
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
                                {BED_TEXT_CONFIG.BED_SEARCH_BTN}
                            </Button>
                            <Button
                                variant="info"
                                onClick={onHandleResetForm}
                            >
                                {BED_TEXT_CONFIG.BED_RESET_BTN}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
};

export default BedSearch;

BedSearch.propTypes = {
    searchParam: PropTypes.object,
    onHandleSearchChange: PropTypes.func.isRequired,
    onHandleSearch: PropTypes.func.isRequired,
    onHandleResetForm: PropTypes.func.isRequired
};

BedSearch.defaultProps = {
    searchParam: {},
};