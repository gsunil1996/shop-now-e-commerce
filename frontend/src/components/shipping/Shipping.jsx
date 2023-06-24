import React, { useState } from 'react';
import useStyles from "./ShippingStyles";
import { useDispatch, useSelector } from 'react-redux';
import { countries } from 'countries-list'
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { saveShippingInfo } from '../../redux/actions/cartActions';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CustomizedSteppers from '../stepper/CustomizedSteppers';


const Shipping = () => {
    const classes = useStyles();
    const { shippingInfo } = useSelector((state) => state.cart);
    // const countriesList = Object.values(countries)
    const [name, setName] = useState(shippingInfo.name)
    const [address, setAddress] = useState(shippingInfo.address)
    const [city, setCity] = useState(shippingInfo.city)
    const [postalCode, setPostalCode] = useState(shippingInfo.postalCode)
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)
    // const [country, setCountry] = useState(shippingInfo.country)


    // const handleChange = (event) => {
    //     setCountry(event.target.value);
    // };

    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(saveShippingInfo({ name, address, city, phoneNo, postalCode }))
        history.push('/confirm')
    }

    return (
        <div>
            <Helmet>
                <title>Shipping Info</title>
            </Helmet>

            <CustomizedSteppers step={0} />

            <div style={{ display: "flex", justifyContent: "center", minHeight: "80vh", alignItems: "center" }} >
                <Grid container justifyContent='center' alignItems='center' style={{ width: "100%" }} >
                    <Grid item xs={10} sm={10} md={4} lg={4} xl={4} style={{ margin: "auto" }} >
                        <Card style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }} >
                            <CardContent>
                                <div className={classes.title}>Shipping Info</div>
                                <form onSubmit={handleSubmit}>
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
                                            label="Address"
                                            variant="outlined"
                                            type="text"
                                            fullWidth
                                            required
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                    </div>

                                    <div className={classes.formField}>
                                        <TextField
                                            id="outlined-basic"
                                            label="City"
                                            variant="outlined"
                                            type="text"
                                            fullWidth
                                            required
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                        />
                                    </div>

                                    <div className={classes.formField}>
                                        <TextField
                                            id="outlined-basic"
                                            label="Phone Number"
                                            variant="outlined"
                                            fullWidth
                                            required
                                            value={phoneNo}
                                            type='number'
                                            onInput={(e) => {
                                                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                                            }}
                                            onChange={(e) => setPhoneNo(e.target.value)}
                                        />
                                    </div>

                                    <div className={classes.formField}>
                                        <TextField
                                            id="outlined-basic"
                                            label="Postal Code"
                                            variant="outlined"
                                            type='number'
                                            fullWidth
                                            required
                                            value={postalCode}
                                            onChange={(e) => setPostalCode(e.target.value)}
                                        />
                                    </div>

                                    {/* <FormControl variant="outlined" fullWidth required style={{ marginTop: "20px" }} >
                                        <InputLabel id="demo-simple-select-outlined-label">
                                            Country
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            name="gender"
                                            value={country}
                                            onChange={handleChange}
                                            label="Select Country"
                                        >
                                            {countriesList.map(country => (
                                                <MenuItem key={country.name} value={country.name}> {country.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl> */}

                                    <div className={classes.formField}>
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            size='large'
                                            style={{
                                                background: "#FA9C23",
                                                color: "#fff",
                                                borderRadius: "10px",
                                            }}
                                            type="submit"
                                        >
                                            Continue
                                        </Button>
                                    </div>

                                </form>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Shipping