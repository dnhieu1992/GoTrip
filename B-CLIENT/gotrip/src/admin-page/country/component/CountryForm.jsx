import { useState } from 'react';
import Formsy from 'formsy-react';
import {
    Label,
    FormsyInput,
    FormsySelect,
    LoaderButton
} from '../../../shared/components/index.js';

const CountryForm = ({
    country,
    onClose,
    onSaveCountry
}) => {
    const [isValid, setIsValid] = useState(false);

    const {
        name,
        code,
        status
    } = country;

    const submit = (modal) => {
        onSaveCountry(modal)
    }

    const enableButton = () => {
        setIsValid(true);
    }

    const disableButton = () => {
        setIsValid(false);
    }

    const statuses = [{ value: 'Actived', label: 'Actived' }, { value: 'Disabled', label: 'Disabled' }];

    return (
        <Formsy id="addNew" onSubmit={submit} onValid={enableButton} onInvalid={disableButton}>
            <div className="card-body">
                <div className="form-group">
                    <Label>Name</Label>
                    <FormsyInput
                        inputProps={{
                            id: 'name',
                            type: 'text',
                            placeholder: 'Name',
                        }}
                        name="name"
                        value={name}
                        required
                        validationError="This is required field."
                    />
                </div>
                <div className="form-group">
                    <Label>Code</Label>
                    <FormsyInput
                        inputProps={{
                            id: 'code',
                            type: 'text',
                            placeholder: 'Code',
                        }}
                        name='code'
                        value={code}
                        required
                        validationError="This is required field."
                    />
                </div>
                <div className="form-group">
                    <FormsySelect
                        name='status'
                        value={status}
                        dataSource={statuses}
                        label='Status'
                        required
                        validationError="This is required field."
                    />
                </div>
                <div className="form-group">
                    <div className="col-sm-12 d-flex justify-content-end">
                        <LoaderButton
                            type="button"
                            className="mr-5"
                            onClick={() => onClose(false)}
                        >
                            Close
                        </LoaderButton>
                        <LoaderButton
                            type="submit"
                            disabled={!isValid}
                        >
                            Submit
                        </LoaderButton>
                    </div>
                </div>
            </div>
        </Formsy>
    );
};

export default CountryForm;
