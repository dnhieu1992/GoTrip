import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Loader from "react-loader-spinner";

const LoaderButton = ({
    id,
    type,
    size,
    active,
    variant,
    children,
    disabled,
    isLoading,
    className,
    onClick
}) => {
    return (
        <>
            <Button
                id={id}
                type={type}
                className={className}
                active={active}
                disabled={disabled || isLoading}
                size={size}
                variant={variant}
                onClick={onClick}
            >
                {isLoading && (
                    <Loader
                        className="d-flex justify-content-start"
                        type="ThreeDots"
                        color="#00BFFF"
                        height={80}
                        width={80} />
                )}
                {children}
            </Button>
        </>
    )
}

export default LoaderButton;

LoaderButton.propTypes = {
    id: PropTypes.string,
    type: PropTypes.string,
    size: PropTypes.string,
    active: PropTypes.bool,
    variant: PropTypes.string,
    disabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    onClick: PropTypes.func,
};

LoaderButton.defaultProps = {
    type: 'button',
    size: 'md',
    active: false,
    readOnly: false,
    disabled: false,
    isLoading: false,
    variant: 'info',
    onClick: () => { },
};