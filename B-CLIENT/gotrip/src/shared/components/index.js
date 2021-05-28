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

const {
    Group,
    Control,
    Label,
    Text,
    Check,
    Row,
    Col
} = Form;

const FormsyElement = { FormsyInput, FormsySelect }

export {
    Group as FormGroup,
    Control as Input,
    Label,
    Text,
    Check,
    Select,
    Row,
    Col,
    Grid,
    Modal,
    Button,
    CloseButton,
    LoaderButton,
    FormsyElement
};