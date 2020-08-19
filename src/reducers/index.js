import { combineReducers } from 'redux';
import reducerGravatar from './reducerGravatar';
import reducerTrivia from './reducerTrivia';

const rootReducer = combineReducers({ reducerGravatar, reducerTrivia });

export default rootReducer;
