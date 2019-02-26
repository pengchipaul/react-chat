const initState = {
    userFound: null,
    isSearching: false,
    error: null
};

function friendRequestReducer(state = initState, action) {
    switch (action.type) {
        case "CREATE_FRIEND_REQUEST":
            console.log("friend request sent");
            return {
                ...state,
                error: null
            }
        case "CREATE_FRIEND_REQUEST_ERROR":
            console.log("failed to send friend request");
            console.log(action.error);
            return {
                ...state,
                error: action.error
            }
        case "START_SEARCHING":
            return {
                ...state,
                isSearching: true
            }
        case "USER_SEARCH_SUCCESS":
            console.log("user found");
            return {
                ...state,
                userFound: action.user,
                isSearching: false
            }
        case "USER_NOT_FOUND":
            console.log("user not found");
            return {
                ...state,
                userFound: null,
                isSearching: false
            }
        case "USER_SEARCH_ERROR":
            console.log("user search error");
            return {
                ...state,
                userFound: null,
                isSearching: false
            }
        default:
            return state;
    }

}

export default friendRequestReducer;