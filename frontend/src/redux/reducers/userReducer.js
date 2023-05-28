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
    LOGOUT_USER_RESET,
    GET_USER_PROFILE_REQUEST,
    GET_USER_PROFILE_SUCCESS,
    GET_USER_PROFILE_FAILURE,
    LOGIN_RESET,
} from "../actionTypes/userTypes";

const authInitialState = {


    user: {},
    token: localStorage.getItem("token"),
    isAuthenticated: false,

    // login
    isLoading: false,
    isError: false,
    error: null,
    isSuccess: false,

    // register
    isRegisterLoading: false,
    isRegisterError: false,
    Registererror: null,
    isRegisterSuccess: false,

    // logout
    isLogoutLoading: false,
    isLogoutError: false,
    Logouterror: null,
    isLogoutSuccess: false,

    // profile
    isProfileLoading: false,
    isProfileError: false,
    Profileerror: null,
    isProfileSuccess: false,

};

export const authReducer = (state = authInitialState, action) => {
    switch (action.type) {

        case LOGIN_REQUEST:
            return {
                ...state,
                user: {},
                token: null,
                isLoading: true,
                isError: false,
                error: null,
                isSuccess: false,
                isAuthenticated: false,
            }

        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token
            }

        case LOGIN_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                user: {},
                token: null,
                isLoading: false,
                isError: true,
                error: action.payload,
                isSuccess: false,
            }

        case LOGIN_RESET:
            return {
                ...state,
                isLoading: false,
                isError: false,
                error: null,
                isSuccess: false,
            }

        case REGISTER_USER_REQUEST:
            return {
                ...state,
                user: {},
                token: null,
                isAuthenticated: false,
                isRegisterLoading: false,
                isRegisterError: false,
                Registererror: null,
                isRegisterSuccess: false,
            }

        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                isRegisterLoading: false,
                isRegisterSuccess: true,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token
            }

        case REGISTER_USER_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                user: {},
                token: null,
                isRegisterLoading: false,
                isRegisterError: true,
                Registererror: action.payload,
                isRegisterSuccess: false,
            }

        case LOGOUT_USER_REQUEST:
            return {
                ...state,
                isLogoutLoading: true,
                isLogoutError: false,
                Logouterror: null,
                isLogoutSuccess: false,
            };

        case LOGOUT_USER_SUCCESS:
            return {
                ...state,
                user: {},
                token: null,
                isAuthenticated: false,
                isLogoutLoading: false,
                isLogoutSuccess: true,
            };

        case LOGOUT_USER_FAILURE:
            return {
                ...state,
                isLogoutLoading: false,
                isLogoutError: true,
                Logouterror: action.payload,
                isLogoutSuccess: false,
            };

        case LOGOUT_USER_RESET:
            return {
                ...state,
                isLogoutLoading: false,
                isLogoutError: false,
                Logouterror: null,
                isLogoutSuccess: false,
            }

        case GET_USER_PROFILE_REQUEST:
            return {
                ...state,
                user: {},
                token: localStorage.getItem("token"),
                isAuthenticated: false,
                isProfileLoading: false,
                isProfileError: false,
                Profileerror: null,
                isProfileSuccess: false,
            };

        case GET_USER_PROFILE_SUCCESS:
            return {
                ...state,
                isProfileLoading: false,
                isProfileSuccess: true,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token
            };

        case GET_USER_PROFILE_FAILURE:
            return {
                ...state,
                isProfileLoading: false,
                isProfileError: true,
                Profileerror: action.payload,
                isProfileSuccess: false,
            };

        default:
            return state;
    }
};

