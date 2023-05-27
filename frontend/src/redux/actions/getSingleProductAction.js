import axios from "axios";
import { GET_SINGLE_PRODUCT_REQUEST, GET_SINGLE_PRODUCT_SUCCESS, GET_SINGLE_PRODUCT_FAILURE } from "../actionTypes/productTypes";

export const getSingleProductAction = ({ id }) => async (dispatch) => {
    try {
        dispatch({
            type: GET_SINGLE_PRODUCT_REQUEST
        })

        const { data } = await axios.get(`http://localhost:4000/api/v1/product/${id}`)

        dispatch({
            type: GET_SINGLE_PRODUCT_SUCCESS,
            payload: data || {}
        })

    } catch (error) {
        dispatch({
            type: GET_SINGLE_PRODUCT_FAILURE,
            payload: error && error.message
        })
    }
}