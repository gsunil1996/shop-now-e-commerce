import axios from 'axios';
import { ADD_TO_CART_FAILURE, ADD_TO_CART_REQUEST, ADD_TO_CART_SUCCESS, DECREASE_CART_ITEM_FAILURE, DECREASE_CART_ITEM_REQUEST, DECREASE_CART_ITEM_SUCCESS, GET_CART_FAILURE, GET_CART_REQUEST, GET_CART_SUCCESS, INCREASE_CART_ITEM_FAILURE, INCREASE_CART_ITEM_REQUEST, INCREASE_CART_ITEM_SUCCESS, REMOVE_CART_ITEM_FAILURE, REMOVE_CART_ITEM_REQUEST, REMOVE_CART_ITEM_SUCCESS, SAVE_SHIPPING_INFO } from "../actionTypes/cartTypes";

export const getCartAction = ({ userId }) => async (dispatch) => {

    try {
        dispatch({ type: GET_CART_REQUEST });

        const response = await axios.get(`http://localhost:4000/api/v1/cart?userId=${userId}`, { withCredentials: true });

        dispatch({
            type: GET_CART_SUCCESS,
            payload: response.data,
        });


    } catch (error) {
        dispatch({
            type: GET_CART_FAILURE,
            payload: error.response.data.message,
        });
    }
};

export const addToCartAction = ({ userId, products }) => async (dispatch) => {
    try {
        dispatch({ type: ADD_TO_CART_REQUEST });

        const response = await axios.post('http://localhost:4000/api/v1/cart/add', { userId, products }, { withCredentials: true });

        dispatch({
            type: ADD_TO_CART_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: ADD_TO_CART_FAILURE,
            payload: error.response.data.message,
        });
    }
};

// export const removeCartItem = ({ userId, itemId }) => async (dispatch) => {
//     try {
//         dispatch({ type: REMOVE_CART_ITEM_REQUEST });

//         const response = await axios.delete('http://localhost:4000/api/v1/cart/remove', { userId, itemId }, { withCredentials: true });
//         dispatch({
//             type: REMOVE_CART_ITEM_SUCCESS,
//             payload: response.data,
//         });
//         dispatch(getCartAction({ userId }))
//     } catch (error) {
//         dispatch({
//             type: REMOVE_CART_ITEM_FAILURE,
//             payload: error.response.data.message,
//         });
//     }
// };

export const removeCartItem = ({ userId, itemId }) => async (dispatch) => {
    try {
        dispatch({ type: REMOVE_CART_ITEM_REQUEST });

        const config = {
            withCredentials: true,
            data: { userId, itemId }, // Pass the payload here
        };

        const response = await axios.delete(
            'http://localhost:4000/api/v1/cart/remove',
            config
        );

        dispatch({
            type: REMOVE_CART_ITEM_SUCCESS,
            payload: response.data,
        });
        dispatch(getCartAction({ userId }));
    } catch (error) {
        dispatch({
            type: REMOVE_CART_ITEM_FAILURE,
            payload: error.response.data.message,
        });
    }
};


export const increaseQuantityAction = ({ userId, productId }) => async (dispatch) => {
    try {
        dispatch({ type: INCREASE_CART_ITEM_REQUEST });

        const response = await axios.patch('http://localhost:4000/api/v1/cart/increase', { userId, productId }, { withCredentials: true });

        dispatch({
            type: INCREASE_CART_ITEM_SUCCESS,
            payload: response.data,
        });
        dispatch(getCartAction({ userId }))
    } catch (error) {
        dispatch({
            type: INCREASE_CART_ITEM_FAILURE,
            payload: error.response.data.message,
        });
    }
};

export const decreaseQuantityAction = ({ userId, productId }) => async (dispatch) => {
    try {
        dispatch({ type: DECREASE_CART_ITEM_REQUEST });

        const response = await axios.patch('http://localhost:4000/api/v1/cart/decrease', { userId, productId }, { withCredentials: true });

        dispatch({
            type: DECREASE_CART_ITEM_SUCCESS,
            payload: response.data,
        });
        dispatch(getCartAction({ userId }))
    } catch (error) {
        dispatch({
            type: DECREASE_CART_ITEM_FAILURE,
            payload: error.response.data.message,
        });
    }
};

export const saveShippingInfo = (data) => async (dispatch) => {

    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data
    })

    localStorage.setItem('shippingInfo', JSON.stringify(data))

}