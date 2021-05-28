import PropTypes from 'prop-types';
import { Button, Spinner } from 'react-bootstrap';

const LoaderButton = ({
    id,
    type,
    size,
    active,
    variant,
    spinnerVariant,
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
                className={`loader-button ${className}`}
                active={active}
                disabled={disabled || isLoading}
                size={size}
                variant={variant}
                onClick={onClick}
            >
                {isLoading && (
                    <Spinner className='loader-button__spinner' animation="border" variant={spinnerVariant} />
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
    spinnerVariant: PropTypes.string,
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
    spinnerVariant: 'light',
    onClick: () => { },
};