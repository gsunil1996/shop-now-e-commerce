import React, { useEffect, useState } from 'react'
import useStyles from "./UpdateProductStyles";
import { useDispatch, useSelector } from 'react-redux'
import { getSingleProductAction, updateProduct } from '../../../redux/actions/productActions'
import { UPDATE_PRODUCT_RESET } from '../../../redux/actionTypes/productTypes'
import { useHistory } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useParams } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';


const UpdateProduct = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const { id } = useParams();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState(0);
    const [seller, setSeller] = useState('');
    const [images, setImages] = useState([]);

    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);


    const categories = [
        'Electronics',
        'Cameras',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        "Books",
        'Clothes/Shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home'
    ]

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    const { isLoading, isError, error, isSuccess } = useSelector(state => state.updateProduct);

    const { data, isLoading: singProductIsLoading, isError: singleProductIsError, error: singleProductError, isSuccess: singleProductIsSuccess } = useSelector(state => state.getSingleProductDetails);


    useEffect(() => {
        dispatch(getSingleProductAction({ id }))
    }, [dispatch, id])

    useEffect(() => {
        setName(data?.product?.name);
        setPrice(data?.product?.price);
        setDescription(data?.product?.description);
        setCategory(data?.product?.category);
        setSeller(data?.product?.seller);
        setStock(data?.product?.stock)
        setOldImages(data?.product?.images)
    }, [data])

    useEffect(() => {
        if (isError) {
            alert(error);
            dispatch({ type: UPDATE_PRODUCT_RESET });
        }

        if (isSuccess) {
            history.push('/admin/products');
            alert('Product Updated successfully');
            dispatch({ type: UPDATE_PRODUCT_RESET })
        }
    }, [dispatch, error, history, isError, isSuccess])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('price', price);
        formData.set('description', description);
        formData.set('category', category);
        formData.set('stock', stock);
        formData.set('seller', seller);

        images.forEach(image => {
            formData.append('images', image)
        })

        dispatch(updateProduct(id, formData))
    }

    const handleImageChange = e => {

        const files = Array.from(e.target.files)

        setImagesPreview([]);
        setImages([])
        setOldImages([])

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, reader.result])
                }
            }

            reader.readAsDataURL(file)
        })
    }



    return (
        <div>
            <Helmet>
                <title>Update Product</title>
            </Helmet>

            {singProductIsLoading ? (
                <div style={{ width: "100%", display: "flex", justifyContent: "center" }} >
                    <LinearProgress style={{ width: "100%", marginTop: "20px" }} />
                </div>
            ) : singleProductIsError ? (
                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                    <h4>{singleProductError}</h4>
                </div>
            ) : singleProductIsSuccess === true && data?.product?.length === 0 ? (
                <div style={{ width: "100%", display: "flex", justifyContent: "center", textAlign: "center" }}>
                    <h1>No Product Found</h1>
                </div>
            ) : singleProductIsSuccess ? (
                <>
                    <div style={{ display: "flex", justifyContent: "center", minHeight: "90vh", alignItems: "center" }} >
                        <Grid container justifyContent='center' alignItems='center' style={{ width: "100%" }} >
                            <Grid item xs={10} sm={10} md={4} lg={4} xl={4} style={{ margin: "auto" }} >
                                <Card style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }} >
                                    <CardContent>
                                        <div className={classes.title}>Update Product</div>
                                        <form onSubmit={submitHandler}>

                                            <div className={classes.formField}>
                                                <TextField
                                                    id="outlined-basic"
                                                    label="Name"
                                                    variant="outlined"
                                                    type="text"
                                                    fullWidth
                                                    required
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                            </div>

                                            <div className={classes.formField}>
                                                <TextField
                                                    id="outlined-basic"
                                                    label="Price"
                                                    variant="outlined"
                                                    type="number"
                                                    fullWidth
                                                    required
                                                    value={price}
                                                    onChange={(e) => setPrice(e.target.value)}
                                                />
                                            </div>

                                            <div className={classes.formField}>
                                                <TextField
                                                    id="outlined-multiline-static"
                                                    label="description"
                                                    multiline
                                                    rows={4}
                                                    variant="outlined"
                                                    fullWidth
                                                    required
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                />
                                            </div>

                                            <div className={classes.formField}>
                                                <FormControl variant="outlined" className={classes.formControl} fullWidth required>
                                                    <InputLabel id="demo-simple-select-outlined-label">Categeory</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        id="demo-simple-select-outlined"
                                                        value={category}
                                                        onChange={handleChange}
                                                        label="Categeory"
                                                    >
                                                        {categories.map(category => (
                                                            <MenuItem key={category} value={category} >{category}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </div>

                                            <div className={classes.formField}>
                                                <TextField
                                                    id="outlined-basic"
                                                    label="Stock"
                                                    variant="outlined"
                                                    type="number"
                                                    fullWidth
                                                    required
                                                    value={stock}
                                                    onChange={(e) => setStock(e.target.value)}
                                                />
                                            </div>

                                            <div className={classes.formField}>
                                                <TextField
                                                    id="outlined-basic"
                                                    label="Seller"
                                                    variant="outlined"
                                                    type="text"
                                                    fullWidth
                                                    required
                                                    value={seller}
                                                    onChange={(e) => setSeller(e.target.value)}
                                                />
                                            </div>

                                            <div>
                                                <div className={classes.main}>
                                                    <div className={classes.uploadContainer}>
                                                        {imagesPreview ? (
                                                            <div>
                                                                {imagesPreview.map(img => (
                                                                    <img src={img} key={img} alt="Images Preview" style={{ marginTop: "10px", marginRight: "10px", width: "55px", height: "52px" }} />
                                                                ))}
                                                                {oldImages && oldImages.map(img => (
                                                                    <img key={img} src={img.url} alt="Images Preview" style={{ marginTop: "10px", marginRight: "10px", width: "55px", height: "52px" }} />
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <Avatar alt="" src="" style={{ width: "100px", height: "100px" }} />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <input
                                                        accept="image/*"
                                                        className={classes.input}
                                                        id="image-upload"
                                                        type="file"
                                                        name="avatar"
                                                        onChange={handleImageChange}
                                                        multiple
                                                        required
                                                    />

                                                    <label htmlFor="image-upload">
                                                        <Button
                                                            variant="contained"
                                                            component="span"
                                                            style={{ background: "#FA9C23", color: "#fff", marginTop: "10px" }}
                                                        >
                                                            Choose Images
                                                        </Button>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className={classes.formField}>
                                                <Button
                                                    variant="contained"
                                                    fullWidth
                                                    size='large'
                                                    disabled={isLoading ? true : false}
                                                    style={{
                                                        background: "#FA9C23",
                                                        color: "#fff",
                                                        borderRadius: "10px",
                                                    }}
                                                    type="submit"
                                                >
                                                    {isLoading ? <CircularProgress className={classes.loginSpinner} /> : "Submit"}
                                                </Button>
                                            </div>
                                        </form>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </div>
                </>
            ) : ""
            }
        </div>
    )
}

export default UpdateProduct