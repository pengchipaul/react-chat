const initState = {
    
};

function friendRequestReducer(state = initState, action){
    switch (action.type) {
        case "CREATE_FRIEND_REQUEST":
            console.log("friend request sent",action.friendRequest);
            return state;
        default:
            return state;
    }

}

export default friendRequestReducer;