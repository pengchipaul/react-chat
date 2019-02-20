import authReducer from './authReducer';
import friendReducer from './friendReducer';
import friendRequestReducer from './friendRequestReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    friend: friendReducer,
    friendRequest: friendRequestReducer
});

export default rootReducer;