import authReducer from './authReducer';
import friendReducer from './friendReducer';
import friendRequestReducer from './friendRequestReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const appReducer = combineReducers({
    auth: authReducer,
    friend: friendReducer,
    friendRequest: friendRequestReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT_SUCCESS') {
        state = undefined;
    }
    return appReducer(state, action);
}


export default rootReducer;