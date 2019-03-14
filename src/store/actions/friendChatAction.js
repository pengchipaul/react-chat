export const showFriendChat = (friendId) => {
    return (dispatch, getState) => {
        dispatch({ type: "SHOW_FRIEND_CHAT", data: friendId });
    }
}

export const sendChatMessage = (message) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const currentUserUid = firebase.auth().currentUser.uid;
        firestore.collection('users').doc(currentUserUid).collection('friends').doc(message.friendId).collection('chats').add({
            userId: currentUserUid,
            content: message.content,
            createdAt: new Date()
        }).then(() => {
            firestore.collection('users').doc(message.friendId).collection('friends').doc(currentUserUid).collection('chats').add({
                userId: currentUserUid,
                content: message.content,
                createdAt: new Date()
            })
        }).then(() => {
            dispatch({ type: "SEND_MESSAGE_SUCCESS" });
        }).catch((error) => {
            dispatch({type: "SEND_MESSAGE_ERROR", error: error})
        })
    }
}