import React from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60vh',
    },
    icon: {
        fontSize: '90px',
        color: 'green',
    },
});

const OrderSuccess = () => {
    const classes = useStyles();
    const history = useHistory();

    return (
        <>
            <Helmet>
                <title>Order Success</title>
            </Helmet>

            <div className={classes.container}>
                <div>
                    <CheckCircleIcon className={classes.icon} />
                </div>
                <div>
                    <h3>Order has been placed Successfully</h3>
                </div>
                <div>
                    <Button
                        variant="contained"
                        size='large'
                        style={{
                            background: "#FA9C23",
                            color: "#fff",
                            borderRadius: "10px",
                        }}
                        onClick={() => history.push("/orders/me")}
                    >
                        Go To My orders
                    </Button>
                </div>
            </div>
        </>
    );
};

export default OrderSuccess;
