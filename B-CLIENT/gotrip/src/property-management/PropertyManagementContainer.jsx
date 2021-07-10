import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getProperties } from "./actions/propertyManagement";
import PropertyList from "./component/PropertyList";

const PropertyManagementContainer = ()=>{
    const {propertyMng} = useSelector(state=>({propertyMng:state.propertyManagement}));
    const dispatch = useDispatch();
    const {
        properties
    }=propertyMng;

    useEffect( ()=>{
        dispatch(getProperties());
    }, []);

    return(
        <div className="property-mng">
            <div className="property-mng__header text uppercase row">
                <img className="img1" src="https://static.booking.com/static/img/b26logo/booking_logo_retina_white.png" alt="" />
                <img className="img2" src="https://free.vector6.com/wp-content/uploads/2021/05/PNG-0000002045-png-hanh-tinh-vu-tru.png" alt="" />
            </div>
            <div className="property-mng__body">
            <div className="property-mng__body__title">
                <div className="property-mng__body__title -welcoming">
                    List your property on Booking.com and start welcoming guests in no time!
                </div>
                <div className="property-mng__body__title -start">
                    To get started, select the type of property you want to list on Booking.com
                </div>
            </div>
            <div className="property-mng__body__list row">

                    <PropertyList
                    data={properties}
                />
            </div>
            </div>
        </div>
    )
    
}

export default PropertyManagementContainer;