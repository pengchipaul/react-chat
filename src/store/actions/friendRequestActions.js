export const createFriendRequest = (friendRequest) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // database
        dispatch({ type: 'CREATE_FRIEND_REQUEST', friendRequest})
    }
}

