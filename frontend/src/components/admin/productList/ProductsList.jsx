import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import { deleteProduct, getAdminProducts } from '../../../redux/actions/productActions';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import TextField from '@material-ui/core/TextField';
import { CircularProgress } from '@material-ui/core';
import { DELETE_PRODUCT_RESET } from '../../../redux/actionTypes/productTypes';

const columns = [
    {
        id: "ID",
        label: "Product ID",
        minwidth: 60,
        align: "left",
        background: "#755139FF"
    },
    {
        id: "name",
        label: "Product Name",
        minwidth: 60,
        align: "left",
        background: "#755139FF",
    },

    {
        id: "price",
        label: "Price",
        minwidth: 60,
        align: "left",
        background: "#755139FF",
    },
    {
        id: "stock",
        label: "Stock",
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

const ProductsList = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { data, isLoading, isError, error, isSuccess } = useSelector(state => state.adminGetAllProducts);
    const { isLoading: deleteIsLoading, isError: deleteIsErrror, error: deleteError, isSuccess: deleteIsSuccess } = useSelector(state => state.deleteProduct);

    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [selectedId, setSelectedId] = useState("");

    const filtering = (searchedVal) => {
        const filtered = data.filter(item => item.name.toString().toLowerCase().includes(searchedVal.toLowerCase()) || item._id.toString().toLowerCase().includes(searchedVal.toLowerCase()));
        setFilteredData(filtered);
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
        filtering(e.target.value);
    }

    const handleEditClick = (e, id) => {
        history.push(`/admin/product/${id}`)
    }

    const handleDeleteClick = (e, id) => {
        setSelectedId(id)
        dispatch(deleteProduct(id))
    }

    useEffect(() => {
        setFilteredData(data);
    }, [data])

    useEffect(() => {
        dispatch(getAdminProducts())

        if (deleteIsErrror) {
            alert(deleteError)
            dispatch({ type: DELETE_PRODUCT_RESET });
        }
        if (deleteIsSuccess) {
            alert("Product Deleted Successfully")
            dispatch({ type: DELETE_PRODUCT_RESET });
        }
    }, [dispatch, deleteIsErrror, deleteError, deleteIsSuccess])

    return (
        <div>
            <Helmet>
                <title>Product List</title>
            </Helmet>

            <div style={{ width: "95%", margin: "auto", display: "flex", justifyContent: "flex-end", marginTop: "20px" }} >
                <TextField
                    id="outlined-search"
                    label="Search"
                    type="search"
                    variant="outlined"
                    value={search}
                    placeholder="search by id / name"
                    onChange={e => handleSearch(e)}
                />
            </div>

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
                                <TableContainer component={Paper} style={{ maxHeight: 500 }} >
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
                                            {filteredData?.map((row) => {
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
                                                            {row.name}
                                                        </TableCell>

                                                        <TableCell align="left">
                                                            {row.price}
                                                        </TableCell>

                                                        <TableCell align="left">
                                                            {row.stock}
                                                        </TableCell>

                                                        <TableCell align="center">
                                                            <div style={{ width: "100%", display: "flex", justifyContent: "center", gap: "10px" }} >
                                                                <Button variant="contained" color="success"
                                                                    onClick={(event) =>
                                                                        handleEditClick(event, row._id)
                                                                    }
                                                                    style={{ background: "#1976D2", color: "#fff" }}
                                                                >
                                                                    <EditIcon />
                                                                </Button>

                                                                <Button variant="contained" color="success"
                                                                    disabled={deleteIsLoading ? true : false}
                                                                    onClick={(event) =>
                                                                        handleDeleteClick(event, row._id)
                                                                    }
                                                                    style={{ background: "#990011FF", color: "#FCF6F5FF" }}
                                                                >
                                                                    {selectedId == row._id ? <CircularProgress style={{ color: "#fff" }} /> : <DeleteForeverIcon />}
                                                                </Button>
                                                            </div>
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

export default ProductsList