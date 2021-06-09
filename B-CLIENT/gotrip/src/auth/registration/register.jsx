import Formsy, { addValidationRule } from "formsy-react";
import { useState } from "react";
import { useHistory } from "react-router";
import { FormsyElement, Input, LoaderButton } from "../../shared/components";
import { REGISTER_TEXT_CONFIG } from "./constants/resources";

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
        <div className="main">
            <h1>{REGISTER_TEXT_CONFIG.REGISTER_PAGE_HEADER}</h1>
            <Formsy className="form form-horizontal" onSubmit={onSubmit} onValid={onValid} onInvalid={onInValid}>
                <h2>{REGISTER_TEXT_CONFIG.REGISTER_FORM_HEADER}</h2>
                <div className="form__input">
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

                </div>
                <div className="form__input">
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
                </div>
                <div className="form__input">
                    <FormsyInput
                        inputProps={{
                            type: "password",
                            className: "form-input",
                            placeholder: REGISTER_TEXT_CONFIG.REGISTER_PASSWORD_FIELD_LBL
                        }}
                        name="password"
                        label={REGISTER_TEXT_CONFIG.REGISTER_PASSWORD_FIELD_LBL}
                        value={password}
                        required
                        validationError={REGISTER_TEXT_CONFIG.PASSWORD_REQUIRED_MSG}
                        validations={{ matchRegexp: /^(?=.*[~!@#$%^&*?()])(?=.*[a-z])(?=.*[A-Z])/, minLength: 8, maxLength: 30 }}
                        validationErrors={{
                            matchRegexp: REGISTER_TEXT_CONFIG.PASSWORD_INVALID_MSG,
                            minLength: REGISTER_TEXT_CONFIG.PASSWORD_MIN_LENGTH_MSG,
                            maxLength: REGISTER_TEXT_CONFIG.PASSWORD_MAX_LENGTH_MSG
                        }}
                    />
                </div>
                <div className="form__input">
                    <FormsyInput
                        inputProps={{
                            type: "password",
                            className: "form-input",
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
                </div>
                <div className="form__checkbox">
                    <Input
                        type="checkbox"
                        className="form__checkbox -checkbox-size"
                        required
                        disabled={!isValid}
                    />
                        I Accept to the Term & Conditions
                </div>
                <div className="form__button d-grid gap-2 ">
                    <LoaderButton
                        className="form__button btn-lg "
                        type="submit"
                        disabled={!isValid}
                    >
                        Sign In
                    </LoaderButton>
                </div>

                <span className="form__login">
                    Already a remember ?
                    <a href="./login">Sign In</a>
                </span>
            </Formsy>
        </div>
    )
}
export default Register;
