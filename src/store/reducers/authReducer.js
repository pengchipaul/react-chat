const initState = {
    authError: null
};

function authReducer(state = initState, action){
    switch(action.type){
        case 'LOGIN_ERROR':
            console.log("Login failed");
            return {
                ...state,
                authError: 'Login failed'
            }
        case 'LOGIN_SUCCESS':
            console.log('Login success');
            return {
                ...state,
                authError: null
            }
        case 'LOGOUT_SUCCESS':
            console.log('Logout success');
            return state;
        default:
            return state;
    }
}

export default authReducer;