import {createStore} from 'redux';
import stateProducer from '../reducer/index';


const store = createStore(stateProducer)

export default store;