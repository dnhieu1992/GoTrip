import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route, Link, Router } from 'react-router-dom';
import AdminPage from './admin-page/AdminPage';
import Register from './auth/registration/Register'
import Login from './auth/login/Login';
import Reset from './auth/reset/Reset';
import UploadImage from './shared/components/forms/upload-image/UploadImage';
import PropertyManagementContainer from './property-management/PropertyManagementContainer';
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
        <Route path="/upload-image" component={UploadImage}/>
        <Route path="/property-management" component={PropertyManagementContainer}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
