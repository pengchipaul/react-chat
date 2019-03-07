const initState = {
    isLoaded: false,
    friends: null
};

function friendReducer(state = initState, action) {
    switch (action.type) {
        case "SHOW_FRIENDS":
            return {
                ...state,
                isLoaded: true,
                friends: action.data
            }
        default:
            return state;
    }
}

export default friendReducer;