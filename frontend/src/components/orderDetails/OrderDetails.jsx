import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getOrderDetails } from '../../redux/actions/orderActions';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Card, CardContent, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import useStyles from "./OrderDetailsStyles";
import { Link } from 'react-router-dom';
import { Alert, AlertTitle } from '@material-ui/lab';

const OrderDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();


    const { isLoading, isError, error, isSuccess, order } = useSelector(state => state.orderDetails)

    useEffect(() => {
        dispatch(getOrderDetails(id));
    }, [])

    let totalQuantity;

    if (order?.orderItems) {
        totalQuantity = order?.orderItems.reduce((total, item) => total + item.quantity, 0);
    }


    return (
        <div>
            <Helmet>
                <title>Order Details</title>
            </Helmet>
            <div>
                {isLoading ? (
                    <div
                        style={{ width: "100%", display: "flex", justifyContent: "center" }}
                    >
                        <LinearProgress style={{ width: "100%", marginTop: "20px" }} />
                    </div>
                ) : isError ? (
                    <div
                        style={{ width: "100%", display: "flex", justifyContent: "center" }}
                    >
                        <h4>{error}</h4>
                    </div>
                ) : isSuccess === true && Object.keys(order).length == 0 ? (
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            textAlign: "center",
                        }}
                    >
                        <h1>No Order Found</h1>
                    </div>
                ) : isSuccess ? (
                    <div style={{ width: "95%", margin: "auto" }}>
                        <div style={{ width: "90%", margin: "auto", marginTop: "10px", paddingBottom: "50px" }} >
                            <Grid container justifyContent='space-between'>
                                <Grid item xs={12} sm={12} md={8} lg={8} xl={8} >
                                    <div style={{ display: "flex", justifyContent: "flex-end" }} >
                                        <Button
                                            variant="contained"
                                            size="large"
                                            style={{ background: "#FA9C23", color: "#fff", marginTop: "30px" }}
                                            onClick={() => history.push("/orders/me")}
                                        >
                                            Back
                                        </Button>
                                    </div>
                                    <h4>Shipping Info</h4>
                                    <p><b>Name:</b> {order?.shippingInfo.name}</p>
                                    <p><b>Phone:</b> {order?.shippingInfo.phoneNo}</p>
                                    <p><b>Address:</b> {`${order?.shippingInfo.address}, ${order?.shippingInfo.city}, ${order?.shippingInfo.postalCode}`}</p>

                                    <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                                        <div>
                                            <h4>Delivery Status: </h4>
                                        </div>
                                        <div style={{ maxWidth: "min-content" }} >
                                            <Alert severity={order?.orderStatus == "Delivered" ? "success" : "info"}>
                                                <AlertTitle>{order?.orderStatus}</AlertTitle>
                                            </Alert>
                                        </div>
                                    </div>

                                    <hr />
                                    <div>

                                        {order?.orderItems?.map(item =>

                                            <Card Card style={{ marginBottom: "10px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }} >

                                                <CardContent>
                                                    <div className={classes.cardContainer} >
                                                        <Link to={`/product/${item?.product}`}>
                                                            <div>
                                                                <img src={item?.image} alt="" style={{ maxWidth: "200px", maxHeight: "150px" }} />
                                                            </div>
                                                        </Link>


                                                        <div className={classes.text} >
                                                            <Link to={`/product/${item?.produc}`} style={{ textDecoration: "none", color: "#000" }} >
                                                                {item?.name}
                                                            </Link>
                                                        </div>


                                                        <div>
                                                            <h2 style={{ color: "#FA9C23" }}> {item?.price}</h2>
                                                        </div>

                                                        <div className={classes.productMain} >
                                                            <div>
                                                                <div className={classes.productCount}> Quantity: {item?.quantity}</div>

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
                                            Price Details
                                        </h2>
                                        <div>
                                            <Card style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", background: "#F2EDD7FF", color: "#755139FF" }}>
                                                <CardContent>
                                                    <div style={{ textAlign: "center" }} >
                                                        <h3>Total Items: {totalQuantity}</h3>
                                                        <hr />

                                                        <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }} >
                                                            <h4 style={{ marginBottom: "0px" }} >Items Price:</h4>
                                                            <h4 style={{ marginBottom: "0px" }}>{order?.totalPrice}</h4>
                                                        </div>

                                                        <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }} >
                                                            <h4 style={{ marginBottom: "0px" }} >Shipping Price:</h4>
                                                            <h4 style={{ marginBottom: "0px" }}>{order?.shippingPrice}</h4>
                                                        </div>

                                                        <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }} >
                                                            <h4 style={{ marginBottom: "0px" }} >Tax:</h4>
                                                            <h4 style={{ marginBottom: "0px" }}>{order?.taxPrice}</h4>
                                                        </div>


                                                        <div style={{ display: "flex", justifyContent: "space-between", gap: "20px", borderTopStyle: 'dotted', marginTop: "10px" }} >
                                                            <h4>Total Amount:</h4>
                                                            <h4>{order?.totalPrice}</h4>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>

                        </div>
                    </div>
                ) : ""
                }
            </div>
        </div>
    )
}

export default OrderDetails