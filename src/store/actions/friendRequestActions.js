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
        const firestore = getFirestore();
        console.log(getState());
        const currentUser = getState().firebase.profile;
        const currentUserUid = getFirebase().auth().currentUser.uid;
        firestore.collection('users').doc(currentUserUid).collection('friends').doc(requestId).set({
            lastMessage: "Now let's start chat",
            createdAt: new Date()
        }).then(() => {
            firestore.collection('users').doc(requestId).collection('friends').doc(currentUserUid).set({
                lastMessage: currentUser.username + " has accepted your friend request",
                createdAt: new Date()
            });
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

export const showFriendRequests = (requestList) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        let friendRequests = [];
        var totalRequests = requestList.length;
        if (totalRequests === 0) {
            dispatch({ type: 'SHOW_FRIEND_REQUESTS', data: [] });
        } else {
            requestList.forEach((request) => {
                var username, email;
                firestore.collection('users').doc(request.id).get().then((res) => {
                    username = res.data().username;
                    email = res.data().email;
                    friendRequests.push({
                        id: request.id,
                        username: username,
                        email: email,
                        message: request.message
                    });
                    totalRequests--;
                    if (totalRequests === 0) {
                        dispatch({ type: 'SHOW_FRIEND_REQUESTS', data: friendRequests });
                    }
                });
            });
        }

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

