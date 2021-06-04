import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Formsy from 'formsy-react';
import { FormsyElement, LoaderButton } from '../../shared/components/index.js';
import { LOGIN_TEXT_CONFIG } from './constant/resources.js';

import {
    loginUser
} from './api/apiHandle.js';

const {
    FormsyInput
} = FormsyElement

const login = () => {
    const [isValid, setIsValid] = useState(true);

    const onLogin = (account) => {
        loginUser(account,
            () => {

            },
            () => {

            });
    };

    const onSubmit = (modal) => {
        onLogin(modal);
    }

    const onValid = () => {
        setIsValid(true);
    }

    const onInvalid = () => {
        setIsValid(false);
    }
    return (
        <div className="login-container">
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card card-signin my-5">
                            <div className="card-body">
                                <h5 className="card-title text-center ">{LOGIN_TEXT_CONFIG.LOGIN_PAGE_HEADER}</h5>
                                <Formsy className="form-signin" onSubmit={onSubmit} onValid={onValid} onInvalid={onInvalid}>
                                    <div className="form-label-group">
                                        <FormsyInput
                                            inputProps={{
                                                id: 'username',
                                                placeholder: 'Username',
                                            }}
                                            type="text"
                                            name="username"
                                            autofocus
                                            label={LOGIN_TEXT_CONFIG.LOGIN_USERNAME_FIELD_LBL}
                                            validations={{
                                                minLength: 3,
                                                maxLength: 20,
                                            }}
                                            required
                                            validationError={LOGIN_TEXT_CONFIG.USERNAME_REQUIRED_FIELD_MSG}
                                            validationErrors={{
                                                minLength: LOGIN_TEXT_CONFIG.USERNAME_MIN_FIELD_MSG,
                                                maxLength: LOGIN_TEXT_CONFIG.USERNAME_MAX_FIELD_MSG
                                            }}
                                        />
                                    </div>

                                    <div className="form-label-group">
                                        <FormsyInput
                                            inputProps={{
                                                id: 'password',
                                                placeholder: 'Password',
                                            }}
                                            type="password"
                                            name="password"
                                            label={LOGIN_TEXT_CONFIG.LOGIN_PASSWORD_FIELD_LBL}
                                            validations={{
                                                minLength: 8,
                                                maxLength: 30,
                                            }}
                                            required
                                            validationError={LOGIN_TEXT_CONFIG.PASSWORD_REQUIRED_FIELD_MSG}
                                            validationErrors={{
                                                minLength: LOGIN_TEXT_CONFIG.PASSWORD_MIN_FIELD_MSG,
                                                maxLength: LOGIN_TEXT_CONFIG.PASSWORD_MAX_FIELD_MSG
                                            }}
                                        />
                                    </div>

                                    <div className="custom-control custom-checkbox mb-3">
                                        <NavLink to="/login/resetpass" className="nav-link float-right">
                                            {LOGIN_TEXT_CONFIG.LOGIN_FORGOT_FIELD_LBL}
                                        </NavLink>
                                    </div>

                                    <div className="text-center">
                                        <LoaderButton
                                            type="submit"
                                            className="btn btn-lg btn-primary btn-block text-uppercase mb-3"
                                            disabled={!isValid}
                                        >
                                            {LOGIN_TEXT_CONFIG.LOGIN_SIGNIN_BTN}
                                        </LoaderButton>
                                        <p className="mt-3">OR</p>
                                        <NavLink to="/register" className="nav-link">
                                            {LOGIN_TEXT_CONFIG.LOGIN_REGISTER_FIELD_LBL}
                                        </NavLink>
                                    </div>
                                </Formsy>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default login;