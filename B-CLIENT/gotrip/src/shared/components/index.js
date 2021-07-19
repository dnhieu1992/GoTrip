import {
    Form,
    Button,
    CloseButton,
} from 'react-bootstrap';
import LoaderButton from './LoaderButton';
import Grid from './grid/Grid';
import Modal from './forms/Modal';
import Select from './forms/Select';
import FormsyInput from './forms/formsy-elements/FormsyInput';
import FormsySelect from './forms/formsy-elements/FormsySelect';
import FormsyTextarea from './forms/formsy-elements/FormsyTextarea';
import FormsyUploadIcons from './forms/formsy-elements/FormsyUploadIcons';
import UploadImage from './forms/upload-image/UploadImage';

const {
    Group,
    Control,
    Label,
    Text,
    Check,
    Row,
    Col
} = Form;

const FormsyElement = {
    FormsyInput,
    FormsySelect,
    FormsyTextarea,
    FormsyUploadIcons
}

export {
    Group as FormGroup,
    Control as Input,
    Label,
    Text,
    Check as Checkbox,
    Select,
    Row,
    Col,
    Grid,
    Modal,
    Button,
    CloseButton,
    LoaderButton,
    FormsyElement,
    UploadImage
};