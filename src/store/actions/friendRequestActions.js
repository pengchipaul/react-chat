export const createFriendRequest = (friendRequest) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        console.log(friendRequest);
        console.log(firebase.auth().currentUser.uid);
        dispatch({ type: 'CREATE_FRIEND_REQUEST', friendRequest })
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

