import React, { useEffect } from 'react';
import useStyles from "./ProfileStyles";
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Profile = () => {
    const classes = useStyles();
    const history = useHistory();

    const { user } = useSelector(state => state.auth);

    return (
        <>
            <Helmet>
                <title>Your Profile</title>
            </Helmet>

            <div style={{ width: "100%", display: "flex", justifyContent: "center", }} >

                <Grid container spacing={4} alignItems='center' justifyContent='center'
                    style={{ marginTop: "20px", minHeight: "50vh" }} >

                    <Grid item xs={12} sm={12} md={2} lg={2} xl={2} style={{ display: "flex", justifyContent: "center" }} >
                        <div>
                            <div style={{ width: "100%", display: "flex", justifyContent: "center" }} >
                                <Avatar alt="image" src={user?.avatar?.url} style={{ height: "30vh", width: "30vh" }} />
                            </div>

                            <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "30px" }}>
                                <Button variant="contained" size='large'
                                    onClick={() => history.push("/profile/update")}
                                    style={{ background: "#FA9C23", color: "#fff" }} >
                                    Edit Profile
                                </Button>
                            </div>
                        </div>

                    </Grid>

                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3} style={{ display: "flex", justifyContent: "center" }} >
                        <div>
                            <div style={{ fontSize: "28px", fontWeight: 600, color: "grey" }} >
                                Full Name
                            </div>
                            <div style={{ marginTop: "15px", fontSize: "20px", fontWeight: 500 }} >
                                {user.name}
                            </div>

                            <div style={{ fontSize: "28px", fontWeight: 600, color: "grey", marginTop: "20px" }} >
                                Email Address
                            </div>
                            <div style={{ marginTop: "15px", fontSize: "20px", fontWeight: 500 }} >
                                {user.email}
                            </div>

                            <div style={{ fontSize: "28px", fontWeight: 600, color: "grey", marginTop: "20px" }} >
                                Joined On
                            </div>
                            <div style={{ marginTop: "15px", fontSize: "20px", fontWeight: 500 }} >
                                {String(user.createdAt).substring(0, 10)}
                            </div>

                            <div style={{ width: "100%" }} >
                                <Button
                                    variant="contained"
                                    size='large'
                                    color="primary"
                                    style={{ marginTop: "20px" }}
                                    onClick={() => history.push("/password/update")}
                                >
                                    Change Password
                                </Button>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default Profile