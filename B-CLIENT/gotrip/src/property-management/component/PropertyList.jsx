import PropTypes from 'prop-types';

const PropertyList = (
    { data }
) => {
    const properties = data.map(property => {
        return (
            <div className="property-list">
                <div className="property-list__image">
                    <img src="https://q.bstatic.com/static/img/join/segmentation/accomm_one_apt_main@2x.png" alt="" />
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
    return (
        // {properties}
        <>
            {properties}
        </>
    )
}
export default PropertyList;

PropertyList.propTypes = {
    data: PropTypes.array
}

PropertyList.defaultProps = {
    data: []
}
