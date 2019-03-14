export const createFriendRequest = (friendRequest) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const currentUserUid = firebase.auth().currentUser.uid;
        firestore.collection('users').doc(currentUserUid).get()
            .then((res) => {
                return firestore.collection('users').doc(friendRequest.uid).collection('friendRequests').doc(currentUserUid).set({
                    message: friendRequest.message,
                    username: friendRequest.username,
                    email: friendRequest.email,
                    createdAt: new Date()
                })
            })
            .then(() => {
                dispatch({ type: 'CREATE_FRIEND_REQUEST' });
            })
            .catch((error) => {
                dispatch({ type: 'CREATE_FRIEND_REQUEST_ERROR', error: error });
            });

    }
}

export const acceptFriendRequest = (request) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        console.log(getState());
        const currentUser = getState().firebase.profile;
        const currentUserUid = getFirebase().auth().currentUser.uid;
        firestore.collection('users').doc(currentUserUid).collection('friends').doc(request.id).set({
            lastMessage: "Let's start chat",
            username: request.username,
            email: request.email,
            createdAt: new Date()
        }).then(() => {
            firestore.collection('users').doc(request.id).collection('friends').doc(currentUserUid).set({
                lastMessage: "Let's start chat",
                username: currentUser.username,
                email: currentUser.email,
                createdAt: new Date()
            });
        }).then(() => {
            firestore.collection('users').doc(currentUserUid).collection('friendRequests').doc(request.id).delete();
        }).then(() => {
            dispatch({ type: 'ACCEPT_FRIEND_REQUEST_SUCCESS' });
        }).catch((error) => {
            dispatch({ type: 'ACCEPT_FRIEND_REQUEST_ERROR', error: error });
        });
    }
}

export const deleteFriendRequest = (request) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const currentUserUid = firebase.auth().currentUser.uid;

        firestore.collection('users').doc(currentUserUid).collection('friendRequests').doc(request.id).delete()
            .then(() => {
                dispatch({ type: 'DELETE_FRIEND_REQUEST_SUCCESS' });
            }).catch((error) => {
                dispatch({ type: 'DELETE_FRIEND_REQUEST_ERROR', error: error });
            });
    }
}

export const searchByEmail = (email) => {
    return (dispatch, getState, { getFirestore }) => {
        dispatch({ type: "START_SEARCHING" });
        const firestore = getFirestore();
        return firestore.collection('users').where("email", "==", email).get()
            .then((res) => {
                if (res.empty) {
                    dispatch({ type: "USER_NOT_FOUND" });
                } else {
                    var user;
                    res.forEach((doc) => {
                        user = doc.data();
                        user = {
                            ...user,
                            uid: doc.id
                        }
                    });
                    dispatch({ type: "USER_SEARCH_SUCCESS", user: user });
                }

            })
            .catch((error) => {
                console.log(error);
                dispatch({ type: "USER_SEARCH_ERROR" });
            });

    }
}

