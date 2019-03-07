export const showFriends = (friendList) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        let friends = [];
        var totalFriends = friendList.length;
        if (totalFriends === 0) {
            dispatch({ type: 'SHOW_FRIENDS', data: [] });
        } else {
            friendList.forEach((friend) => {
                var username, email;
                firestore.collection('users').doc(friend.id).get().then((res) => {
                    username = res.data().username;
                    email = res.data().email;
                    friends.push({
                        id: friend.id,
                        username: username,
                        email: email,
                        lastMessage: friend.lastMessage
                    });
                    totalFriends--;
                    if (totalFriends === 0) {
                        dispatch({ type: 'SHOW_FRIENDS', data: friends });
                    }
                });
            });
        }

    }
}