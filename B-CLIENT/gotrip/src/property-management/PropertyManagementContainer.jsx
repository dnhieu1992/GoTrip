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
            <div className="property-mng__header text uppercase">
                <h3>Booking.com</h3>
                <i className="fa fa-globe"></i>
            </div>
            <div className="property-mng__body row">
                    <PropertyList
                    data={properties}
                />
            </div>
        </div>
    )
    
}

export default PropertyManagementContainer;