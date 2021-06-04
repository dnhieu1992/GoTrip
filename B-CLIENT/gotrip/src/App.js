import logo from './logo.svg';
import './App.css';
import './login.scss';
import { BrowserRouter, Switch, Route, Link, Router } from 'react-router-dom';
import AdminPage from './admin-page/AdminPage';
import login from './auth/login/login';
import register from './auth/registration/register';
import resetpass from './auth/login/resetpass';

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* <Route exact path="/" component={LoginContainer} exact/> */}
        <Route path="/" exact component={AdminPage} />
        <Route path="/admin" component={AdminPage} />
        <Route path="/login" component={login} />
        <Route path="/register" component={register} />
        <Route path="/login/resetpass" component={resetpass} />
      </div>
    </BrowserRouter>
  );
}

export default App;
