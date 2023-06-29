import axios from 'axios'
import { ALL_ORDERS_FAIL, ALL_ORDERS_REQUEST, ALL_ORDERS_SUCCESS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, MY_ORDERS_FAIL, MY_ORDERS_REQUEST, MY_ORDERS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS } from '../actionTypes/orderTypes'

export const createOrder = (order) => async (dispatch) => {
    try {

        dispatch({ type: CREATE_ORDER_REQUEST })

        const { data } = await axios.post('http://localhost:4000/api/v1/order/new', order, { withCredentials: true })

        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get curretly logged in user orders
export const myOrders = () => async (dispatch) => {
    try {

        dispatch({ type: MY_ORDERS_REQUEST });

        const { data } = await axios.get('http://localhost:4000/api/v1/orders/me', { withCredentials: true })

        dispatch({
            type: MY_ORDERS_SUCCESS,
            payload: data.orders
        })

    } catch (error) {
        dispatch({
            type: MY_ORDERS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get order details
export const getOrderDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: ORDER_DETAILS_REQUEST });

        const { data } = await axios.get(`http://localhost:4000/api/v1/order/${id}`, { withCredentials: true })

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data.order
        })

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get all orders - ADMIN
export const allOrders = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_ORDERS_REQUEST });

        const { data } = await axios.get(`http://localhost:4000/api/v1/admin/orders`, { withCredentials: true })

        dispatch({
            type: ALL_ORDERS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_ORDERS_FAIL,
            payload: error.response.data.message
        })
    }
}