import { Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './shared/components/Navbar';
import MainSidebar from './shared/components/MainSidebar';
import Footer from './shared/components/Footer';

import CountryContainer from './country/CountryContainer';
import CityContainer from './city/CityContainer';
import BedContainer from './bed/BedContainer';
import PropertyContainer from './property/PropertyContainer'
import PropertyTypeContainer from './property-type/PropertyTypeContainer';
const AdminPage = () => {
  return (
    <div className="wrapper">
      {/* <Preloader /> */}
      <ToastContainer />
      <Navbar />
      <MainSidebar />
      <div className="content-wrapper">
        <Route path="/admin/country" component={CountryContainer} />
        <Route path="/admin/city" component={CityContainer} />
        <Route path="/admin/bed" component={BedContainer} />
        <Route path="/admin/property" component={PropertyContainer}/>
        <Route path="/admin/property-type" component={PropertyTypeContainer}/>
      </div>
      <Footer />
    </div>
  );
};
export default AdminPage;
