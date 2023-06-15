import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_RESET,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE,
    REGISTER_USER_RESET,
    LOGOUT_USER_REQUEST,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAILURE,
    LOGOUT_USER_RESET,
    GET_USER_PROFILE_REQUEST,
    GET_USER_PROFILE_SUCCESS,
    GET_USER_PROFILE_FAILURE,
    GET_USER_PROFILE_RESET
} from "../actionTypes/userTypes";

const authInitialState = {
    user: {},
    token: null,
    isAuthenticated: false,

    login: {
        isLoading: false,
        isError: false,
        error: null,
        isSuccess: false,
    },

    register: {
        isLoading: false,
        isError: false,
        error: null,
        isSuccess: false,
    },

    logout: {
        isLoading: false,
        isError: false,
        error: null,
        isSuccess: false,
    },

    profile: {
        isLoading: false,
        isError: false,
        error: null,
        isSuccess: false,
    }
};

export const authReducer = (state = authInitialState, action) => {
    switch (action.type) {

        case LOGIN_REQUEST:
            return {
                ...state,
                user: {},
                token: null,
                isAuthenticated: false,
                login: {
                    isLoading: false,
                    isError: false,
                    error: null,
                    isSuccess: false,
                }
            }

        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true,
                login: {
                    ...state.login,
                    isLoading: false,
                    isSuccess: true,
                }
            }

        case LOGIN_FAILURE:
            return {
                ...state,
                user: {},
                token: null,
                isAuthenticated: false,
                login: {
                    ...state.login,
                    isLoading: false,
                    isError: true,
                    error: action.payload,
                }
            }

        case LOGIN_RESET:
            return {
                ...state,
                login: {
                    isLoading: false,
                    isError: false,
                    error: null,
                    isSuccess: false,
                }
            }

        case REGISTER_USER_REQUEST:
            return {
                ...state,
                user: {},
                token: null,
                isAuthenticated: false,
                register: {
                    isLoading: false,
                    isError: false,
                    error: null,
                    isSuccess: false,
                }
            }

        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true,
                register: {
                    ...state.register,
                    isLoading: false,
                    isSuccess: true,
                }
            }

        case REGISTER_USER_FAILURE:
            return {
                ...state,
                user: {},
                token: null,
                isAuthenticated: false,
                register: {
                    ...state.register,
                    isLoading: false,
                    isError: true,
                    error: action.payload,
                }
            }

        case REGISTER_USER_RESET:
            return {
                ...state,
                register: {
                    isLoading: false,
                    isError: false,
                    error: null,
                    isSuccess: false,
                }
            }

        case LOGOUT_USER_REQUEST:
            return {
                ...state,
                logout: {
                    isLoading: false,
                    isError: false,
                    error: null,
                    isSuccess: false,
                }
            };

        case LOGOUT_USER_SUCCESS:
            return {
                ...state,
                user: {},
                token: null,
                isAuthenticated: false,
                logout: {
                    ...state.logout,
                    isLoading: false,
                    isSuccess: true,
                }
            };

        case LOGOUT_USER_FAILURE:
            return {
                ...state,
                logout: {
                    ...state.logout,
                    isLoading: false,
                    isError: true,
                    error: action.payload,
                }
            };

        case LOGOUT_USER_RESET:
            return {
                ...state,
                logout: {
                    isLoading: false,
                    isError: false,
                    error: null,
                    isSuccess: false,
                }
            }

        case GET_USER_PROFILE_REQUEST:
            return {
                ...state,
                user: {},
                token: null,
                isAuthenticated: false,
                profile: {
                    isLoading: false,
                    isError: false,
                    error: null,
                    isSuccess: false,
                }
            };

        case GET_USER_PROFILE_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                isAuthenticated: true,
                profile: {
                    ...state.profile,
                    isLoading: false,
                    isSuccess: true,
                }
            };

        case GET_USER_PROFILE_FAILURE:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    isLoading: false,
                    isError: true,
                    error: action.payload,
                }
            }

        case GET_USER_PROFILE_RESET:
            return {
                ...state,
                profile: {
                    isLoading: false,
                    isError: false,
                    error: null,
                    isSuccess: false,
                }
            }

        default:
            return state;
    }
}

