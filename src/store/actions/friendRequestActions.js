function friendRequestActions (friendRequest) {
    return (dispatch, getState) => {
        // database
        dispatch({ type: 'CREATE_FRIEND_REQUEST', friendRequest})
    }
}