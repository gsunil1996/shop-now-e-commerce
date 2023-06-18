import React, { useEffect, useState } from 'react';
import useStyles from "./CartStyles";
import { useDispatch, useSelector } from "react-redux";
import { decreaseQuantityAction, getCartAction, increaseQuantityAction, removeCartItem } from '../../redux/actions/cartActions';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Card, CardContent, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';



const Cart = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { getCart: { isLoading, isError, error, isSuccess, cartItems } } = useSelector((state) => state.cart);
    const { user } = useSelector(state => state.auth);
    console.log("cartItems", cartItems)

    useEffect(() => {
        if (user?._id) {
            dispatch(getCartAction({ userId: user?._id }))
        }
    }, [dispatch, user?._id])

    return (
        <div>
            {isLoading ? (<div style={{ width: "100%", marginTop: "50px" }} > <LinearProgress />  </div>) :
                isError ? (<div style={{ textAlign: "center", marginTop: "50px" }}>
                    <h1>{error}</h1>
                </div>) : isSuccess ? (
                    <div style={{ width: "90%", margin: "auto", marginTop: "10px", paddingBottom: "50px" }} >
                        <Grid container justifyContent='space-between'>
                            <Grid item xs={12} sm={12} md={8} lg={8} xl={8} >
                                <div>
                                    <h2>
                                        Your Cart: <span style={{ color: "#FA9C23" }} > {cartItems?.cart?.items?.length} items
                                        </span>
                                    </h2>
                                    {cartItems?.cart?.items?.map(item =>

                                        <Card Card style={{ marginBottom: "10px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }} >
                                            {console.log("ksjdbfodspi", item?.productId?.name)}
                                            <CardContent>
                                                <div className={classes.cardContainer} >
                                                    <div>
                                                        <img src={item?.productId?.images[0]?.url} alt="" style={{ maxWidth: "200px", maxHeight: "150px" }} />
                                                    </div>

                                                    <div className={classes.text}>
                                                        {item?.productId?.name}
                                                    </div>

                                                    <div>
                                                        <h2 style={{ color: "#FA9C23" }}> {item?.productId?.price}</h2>
                                                    </div>

                                                    <div className={classes.productMain} >
                                                        <div className={classes.productCountContainer}>
                                                            <Button
                                                                variant="contained"
                                                                color="secondary"
                                                                size='small'
                                                                onClick={() => dispatch(decreaseQuantityAction({
                                                                    userId: user?._id,
                                                                    productId: item?.productId?._id
                                                                }))}
                                                            >
                                                                -
                                                            </Button>
                                                            <div className={classes.productCount}> {item?.quantity}</div>
                                                            <Button
                                                                variant="contained"
                                                                color="primary"
                                                                size='small'
                                                                disabled={item?.productId?.stock == item?.quantity}
                                                                onClick={() => dispatch(increaseQuantityAction({
                                                                    userId: user?._id,
                                                                    productId: item?.productId?._id
                                                                }))}
                                                            >
                                                                +
                                                            </Button>
                                                        </div>
                                                        <div style={{ display: "flex", justifyContent: "center" }} >
                                                            <DeleteForeverIcon
                                                                style={{ fontSize: "40px", marginTop: "20px", color: "red", cursor: "pointer" }}
                                                                onClick={() => dispatch(removeCartItem({
                                                                    userId: user?._id,
                                                                    itemId: item?._id
                                                                }))}
                                                            />
                                                        </div>
                                                    </div>

                                                </div>
                                            </CardContent>
                                        </Card>
                                    )}
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                                <div>
                                    <h2>
                                        Summary
                                    </h2>
                                    <div>
                                        <Card style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", background: "#F2EDD7FF", color: "#755139FF" }}>
                                            <CardContent>
                                                <div style={{ textAlign: "center" }} >
                                                    <h3>Price Details</h3>
                                                    <hr />
                                                    <div style={{ display: "flex", justifyContent: "center", gap: "20px" }} >
                                                        <h4 style={{ marginBottom: "0px" }} >Total Items:</h4>
                                                        <h4 style={{ marginBottom: "0px" }}>{cartItems?.totalItems}</h4>
                                                    </div>
                                                    <div style={{ display: "flex", justifyContent: "center", gap: "20px" }} >
                                                        <h4>Total Amount:</h4>
                                                        <h4>{cartItems?.totalPrice}</h4>
                                                    </div>

                                                </div>

                                                <div style={{ display: "flex", justifyContent: "center" }} >
                                                    <Button
                                                        variant="contained"
                                                        size='large'
                                                        style={{ background: "#FA9C23", color: "#fff" }}
                                                    >
                                                        Checkout
                                                    </Button>
                                                </div>

                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                ) : ""
            }
        </div >
    )
}

export default Cart