import React, { useState } from 'react';
import Login from './components/Login';

function LoginContainer() {
    const [user, setUser] = useState({});

    const onHandleUserChange = (user) => {
        setUser(user);
    }

    return (
        <Login user={user} onHandleUserChange={onHandleUserChange} />
    )
}

export default LoginContainer;