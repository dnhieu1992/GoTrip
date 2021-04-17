import PropTypes from 'prop-types';

const Modal = ({
    title,
    children,
    classNames,
    onClose,
    onSave
}) => {
    return (
        <div className="modal" style={{ display: 'block' }} id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className={`modal-dialog ${classNames}`}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
                        <button type="button" className="btn btn-link" data-bs-dismiss="modal" onClick={onClose} aria-label="Close">X</button>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                    <div className="modal-footer">
                        {onClose && (
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                        )}
                        {onSave && (
                            <button type="button" className="btn btn-primary" onClick={onSave}>Submit</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;

Modal.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
    classNames: PropTypes.string,
    onClose: PropTypes.func,
    onSave: PropTypes.func
};

Modal.defaultProps = {
    classNames: ''
};