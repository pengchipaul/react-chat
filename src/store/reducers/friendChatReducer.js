const initState = {
    isLoaded: false,
    selectedChat: null,
    chats: null
}

function friendChatReducer(state = initState, action) {
    switch (action.type) {
        case "LOADING_FRIEND_CHAT":
            console.log("loading friend chat");
            return {
                ...state,
                isLoaded: false
            }
        case "SHOW_FRIEND_CHAT":
            console.log("show friend chat of user: ", action.data);
            return {
                ...state,
                isLoaded: true,
                selectedChat: action.data
            }
        case "SEND_MESSAGE_SUCCESS":
            console.log("message sent");
            return state;
        case "SEND_MESSAGE_ERROR":
            console.log("send message error: ", action.error);
            return state;
        default:
            return state;
    }
}

export default friendChatReducer;