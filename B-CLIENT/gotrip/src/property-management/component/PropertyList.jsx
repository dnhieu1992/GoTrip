import PropTypes from 'prop-types';

const PropertyList=(
    {data}
)=>{
    const properties=data.map(property=>{
        return(
            <div className="property-list">
                    <div className="property-list__image">
                        <i className="fa fa-home"></i>
                    </div>
                    <div className="property-list__name">
                        {property.name}
                    </div>
                    <div className="property-list__description">
                        {property.description}
                    </div>
                    <div className="property-list__button ">
                        <button className="btn btn-primary">List your property</button>
                    </div>
               
            </div>
            
        )
    })
    return(
        // {properties}
        <>
            {properties}
        </>
    )
}
export default PropertyList;

PropertyList.propTypes={
    data:PropTypes.array
}

PropertyList.defaultProps={
    data:[]
}
