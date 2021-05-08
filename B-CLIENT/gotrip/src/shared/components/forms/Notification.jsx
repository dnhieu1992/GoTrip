import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';

const Notification = () => {
    const notify = () => toast("Wow so easy!");
    return (
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    )
}

export default Notification;

Modal.propTypes = {
    message: PropTypes.string.isRequired,
    position: PropTypes.string,
    autoClose: PropTypes.number,
    hideProgressBar: PropTypes.bool,
    newestOnTop: PropTypes.bool,
    closeOnClick: PropTypes.bool,
    rtl: PropTypes.bool,
    pauseOnFocusLoss: PropTypes.bool,
    draggable: PropTypes.any,
    pauseOnHover: PropTypes.bool,
};

Modal.defaultProps = {
    position: 'top-right',
    autoClose: 5000
};

