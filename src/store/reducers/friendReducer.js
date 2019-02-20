const initState = {
    friends: [
        {id: '1', username: 'test 1', email: 'test1@test.com', status: ''},
        {id: '2', username: 'test 2', email: 'test2@test.com', status: 'I am good'},
        {id: '3', username: 'test 3', email: 'test3@test.com', status: 'I am not good'}
    ]
};

function friendReducer(state = initState, action){
    return state;
}

export default friendReducer;