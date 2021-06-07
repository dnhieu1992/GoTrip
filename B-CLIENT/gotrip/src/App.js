import logo from './logo.svg';
import './App.css';
import './login.scss';
import { BrowserRouter, Switch, Route, Link, Router } from 'react-router-dom';
import AdminPage from './admin-page/AdminPage';
import login from './auth/login/login';
import reset from './auth/login/reset';

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* <Route exact path="/" component={LoginContainer} exact/> */}
        <Route path="/" exact component={AdminPage} />
        <Route path="/admin" component={AdminPage} />
        <Route path="/login" component={login} />
        <Route path="/login/reset" component={reset} />
      </div>
    </BrowserRouter>
  );
}

export default App;
