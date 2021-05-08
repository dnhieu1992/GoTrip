//https://fkhadra.github.io/react-toastify/introduction

import { toast, Slide } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faInfo,
    faCheck,
    faExclamationTriangle,
    faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';
import { TOAST_POSITION } from '../constants/toastConstant';

const optionDefault = {
    position: TOAST_POSITION.TOP_RIGHT,
    autoClose: 3000,
    hideProgressBar: false,
    transition: Slide,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
}

function success(message, options = {}) {
    options = {
        ...optionDefault,
        ...options
    }

    toast.success(<div><FontAwesomeIcon icon={faCheck} /><span className="ml-2">{message}</span></div>, options);
}

function info(message, options = {}) {
    options = {
        ...optionDefault,
        ...options
    }

    toast.info(<div><FontAwesomeIcon icon={faInfo} /><span className="ml-2">{message}</span></div>, options);
}

function warn(message, options = {}) {
    options = {
        ...optionDefault,
        ...options
    }

    toast.warn(<div><FontAwesomeIcon icon={faExclamationCircle} /><span className="ml-2">{message}</span></div>, options);
}

function error(message, options = {}) {
    options = {
        ...optionDefault,
        ...options
    }

    toast.error(<div><FontAwesomeIcon icon={faExclamationTriangle} /><span className="ml-2">{message}</span></div>, options);
}

function dismiss() {
    toast.dismiss();
}

export default {
    success,
    info,
    warn,
    error,
    dismiss
}