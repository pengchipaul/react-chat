import authReducer from './authReducer';
import friendReducer from './friendReducer';
import friendRequestReducer from './friendRequestReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
    auth: authReducer,
    friend: friendReducer,
    friendRequest: friendRequestReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer;