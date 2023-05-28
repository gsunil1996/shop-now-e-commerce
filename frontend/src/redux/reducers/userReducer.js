import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE,
    LOGOUT_USER_REQUEST,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAILURE,
    GET_USER_PROFILE_REQUEST,
    GET_USER_PROFILE_SUCCESS,
    GET_USER_PROFILE_FAILURE,
} from "../actionTypes/userTypes";

const authInitialState = {
    user: {},
    isLoading: false,
    isError: false,
    error: null,
    isSuccess: false,
    isAuthenticated: false,
};

// export const authReducer = (state = authInitialState, action) => {
//     switch (action.type) {
//         case LOGIN_REQUEST:
//         case REGISTER_USER_REQUEST:
//         case GET_USER_PROFILE_REQUEST:
//             return {
//                 ...state,
//                 user: {},
//                 isLoading: true,
//                 isError: false,
//                 error: null,
//                 isSuccess: false,
//                 isAuthenticated: false,
//             };

//         case LOGIN_SUCCESS:
//         case REGISTER_USER_SUCCESS:
//         case GET_USER_PROFILE_SUCCESS:
//             return {
//                 ...state,
//                 isLoading: false,
//                 isSuccess: true,
//                 isAuthenticated: true,
//                 user: action.payload,
//             };

//         case LOGOUT_USER_REQUEST:
//             return {
//                 ...state,
//                 isLoading: true,
//                 isError: false,
//                 error: null,
//                 isSuccess: false,
//             };

//         case LOGOUT_USER_SUCCESS:
//             return {
//                 ...state,
//                 user: {},
//                 isLoading: false,
//                 isSuccess: true,
//                 isAuthenticated: false,
//             };

//         case GET_USER_PROFILE_FAILURE:
//         case LOGOUT_USER_FAILURE:
//             return {
//                 ...state,
//                 isLoading: false,
//                 isError: true,
//                 error: action.payload,
//                 isSuccess: false,
//                 isAuthenticated: false,
//                 user: {},
//             };

//         case LOGIN_FAILURE:
//         case REGISTER_USER_FAILURE:
//             return {
//                 ...state,
//                 isLoading: false,
//                 isError: true,
//                 error: action.payload,
//                 isSuccess: false,
//                 isAuthenticated: false,
//                 user: {},
//             };

//         default:
//             return state;
//     }
// };

export const authReducer = (state = { user: {} }, action) => {
    switch (action.type) {

        case LOGIN_REQUEST:
        case REGISTER_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            }

        case LOGIN_SUCCESS:
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }

        case LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }

        case "CLEAR_ERRORS":
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}
