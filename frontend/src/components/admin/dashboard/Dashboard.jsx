import React, { useEffect } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux'
import { getAdminProducts } from '../../../redux/actions/productActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from "react-router-dom";
import { allUsers } from '../../../redux/actions/userActions';
import { allOrders } from '../../../redux/actions/orderActions';
import { Helmet } from 'react-helmet';


const Dashboard = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { data, isLoading, isError, error, isSuccess } = useSelector(state => state.adminGetAllProducts);
    const { getAllusers: { data: allusersData, isLoading: allUsersIsLoading, isError: allUsersIsError, error: allUsersError, isSuccess: allUsersIsSuccess } } = useSelector(state => state.user);
    const { data: allOrdersData, isLoading: allOrdersIsLoading, isError: allOrdersIsError, error: allOrdersError, isSuccess: allOrdersIsSuccess } = useSelector(state => state.adminGetAllOrders);

    useEffect(() => {
        dispatch(getAdminProducts())
        dispatch(allUsers())
        dispatch(allOrders())
    }, [dispatch])

    return (
        <div>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            <div>
                <Card style={{ background: "#1976D2", color: "#fff" }} >
                    <CardContent>
                        <div style={{ textAlign: "center" }} >
                            <h1>Total Amount</h1>
                            {allOrdersIsLoading ? <div style={{ width: "100%", display: "flex", justifyContent: "center" }} > <CircularProgress style={{ color: "#ffff" }} /> </div> : allOrdersIsError ? <h1 style={{ marginBottom: "0px" }} >{allOrdersError}</h1> : allOrdersIsSuccess ? <h1 style={{ marginBottom: "0px" }} >{allOrdersData?.totalAmount.toFixed(2)}</h1> : ""}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div style={{ marginTop: "40px" }} >
                <Grid container justifyContent='space-between' spacing={4} >
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={4} >
                        <Card style={{ background: "#2C5F2DFF", color: "#FFE77AFF" }} >
                            <CardContent>
                                <div style={{ textAlign: "center" }} >
                                    <h1>Products</h1>
                                    {isLoading ? <div style={{ width: "100%", display: "flex", justifyContent: "center" }} > <CircularProgress style={{ color: "#ffff" }} /> </div> : isError ? <h1 style={{ marginBottom: "0px" }} >{error}</h1> : isSuccess ? <h1 style={{ marginBottom: "0px" }} >{data?.length}</h1> : ""}
                                </div>
                                <hr />
                                <div style={{ display: "flex", justifyContent: "center" }} >
                                    <Button
                                        variant="contained"
                                        size='large'
                                        style={{ background: "#FA9C23", color: "#fff" }}
                                        onClick={() => history.push("/admin/products")}
                                    >
                                        View Details
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={4} xl={4} >
                        <Card style={{ background: "#343148FF", color: "#D7C49EFF" }} >
                            <CardContent>
                                <div style={{ textAlign: "center" }} >
                                    <h1>Orders</h1>
                                    {allOrdersIsLoading ? <div style={{ width: "100%", display: "flex", justifyContent: "center" }} > <CircularProgress style={{ color: "#ffff" }} /> </div> : allOrdersIsError ? <h1 style={{ marginBottom: "0px" }} >{allOrdersError}</h1> : allOrdersIsSuccess ? <h1 style={{ marginBottom: "0px" }} >{allOrdersData?.orders?.length}</h1> : ""}
                                </div>
                                <hr />
                                <div style={{ display: "flex", justifyContent: "center" }} >
                                    <Button
                                        variant="contained"
                                        size='large'
                                        style={{ background: "#FA9C23", color: "#fff" }}
                                        onClick={() => history.push("/admin/orders")}
                                    >
                                        View Details
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={4} xl={4} >
                        <Card style={{ background: "#422057FF", color: "#FCF951FF" }} >
                            <CardContent>
                                <div style={{ textAlign: "center" }} >
                                    <h1>Users</h1>
                                    {allUsersIsLoading ? <div style={{ width: "100%", display: "flex", justifyContent: "center" }} > <CircularProgress style={{ color: "#ffff" }} /> </div> : allUsersIsError ? <h1 style={{ marginBottom: "0px" }} >{allUsersError}</h1> : allUsersIsSuccess ? <h1 style={{ marginBottom: "0px" }} >{allusersData?.length}</h1> : ""}
                                </div>
                                <hr />
                                <div style={{ display: "flex", justifyContent: "center" }} >
                                    <Button
                                        variant="contained"
                                        size='large'
                                        style={{ background: "#FA9C23", color: "#fff" }}
                                        onClick={() => history.push("/admin/users")}
                                    >
                                        View Details
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Dashboard