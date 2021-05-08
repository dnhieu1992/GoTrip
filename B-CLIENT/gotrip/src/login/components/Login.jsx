import avatar from '../../upload/images/avatar5.png';

const Login = ({ user }) => {
  const { username, password, rememberMe } = user;

  function onHandleUsernameChange(event) {
    this.props.onHandleUserChange({ ...user, username: event.target.value });
  }

  const onHandlePasswordChange = (event) => {
    this.props.onHandleUserChange({ ...user, password: event.target.value });
  };

  const onHandleRememberMeChange = (event) => {
    this.props.onHandleUserChange({ ...user, rememberMe: event.target.value });
  };

  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="login-logo">
          <b>Login</b>
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <div className="mt-3 ml-0 row justify-content-center input-group">
              <div className="image col-4 p-0 mb-5">
                <img
                  src={avatar}
                  width="100"
                  height="100"
                  className="img-circle "
                  alt="User Image"
                />
              </div>
            </div>

            <form method="post">
              <div className="input-group mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={username}
                  onChange={(event) => onHandleUsernameChange(event)}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fa fa-envelope"></span>
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={onHandlePasswordChange}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fa fa-lock"></span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="icheck-primary">
                    <input
                      type="checkbox"
                      id="remember"
                      checked={rememberMe}
                      onChange={onHandleRememberMeChange}
                    />
                    <label className="ml-1">
                      Remember Me
                    </label>
                  </div>
                </div>
              </div>
              <div className="row justify-content-end mb-3 mt-3">
                <div className="col">
                  <button type="submit" className="btn btn-primary btn-block">
                    Sign In
                  </button>
                </div>
              </div>
            </form>

            <p className="mb-1">
              <a href="forgot-password.html">I forgot my password</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
