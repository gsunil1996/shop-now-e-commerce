import axios from "axios";
import { GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE, GET_SINGLE_PRODUCT_REQUEST, GET_SINGLE_PRODUCT_SUCCESS, GET_SINGLE_PRODUCT_FAILURE } from "../actionTypes/productTypes";

export const getProductsAction = ({ search, category, priceLTE, priceGTE, ratings, page }) => async (dispatch) => {
    try {

        dispatch({
            type: GET_PRODUCTS_REQUEST
        })

        const { data } = await axios.get(`http://localhost:4000/api/v1/products?search=${search}&category=${category}&price[lte]=${priceLTE}&price[gte]=${priceGTE}&ratings[gte]=${ratings}&page=${page}`);

        dispatch({
            type: GET_PRODUCTS_SUCCESS,
            payload: data || {}
        })

    } catch (error) {
        // console.log("checkError", error, error.response)
        dispatch({
            type: GET_PRODUCTS_FAILURE,
            payload: error && error.message
        })
    }
}

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