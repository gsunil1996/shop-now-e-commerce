import React, { useEffect, useState } from 'react';
import useStyles from "./CartStyles";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getCartAction } from '../../redux/actions/cartActions';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Card, CardContent, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


const Cart = () => {
    const classes = useStyles();
    const history = useHistory();
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
                    <div style={{ width: "90%", margin: "auto", marginTop: "10px" }} >
                        <Grid container justifyContent='space-between'>
                            <Grid item xs={12} sm={12} md={7} lg={7} xl={7} style={{ border: "2px solid red" }} >
                                <div>
                                    <h2>
                                        Your Cart: <span style={{ color: "#FA9C23" }} > {cartItems?.items?.length} items
                                        </span>
                                    </h2>
                                    <Card style={{ marginBottom: "10px" }} >
                                        <CardContent>
                                            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }} >
                                                <div>
                                                    <img src="https://rukminim1.flixcart.com/image/832/832/kflftzk0pkrrdj-0/spiritual-festive-decor/k/y/e/ad-42-dealfreez-original-imafw3sfsqgwsuzg.jpeg?q=70" alt="" style={{ maxWidth: "200px" }} />
                                                </div>

                                                <div style={{ maxWidth: "20%", fontWeight: 600 }} >
                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus natus labore porro nihil? Nesciunt nostrum saepe, inventore quos quas repellendus.
                                                </div>

                                                <div>
                                                    <h2 style={{ color: "#FA9C23" }}>1000</h2>
                                                </div>

                                                <div>
                                                    <div className={classes.productCountContainer}>
                                                        <Button variant="contained" color="secondary" size='small'>-</Button>
                                                        <div className={classes.productCount}>10</div>
                                                        <Button variant="contained" color="primary" size='small'>+</Button>
                                                    </div>
                                                    <div style={{ display: "flex", justifyContent: "center" }} >
                                                        <DeleteForeverIcon style={{ fontSize: "40px", marginTop: "20px", color: "red", cursor: "pointer" }} />
                                                    </div>
                                                </div>

                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} style={{ border: "2px solid green" }} >
                                hello
                            </Grid>
                        </Grid>
                    </div>
                ) : ""}
        </div>
    )
}

export default Cart