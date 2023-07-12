import axios from "axios";
import { GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE, GET_SINGLE_PRODUCT_REQUEST, GET_SINGLE_PRODUCT_SUCCESS, GET_SINGLE_PRODUCT_FAILURE, NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, NEW_REVIEW_FAIL, ADMIN_PRODUCTS_REQUEST, ADMIN_PRODUCTS_SUCCESS, ADMIN_PRODUCTS_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, NEW_PRODUCT_REQUEST, NEW_PRODUCT_SUCCESS, NEW_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAIL, GET_REVIEWS_REQUEST, GET_REVIEWS_SUCCESS, GET_REVIEWS_FAIL, DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, DELETE_REVIEW_FAIL } from "../actionTypes/productTypes";
import { severUrl } from "../../api/api";

export const getProductsAction = ({ search, category, priceLTE, priceGTE, ratings, page }) => async (dispatch) => {
    try {

        dispatch({
            type: GET_PRODUCTS_REQUEST
        })

        const { data } = await axios.get(`${severUrl}/api/v1/products?search=${search}&category=${category}&price[lte]=${priceLTE}&price[gte]=${priceGTE}&ratings[gte]=${ratings}&page=${page}`);

        dispatch({
            type: GET_PRODUCTS_SUCCESS,
            payload: data || {}
        })

    } catch (error) {
        // console.log("checkError", error, error.response)
        dispatch({
            type: GET_PRODUCTS_FAILURE,
            payload: error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const getSingleProductAction = ({ id }) => async (dispatch) => {
    try {
        dispatch({
            type: GET_SINGLE_PRODUCT_REQUEST
        })

        const { data } = await axios.get(`${severUrl}/api/v1/product/${id}`)

        dispatch({
            type: GET_SINGLE_PRODUCT_SUCCESS,
            payload: data || {}
        })

    } catch (error) {
        dispatch({
            type: GET_SINGLE_PRODUCT_FAILURE,
            payload: error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const newReview = (reviewData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_REVIEW_REQUEST })

        const { data } = await axios.put(`${severUrl}/api/v1/review`, reviewData, { withCredentials: true })

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getAdminProducts = () => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_PRODUCTS_REQUEST })

        const { data } = await axios.get(`${severUrl}/api/v1/admin/products`, { withCredentials: true })

        dispatch({
            type: ADMIN_PRODUCTS_SUCCESS,
            payload: data.products
        })

    } catch (error) {

        dispatch({
            type: ADMIN_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete product (Admin)
export const deleteProduct = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_PRODUCT_REQUEST })

        const { data } = await axios.delete(`${severUrl}/api/v1/admin/product/${id}`, { withCredentials: true })


        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data.success
        })

        dispatch(getAdminProducts())

    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newProduct = (productData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_PRODUCT_REQUEST })

        const { data } = await axios.post(`${severUrl}/api/v1/admin/product/new`, productData, { withCredentials: true })

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update Product (ADMIN)
export const updateProduct = (id, productData) => async (dispatch) => {

    try {

        dispatch({ type: UPDATE_PRODUCT_REQUEST })

        const { data } = await axios.put(`${severUrl}/api/v1/admin/product/${id}`, productData, { withCredentials: true })

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}
// Get product reviews
export const getProductReviews = (id) => async (dispatch) => {
    try {

        dispatch({ type: GET_REVIEWS_REQUEST })

        const { data } = await axios.get(`${severUrl}/api/v1/reviews?id=${id}`, { withCredentials: true })

        dispatch({
            type: GET_REVIEWS_SUCCESS,
            payload: data.reviews
        })

    } catch (error) {

        dispatch({
            type: GET_REVIEWS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete product review
export const deleteReview = (id, productId) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_REVIEW_REQUEST })

        const { data } = await axios.delete(`${severUrl}/api/v1/reviews?id=${id}&productId=${productId}`, { withCredentials: true })

        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {

        // console.log(error.response);

        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}