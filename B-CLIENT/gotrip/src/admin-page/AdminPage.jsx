import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Navbar from './shared/components/Navbar';
import MainSidebar from './shared/components/MainSidebar';
import Footer from './shared/components/Footer';

import AmenityContainer from './amenity/AmenityContainer'
import CountryContainer from './country/CountryContainer';
import CityContainer from './city/CityContainer';
import BedContainer from './bed/BedContainer';
import BreakfastContainer from './breakfast/BreakfastContainer';
import PropertyContainer from './property/PropertyContainer'
import PropertyTypeContainer from './property-type/PropertyTypeContainer';
import RoomTypeContainer from './room-type/RoomTypeContainer';
import RoomNameContainer from './room-name/RoomNameContainer';
import AmenityCategoryContainer from './amenity-category/AmenityCategoryContainer';
const AdminPage = () => {
  return (
    <div className="wrapper">
      {/* <Preloader /> */}
      <ToastContainer />
      <Navbar />
      <MainSidebar />
      <div className="content-wrapper">
        <Route path="/admin/amenity" component={AmenityContainer} />
        <Route path="/admin/country" component={CountryContainer} />
        <Route path="/admin/city" component={CityContainer} />
        <Route path="/admin/bed" component={BedContainer} />
        <Route path="/admin/property" component={PropertyContainer} />
        <Route path="/admin/property-type" component={PropertyTypeContainer} />
        <Route path="/admin/room-type" component={RoomTypeContainer} />
        <Route path="/admin/room-name" component={RoomNameContainer} />
        <Route path="/admin/amenity-category" component={AmenityCategoryContainer} />
        <Route path="/admin/breakfast" component={BreakfastContainer} />
      </div>
      <Footer />
    </div>
  );
};
export default AdminPage;
