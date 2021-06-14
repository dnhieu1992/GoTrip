import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route, Link, Router } from 'react-router-dom';
import AdminPage from './admin-page/AdminPage';
import Register from './auth/registration/Register'
import Login from './auth/login/Login';
import Reset from './auth/reset/Reset';

function App() {
  return (
    <BrowserRouter>
      <div style={{ height: '100%' }}>
        {/* <Route exact path="/" component={LoginContainer} exact/> */}
        <Route path="/" exact component={AdminPage} />
        <Route path="/admin" component={AdminPage} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/reset" component={Reset} />
      </div>
    </BrowserRouter>
  );
}

export default App;
