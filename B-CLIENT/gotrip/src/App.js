import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route, Link, Router } from "react-router-dom";
import LoginContainer from './login/LoginContainer';
import AdminPage from './admin-page/AdminPage';

function App() {
  return (
    <BrowserRouter>
        <div>
            {/* <Route exact path="/" component={LoginContainer} exact/> */}
            <Route path="/" exact component={AdminPage} />
            <Route path="/admin" component={AdminPage} />
        </div>
    </BrowserRouter>
  );
}

export default App;
