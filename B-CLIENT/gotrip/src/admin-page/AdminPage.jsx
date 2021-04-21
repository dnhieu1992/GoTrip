import { Route } from 'react-router-dom';
import Navbar from './shared/components/Navbar';
import MainSidebar from './shared/components/MainSidebar';
import Footer from './shared/components/Footer';

import CountryContainer from './country/CountryContainer';
import CityContainer from './city/CityContainer';
import TypesOfAccommodationContainer from './types-of-accommodation/TypesOfAccommodationContainer';

const AdminPage = () => {
  return (
    <div className="wrapper">
      {/* <Preloader /> */}
      <Navbar />
      <MainSidebar />
      <div className="content-wrapper">
        <Route path="/admin/country" component={CountryContainer} />
        <Route path="/admin/city" component={CityContainer} />
        <Route
          path="/admin/types-of-accommodation"
          component={TypesOfAccommodationContainer}
        />
      </div>
      <Footer />
    </div>
  );
};
export default AdminPage;