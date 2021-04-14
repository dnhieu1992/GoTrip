import Navbar from './shared/components/Navbar';
import MainSidebar from './shared/components/MainSidebar';
import ContentWrapper from './shared/components/ContentWrapper';
import Footer from './shared/components/Footer';
import { BrowserRouter, Route } from "react-router-dom";
import CountryContainer from './country/CountryContainer';
import CityContainer from './city/CityContainer';
import Grid from '../shared/components/grid/Grid';

const AdminPage = () => {
    return (
        <div className="wrapper">
            {/* <Preloader /> */}
            <Navbar />
            <MainSidebar />
            <div className="content-wrapper">
                <BrowserRouter>
                    <div>
                        <Route path="/admin/country" component={CountryContainer} />
                        <Route path="/admin/city" component={CityContainer} />
                    </div>
                </BrowserRouter>
            </div>
            {/* <ContentWrapper /> */}
            <Footer />
        </div>
    )
}
export default AdminPage;