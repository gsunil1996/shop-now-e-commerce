import axios from "axios";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE, LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAILURE, GET_USER_PROFILE_REQUEST, GET_USER_PROFILE_SUCCESS, GET_USER_PROFILE_FAILURE } from "../actionTypes/userTypes";

export const loginAction = ({ email, password }) => async (dispatch) => {
    try {
        dispatch({
            type: LOGIN_REQUEST
        })

        const { data } = await axios.post(`http://localhost:4000/api/v1/login`, { email, password });
        console.log("checkDAta", data);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data || {}
        })

    } catch (error) {
        console.log("checkError", error)
        dispatch({
            type: LOGIN_FAILURE,
            payload: error && error.message
        })
    }
}