import React, { useEffect } from "react";
import useStyles from "./HomeStyles";
import { TextField, withStyles } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from "react-redux";
import { getProductsAction } from "../../redux/actions/getProductsAction";
import LinearProgress from '@material-ui/core/LinearProgress';
import Pagination from '@material-ui/lab/Pagination';
import { useHistory } from 'react-router-dom'

const CustomTextField = withStyles({
  root: {
    '& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
    '& input[type=number]': {
      '-moz-appearance': 'textfield',
    },
    '& .MuiInputBase-input': {
      height: '10px',
      width: "80px"
    },
  },
})(TextField);

const Home = ({ search, category, setCategory, price, setPrice, ratings, setRatings, page, setPage }) => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const { data, isLoading, isError, error, isSuccess } = useSelector((state) => state.getProducts);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const categories = [
    'all',
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
  ];

  const ratingsArr = [0, 1, 2, 3, 4, 5]

  const handleCategoryChange = (event) => {
    setCategory(event.target.value)
    setPage(1)
  }

  const handleRatingsChange = (event) => {
    setRatings(event.target.value)
    setPage(1)
  }

  const handleMinInputChange = (event) => {
    const newValue = event.target.value;
    setPrice([newValue, price[1]]);
    setPage(1)
  };

  const handleMaxInputChange = (event) => {
    const newValue = event.target.value;
    setPrice([price[0], newValue]);
    setPage(1)
  };

  useEffect(() => {
    const payload = { search, category, priceLTE: price[1], priceGTE: price[0], ratings, page }
    dispatch(getProductsAction(payload))
  }, [dispatch, category, price, ratings, page])

  return (
    <div className={classes.container}>

      <div className={classes.filters}>
        <div className={classes.filterItem}>
          <div className={classes.filterField}>
            <CustomTextField
              id="min-price-input"
              label="Min Price"
              type="number"
              variant="outlined"
              value={price[0]}
              onChange={handleMinInputChange}
            />
          </div>
        </div>
        <div className={classes.filterItem}>
          <div className={classes.filterField}>
            <CustomTextField
              id="max-price-input"
              label="Max Price"
              type="number"
              variant="outlined"
              value={price[1]}
              onChange={handleMaxInputChange}
            />
          </div>
        </div>
        <div className={classes.filterItem}>
          <FormControl variant="outlined" className={classes.filterField}>
            <InputLabel id="ratings-select-label">Ratings</InputLabel>
            <Select
              labelId="ratings-select-label"
              id="ratings-select"
              value={ratings}
              onChange={handleRatingsChange}
              label="Ratings"
              className={classes.filterSelect}
            >
              {ratingsArr.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
            </Select>
          </FormControl>
        </div>
        <div className={classes.filterItem}>
          <FormControl variant="outlined" className={classes.filterField}>
            <InputLabel id="category-select-label">Categories</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={category}
              onChange={handleCategoryChange}
              label="Categories"
              className={classes.filterSelect}
            >
              {categories.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
            </Select>
          </FormControl>
        </div>
      </div>

      <div className={classes.productList}>
        {isLoading ? (
          <div className={classes.loading}>
            <LinearProgress className={classes.progressBar} />
          </div>
        ) : isError ? (
          <div className={classes.error}>
            <h4>{error}</h4>
          </div>
        ) : isSuccess === true && data?.products?.length === 0 ? (
          <div className={classes.noProducts}>
            <h1>No Products Found</h1>
          </div>
        ) : isSuccess ? (
          <>
            <div className={classes.cards}>
              {data?.products?.map(item => {
                return (
                  <Card className={classes.card} key={item._id}>
                    <CardContent>
                      <div className={classes.imageContainer}>
                        <img src={item?.images[0]?.url} alt="" className={classes.image} />
                      </div>
                      <div className={classes.productName} onClick={() => history.push(`/product/${item._id}`)}>
                        <h3>{item?.name}</h3>
                      </div>
                      <div className={classes.ratingContainer}>
                        <Rating name="read-only" value={item?.ratings} precision={0.1} readOnly />
                      </div>
                      <div className={classes.reviews}>
                        {item?.reviews?.length} reviews
                      </div>
                      <div className={classes.buttonContainer}>
                        <Button
                          onClick={() => history.push(`/product/${item._id}`)}
                          className={classes.viewDetailsButton}
                          variant="contained"
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
            <div className={classes.pagination}>
              <Pagination
                count={data?.Pagination?.pageCount}
                page={Number(page)}
                onChange={handlePageChange}
                variant="outlined"
                color="primary"
              />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
