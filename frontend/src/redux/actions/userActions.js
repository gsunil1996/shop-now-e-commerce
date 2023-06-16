import axios from "axios";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE, LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAILURE, GET_USER_PROFILE_REQUEST, GET_USER_PROFILE_SUCCESS, GET_USER_PROFILE_FAILURE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILURE, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAILURE } from "../actionTypes/userTypes";

export const loginAction = ({ email, password }) => async (dispatch) => {
    try {
        dispatch({
            type: LOGIN_REQUEST
        })

        const { data } = await axios.post(`http://localhost:4000/api/v1/login`, { email, password }, { withCredentials: true });

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data || {}
        })

    } catch (error) {
        console.log("checkError", error.message)
        dispatch({
            type: LOGIN_FAILURE,
            payload: error && error.message
        })
    }
}

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_USER_PROFILE_REQUEST
        })

        const { data } = await axios.get(`http://localhost:4000/api/v1/me`, { withCredentials: true });

        dispatch({
            type: GET_USER_PROFILE_SUCCESS,
            payload: data || {}
        })

    } catch (error) {
        // console.log("checkError", error.response.data.message, error)
        dispatch({
            type: GET_USER_PROFILE_FAILURE,
            payload: error && error.message
        })
    }
}

export const registerAction = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: REGISTER_USER_REQUEST
        })

        const { data } = await axios.post(`http://localhost:4000/api/v1/register`, formData, { withCredentials: true });

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data || {}
        })

    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAILURE,
            payload: error && error.message
        })
    }
}



export const logoutAction = () => async (dispatch) => {
    try {
        dispatch({
            type: LOGOUT_USER_REQUEST
        })

        const { data } = await axios.get(`http://localhost:4000/api/v1/logout`, { withCredentials: true });

        dispatch({
            type: LOGOUT_USER_SUCCESS,
            payload: data || {}
        })

    } catch (error) {
        //  console.log("checkError", error)
        dispatch({
            type: LOGOUT_USER_FAILURE,
            payload: error && error.message
        })
    }
}

// Update profile
export const updateProfileAction = (userData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PROFILE_REQUEST })

        const { data } = await axios.put('http://localhost:4000/api/v1/me/update', userData, { withCredentials: true })

        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAILURE,
            payload: error.message
        })
    }
}

// Update password
export const updatePasswordAction = (passwords) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PASSWORD_REQUEST })

        const { data } = await axios.put('http://localhost:4000/api/v1/password/update', passwords, { withCredentials: true })

        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAILURE,
            payload: error.message
        })
    }
}