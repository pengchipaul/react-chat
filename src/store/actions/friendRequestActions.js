export const createFriendRequest = (friendRequest) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const currentUserUid = firebase.auth().currentUser.uid;
        firestore.collection('users').doc(currentUserUid).get()
            .then((res) => {
                return firestore.collection('users').doc(friendRequest.uid).collection('friendRequests').doc(currentUserUid).set({
                    message: friendRequest.message,
                    createdAt: new Date()
                })
            })
            .then(() => {
                dispatch({ type: 'CREATE_FRIEND_REQUEST', friendRequest });
            })
            .catch((error) => {
                dispatch({ type: 'CREATE_FRIEND_REQUEST_ERROR', error: error });
            });

    }
}

export const acceptFriendRequest = (requestId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const currentUserUid = firebase.auth().currentUser.uid;
        firestore.collection('users').doc(currentUserUid).collection('friends').doc(requestId).set({
            lastMessage: "Now let's start chat",
            createdAt: new Date()
        }).then(() => {
            firestore.collection('users').doc(currentUserUid).collection('friendRequests').doc(requestId).delete();
        }).then(() => {
            dispatch({ type: 'ACCEPT_FRIEND_REQUEST_SUCCESS' });
        }).catch((error) => {
            dispatch({ type: 'ACCEPT_FRIEND_REQUEST_ERROR', error: error });
        });
    }
}

export const deleteFriendRequest = (requestId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const currentUserUid = firebase.auth().currentUser.uid;

        firestore.collection('users').doc(currentUserUid).collection('friendRequests').doc(requestId).delete()
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

