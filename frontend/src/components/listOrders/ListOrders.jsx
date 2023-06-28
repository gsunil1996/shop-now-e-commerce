import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { myOrders } from '../../redux/actions/orderActions';


const columns = [
    {
        id: "orderID",
        label: "Order ID",
        minwidth: 60,
        align: "left",
        background: "#755139FF"
    },
    {
        id: "numberOFITems",
        label: "Number of Items",
        minwidth: 60,
        align: "left",
        background: "#755139FF",
    },

    {
        id: "amount",
        label: "Amount",
        minwidth: 60,
        align: "left",
        background: "#755139FF",
    },
    {
        id: "Status",
        label: "Status",
        minwidth: 60,
        align: "left",
        background: "#755139FF",
    },
    {
        id: "Actions",
        label: "Actions",
        minwidth: 60,
        align: "center",
        background: "#755139FF",
    },
];


const ListOrders = () => {

    const dispatch = useDispatch();

    const { isLoading, isError, error, isSuccess, data } = useSelector(state => state.myOrders)

    useEffect(() => {
        dispatch(myOrders());
    }, [])


    const handleViewClick = (e, id) => {
        alert(id)
    }

    return (
        <div style={{ paddingBottom: "50px" }} >
            <Helmet>
                <title>My Orders</title>
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
                ) : isSuccess === true && data?.length == 0 ? (
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            textAlign: "center",
                        }}
                    >
                        <h1>No Orders Found</h1>
                    </div>
                ) : isSuccess ? (
                    <div style={{ width: "95%", margin: "auto" }}>

                        <Grid container>
                            <Grid
                                item
                                xs={12}
                                style={{
                                    width: "100%",
                                    overflowX: "auto",
                                    display: "inline-grid",
                                    marginTop: "10px",
                                }}
                            >
                                <TableContainer component={Paper}>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                {columns.map((column) => (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        style={{
                                                            minWidth: column.minWidth,
                                                            background: column.background,
                                                            color: "#fff",
                                                        }}
                                                    >
                                                        {column.label}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {data?.map((row) => {
                                                var images = row.orderItems.map(item => item.image).flat();
                                                return (
                                                    <TableRow
                                                        hover
                                                        role="checkbox"
                                                        tabIndex={-1}
                                                        key={row._id}
                                                        style={{
                                                            background: "#F2EDD7FF"
                                                        }}
                                                    >
                                                        <TableCell align="left" >
                                                            {row._id}
                                                        </TableCell>
                                                        <TableCell align="left" style={{ maxWidth: "200px" }} >
                                                            {images.map(item => <img src={item} alt="" style={{ height: "50px", marginRight: "10px" }} />)}
                                                        </TableCell>

                                                        <TableCell align="left">
                                                            {row.totalPrice}
                                                        </TableCell>

                                                        <TableCell align="left">
                                                            <div style={{ maxWidth: "min-content" }} >
                                                                <Alert severity={row.orderStatus == "Delivered" ? "success" : "info"}>
                                                                    <AlertTitle>{row.orderStatus}</AlertTitle>
                                                                </Alert>
                                                            </div>
                                                        </TableCell>

                                                        <TableCell align="center">

                                                            <Button variant="contained" color="success"
                                                                onClick={(event) =>
                                                                    handleViewClick(event, row._id)
                                                                }
                                                                style={{ background: "#FA9C23", color: "#fff" }}
                                                            >
                                                                View
                                                            </Button>

                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>
                    </div>
                ) : ""
                }
            </div>
        </div>
    )
}

export default ListOrders