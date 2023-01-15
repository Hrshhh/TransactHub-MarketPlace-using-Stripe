let redux_state;

if(window.localStorage.getItem('redux_auth')){
    redux_state = JSON.parse(window.localStorage.getItem("redux_auth"));
}
else{
    redux_state = null;
}

export const authReducer = (state = redux_state, action) => {
    switch(action.type) {
        case "LOGGED_IN":
        return {...state, ...action.payload};
        case "LOGGED_OUT":
        return action.payload;
        default:
        return state;
    }
}