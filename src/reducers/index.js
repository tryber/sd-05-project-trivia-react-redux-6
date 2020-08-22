import { combineReducers } from 'redux';
import reducerGravatar from './reducerGravatar';
import reducerTrivia from './reducerTrivia';
import reducerGame from './reducerGame';

const rootReducer = combineReducers({ reducerGravatar, reducerTrivia, reducerGame });

export default rootReducer;
