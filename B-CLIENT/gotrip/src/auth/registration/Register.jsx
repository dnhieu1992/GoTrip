import Formsy, { addValidationRule } from "formsy-react";
import { Link } from 'react-router-dom';
import { useState } from "react";
import { useHistory } from "react-router";
import { FormsyElement, Input, LoaderButton } from "../../shared/components";
import { REGISTER_TEXT_CONFIG } from "./constants/resources";
import { Checkbox } from "../../shared/components/index";

const Register = () => {
    const [state, setState] = useState([]);
    const [isValid, setIsValid] = useState(true);
    const history = useHistory();

    const { FormsyInput } = FormsyElement;

    const {
        username,
        email,
        password,
        confirmPassword
    } = state;

    const createAccount = async (account, onSuccess, onError) => {
        try {
            const res = await fetch('http://localhost:5000/api/register', {
                method: "POST",
                body: JSON.stringify(account),
                headers: { "Content-type": "application/json;charset=UTF-8" }
            });

            res = await res.json();

            if (!res.ok && res.status === 409) {
                throw error();
            }

            if (onSuccess) {
                return onSuccess();
            }

        } catch (error) {
            console.log(error);
            if (onError) {
                return onError();
            }
        }
    }

    const onSubmit = (modal) => {
        createAccount(modal);
        console.log('modal', modal)
    }

    const onValid = () => {
        setIsValid(true);
    }

    const onInValid = () => {
        setIsValid(false);
    }

    return (
        <div className="register-container">
            <Formsy className="form form-horizontal register-container__form" onSubmit={onSubmit} onValid={onValid} onInvalid={onInValid}>
                <h3 className="register-container__form-title">{REGISTER_TEXT_CONFIG.REGISTER_FORM_HEADER}</h3>
                <div className="register-container__form-element">
                    <FormsyInput
                        inputProps={{
                            id: 'username',
                            type: 'text',
                            placeholder: REGISTER_TEXT_CONFIG.REGISTER_USERNAME_FIELD_LBL,
                        }}
                        name="username"
                        label={REGISTER_TEXT_CONFIG.REGISTER_USERNAME_FIELD_LBL}
                        value={username}
                        required
                        validations={{ minLength: 3, maxLength: 20 }}
                        validationError={REGISTER_TEXT_CONFIG.USERNAME_REQUIRED_MSG}
                        validationErrors={{
                            minLength: REGISTER_TEXT_CONFIG.USERNAME_MIN_LENGTH_MSG,
                            maxLength: REGISTER_TEXT_CONFIG.USERNAME_MAX_LENGTH_MSG
                        }}
                    />
                    <FormsyInput
                        inputProps={{
                            type: 'email',
                            id: "email",
                            placeholder: REGISTER_TEXT_CONFIG.REGISTER_EMAIL_FIELD_LBL
                        }}
                        name="email"
                        label={REGISTER_TEXT_CONFIG.REGISTER_EMAIL_FIELD_LBL}
                        value={email}
                        required
                        validations={{ isEmail: true }}
                        validationErrors={{
                            isEmail: REGISTER_TEXT_CONFIG.EMAIL_INVALID_MSG
                        }}
                        validationError={REGISTER_TEXT_CONFIG.EMAIL_REQUIRED_MSG}
                    />
                    <FormsyInput
                        inputProps={{
                            type: "password",
                            placeholder: REGISTER_TEXT_CONFIG.REGISTER_PASSWORD_FIELD_LBL
                        }}
                        name="password"
                        label={REGISTER_TEXT_CONFIG.REGISTER_PASSWORD_FIELD_LBL}
                        value={password}
                        required
                        validationError={REGISTER_TEXT_CONFIG.PASSWORD_REQUIRED_MSG}
                        validations={{ matchRegexp: REGISTER_TEXT_CONFIG.MATCH_REGEXP, minLength: 8, maxLength: 30 }}
                        validationErrors={{
                            matchRegexp: REGISTER_TEXT_CONFIG.PASSWORD_INVALID_MSG,
                            minLength: REGISTER_TEXT_CONFIG.PASSWORD_MIN_LENGTH_MSG,
                            maxLength: REGISTER_TEXT_CONFIG.PASSWORD_MAX_LENGTH_MSG
                        }}
                    />
                    <FormsyInput
                        inputProps={{
                            type: "password",
                            placeholder: REGISTER_TEXT_CONFIG.REGISTER_CONFIRM_PASSWORD_FIELD_LBL
                        }}
                        name="confirm_password"
                        label={REGISTER_TEXT_CONFIG.REGISTER_CONFIRM_PASSWORD_FIELD_LBL}
                        value={confirmPassword}
                        required
                        validationError={REGISTER_TEXT_CONFIG.CONFIRM_PASSWORD_REQUIRED_MSG}
                        validations="equalsField:password"
                        validationErrors={{
                            equalsField: REGISTER_TEXT_CONFIG.CONFIRM_PASSWORD_INVALID_MSG,
                        }}
                    />
                    <Checkbox
                        type="checkbox"
                        className="register-container__checkbox"
                        label="I Accept to the Term & Conditions"
                        required
                    />

                    <div className="col-xs-12 mt-3">
                        <LoaderButton
                            className="register-container__register-btn"
                            type="submit"
                            disabled={!isValid}
                            size="lg"
                            variant="primary"
                        >
                            Sign In
                        </LoaderButton>
                    </div>

                    <div className="mt-3 d-flex justify-content-center">
                        <span>Already a remember ?</span> &nbsp;
                        <Link to="/login">
                            Sign In
                        </Link>
                    </div>
                </div>
            </Formsy>
        </div>
    )
}
export default Register;
