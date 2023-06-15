import axios from "axios";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE, LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAILURE, GET_USER_PROFILE_REQUEST, GET_USER_PROFILE_SUCCESS, GET_USER_PROFILE_FAILURE } from "../actionTypes/userTypes";

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

export const registerAction = ({ name, email, password }) => async (dispatch) => {
    try {
        dispatch({
            type: REGISTER_USER_REQUEST
        })

        const { data } = await axios.post(`http://localhost:4000/api/v1/register`, { name, email, password });

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data || {}
        })

    } catch (error) {
        //  console.log("checkError", error)
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