import React, { useEffect, useState } from "react";
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

  const { data, isLoading, isError, error, isSuccess } = useSelector((state) => state.getProducts);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  // console.log("checkgetProducts", data, isLoading, isError, error, isSuccess)


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

  const handleCategeoryChange = (event) => {
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
    <div style={{ width: "95%", margin: "auto", }} >

      <div style={{ width: "100%", margin: "auto", display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: "20px", marginTop: "20px", }} >
        <div>
          <div style={{ display: "flex", gap: "10px" }} >
            <div>
              <CustomTextField
                id="outlined-basic"
                label="Min Price"
                type="number"
                variant="outlined"
                value={price[0]}
                onChange={handleMinInputChange}
              />
            </div>
            <div>
              <CustomTextField
                id="outlined-basic"
                label="Max Price"
                type="number"
                variant="outlined"
                value={price[1]}
                onChange={handleMaxInputChange}
              />
            </div>
          </div>
        </div>

        <div>
          <FormControl variant="outlined" >
            <InputLabel id="demo-simple-select-outlined-label">Ratings</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={ratings}
              onChange={handleRatingsChange}
              label="Ratings"
              style={{ height: '45px' }}
            >
              {ratingsArr.map(item => <MenuItem value={item}>{item}</MenuItem>)}
            </Select>
          </FormControl>
        </div>

        <div>
          <FormControl variant="outlined" style={{ minWidth: "160px" }} >
            <InputLabel id="demo-simple-select-outlined-label">Categeories</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={category}
              onChange={handleCategeoryChange}
              label="Categeories"
              style={{ height: '45px' }}
            >
              {categories.map(item => <MenuItem value={item}>{item}</MenuItem>)}
            </Select>
          </FormControl>
        </div>

      </div>

      <div style={{ paddingBottom: "50px" }} >

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
        ) : isSuccess === true && data?.products?.length == 0 ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <h1>No Products Found</h1>
          </div>
        ) : isSuccess ? (
          <>
            <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }} >
              {data?.products?.map(item => {
                return (
                  <Card style={{ width: "250px", boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px", marginTop: "20px" }} >
                    {console.log("chekjlsdjo", item)}
                    <CardContent >
                      <div style={{ display: "flex", justifyContent: "center" }} >
                        <img src={item?.images[0]?.url} alt="" style={{ maxWidth: "100%", maxHeight: "150px" }} />
                      </div>

                      <div className={classes.productName}>
                        <h3>{item?.name}</h3>
                      </div>

                      <div>
                        <div style={{ display: "flex", justifyContent: "center" }} >
                          <Rating name="read-only" value={item?.ratings} precision={0.1} readOnly />
                        </div>

                        <div style={{ textAlign: "center", color: "#232F3E", fontWeight: 500 }} >
                          {item?.reviews?.length} reviews
                        </div>

                        <div style={{ display: "flex", justifyContent: "center" }}>
                          <Button
                            style={{ background: "#FA9C23", color: "#fff", marginTop: "10px" }}
                            variant="contained">
                            View Details
                          </Button>
                        </div>

                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "40px",
              }}
            >
              <Pagination
                count={data?.Pagination?.pageCount}
                page={Number(page)}
                onChange={handlePageChange}
                variant="outlined"
                color="primary"
              />
            </div>
          </>

        ) : ""
        }
      </div>

    </div>
  );
};

export default Home;
