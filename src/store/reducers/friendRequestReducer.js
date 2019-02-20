const initState = {
    friendRequests: [
        {id: '1', senderId: '1', senderName: 'test 1', email: 'test1@test.com', status: ''},
        {id: '2', senderId: '2', senderName: 'test 2', email: 'test2@test.com', status: 'I am good'},
        {id: '3', senderId: '3', senderName: 'test 3', email: 'test3@test.com', status: 'I am not good'}
    ]
};

function friendRequestReducer(state = initState, action){
    return state;
}

export default friendRequestReducer;