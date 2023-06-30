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
    GET_USER_PROFILE_RESET,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE,
    UPDATE_PROFILE_RESET,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAILURE,
    UPDATE_PASSWORD_RESET,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE,
    FORGOT_PASSWORD_RESET,
    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_FAILURE,
    NEW_PASSWORD_RESET,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    DELETE_USER_RESET,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    UPDATE_USER_RESET,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL
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
                    isLoading: true,
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
                    isLoading: true,
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
                    isLoading: true,
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
                    isLoading: true,
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

const userInitialState = {
    updateProfile: {
        isLoading: false,
        isError: false,
        error: null,
        isSuccess: false,
    },
    updatePassword: {
        isLoading: false,
        isError: false,
        error: null,
        isSuccess: false,
    },
    updateUser: {
        isLoading: false,
        isError: false,
        error: null,
        isSuccess: false,
    },
    deleteUser: {
        isLoading: false,
        isError: false,
        error: null,
        isSuccess: false,
        isDeleted: false
    },
    getAllusers: {
        isLoading: false,
        isError: false,
        error: null,
        isSuccess: false,
        data: []
    },
    getSingleUserDetails: {
        isLoading: false,
        isError: false,
        error: null,
        isSuccess: false,
        data: {}
    }
}

export const userReducer = (state = userInitialState, action) => {
    switch (action.type) {

        case UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                updateProfile: {
                    isLoading: true,
                    isError: false,
                    error: null,
                    isSuccess: false,
                }
            }

        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                updateProfile: {
                    ...state.updateProfile,
                    isLoading: false,
                    isSuccess: true,
                }
            }

        case UPDATE_PROFILE_FAILURE:
            return {
                ...state,
                updateProfile: {
                    ...state.updateProfile,
                    isLoading: false,
                    isError: true,
                    error: action.payload,
                }
            }

        case UPDATE_PROFILE_RESET:
            return {
                ...state,
                updateProfile: {
                    isLoading: false,
                    isError: false,
                    error: null,
                    isSuccess: false,
                }
            }

        case UPDATE_PASSWORD_REQUEST:
            return {
                ...state,
                updatePassword: {
                    isLoading: true,
                    isError: false,
                    error: null,
                    isSuccess: false,
                }
            }
        case UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                updatePassword: {
                    ...state.updatePassword,
                    isLoading: false,
                    isSuccess: true,
                }
            }
        case UPDATE_PASSWORD_FAILURE:
            return {
                ...state,
                updatePassword: {
                    ...state.updatePassword,
                    isLoading: false,
                    isError: true,
                    error: action.payload,
                }
            }

        case UPDATE_PASSWORD_RESET:
            return {
                ...state,
                updatePassword: {
                    isLoading: false,
                    isError: false,
                    error: null,
                    isSuccess: false,
                }
            }

        case ALL_USERS_REQUEST:
            return {
                ...state,
                getAllusers: {
                    isLoading: true,
                    isError: false,
                    error: null,
                    isSuccess: false,
                }
            }

        case ALL_USERS_SUCCESS:
            return {
                ...state,
                getAllusers: {
                    ...state.getAllusers,
                    isLoading: false,
                    isSuccess: true,
                    data: action.payload
                }
            }

        case ALL_USERS_FAIL:
            return {
                ...state,
                getAllusers: {
                    ...state.getAllusers,
                    isLoading: false,
                    isError: true,
                    error: action.payload,
                }
            }

        case DELETE_USER_REQUEST:
            return {
                ...state,
                deleteUser: {
                    isLoading: true,
                    isError: false,
                    error: null,
                    isSuccess: false,
                }
            }

        case DELETE_USER_SUCCESS:
            return {
                ...state,
                deleteUser: {
                    ...state.deleteUser,
                    isLoading: false,
                    isSuccess: true,
                }
            }

        case DELETE_USER_FAIL:
            return {
                ...state,
                deleteUser: {
                    ...state.deleteUser,
                    isLoading: false,
                    isError: true,
                    error: action.payload,
                }
            }

        case DELETE_USER_RESET:
            return {
                ...state,
                deleteUser: {
                    isLoading: false,
                    isError: false,
                    error: null,
                    isSuccess: false,
                }
            }

        case UPDATE_USER_REQUEST:
            return {
                ...state,
                updateUser: {
                    isLoading: true,
                    isError: false,
                    error: null,
                    isSuccess: false,
                }
            }

        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                updateUser: {
                    ...state.updateUser,
                    isLoading: false,
                    isSuccess: true,
                }
            }

        case UPDATE_USER_FAIL:
            return {
                ...state,
                updateUser: {
                    ...state.updateUser,
                    isLoading: false,
                    isError: true,
                    error: action.payload,
                }
            }

        case UPDATE_USER_RESET:
            return {
                ...state,
                updateUser: {
                    isLoading: false,
                    isError: false,
                    error: null,
                    isSuccess: false,
                }
            }


        case USER_DETAILS_REQUEST:
            return {
                ...state,
                getSingleUserDetails: {
                    isLoading: true,
                    isError: false,
                    error: null,
                    isSuccess: false,
                }
            }

        case USER_DETAILS_SUCCESS:
            return {
                ...state,
                getSingleUserDetails: {
                    ...state.getSingleUserDetails,
                    isLoading: false,
                    isSuccess: true,
                    data: action.payload
                }
            }

        case USER_DETAILS_FAIL:
            return {
                ...state,
                getSingleUserDetails: {
                    ...state.getSingleUserDetails,
                    isLoading: false,
                    isError: true,
                    error: action.payload,
                }
            }

        default:
            return state
    }
}

const forgotPasswordInitialState = {
    forgotPassword: {
        isLoading: false,
        isError: false,
        error: null,
        isSuccess: false,
        message: ""
    },
    newPassword: {
        isLoading: false,
        isError: false,
        error: null,
        isSuccess: false,
    }
}

export const forgotPasswordReducer = (state = forgotPasswordInitialState, action) => {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
            return {
                ...state,
                forgotPassword: {
                    isLoading: true,
                    isError: false,
                    error: null,
                    isSuccess: false,
                    message: ""
                }
            }
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                forgotPassword: {
                    ...state.forgotPassword,
                    isLoading: false,
                    isSuccess: true,
                    message: action.payload
                }
            }
        case FORGOT_PASSWORD_FAILURE:
            return {
                ...state,
                forgotPassword: {
                    ...state.forgotPassword,
                    isLoading: false,
                    isError: true,
                    error: action.payload,
                }
            }

        case FORGOT_PASSWORD_RESET:
            return {
                ...state,
                forgotPassword: {
                    isLoading: false,
                    isError: false,
                    error: null,
                    isSuccess: false,
                    message: ""
                }
            }

        case NEW_PASSWORD_REQUEST:
            return {
                ...state,
                newPassword: {
                    isLoading: true,
                    isError: false,
                    error: null,
                    isSuccess: false,
                }
            }
        case NEW_PASSWORD_SUCCESS:
            return {
                ...state,
                newPassword: {
                    ...state.newPassword,
                    isLoading: false,
                    isSuccess: true,
                }
            }
        case NEW_PASSWORD_FAILURE:
            return {
                ...state,
                newPassword: {
                    ...state.newPassword,
                    isLoading: false,
                    isError: true,
                    error: action.payload,
                }
            }
        case NEW_PASSWORD_RESET:
            return {
                ...state,
                newPassword: {
                    isLoading: false,
                    isError: false,
                    error: null,
                    isSuccess: false,
                }
            }
        default:
            return state
    }
}