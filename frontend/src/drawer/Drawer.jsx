import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { useHistory } from "react-router-dom";
import Box from '@material-ui/core/Box';
import logo from "../assets/images/logo.png"
import { Route, Switch, useLocation } from "react-router-dom";
import ProtectedRoute from '../routes/ProtectedRoute';
import Dashboard from '../components/admin/dashboard/Dashboard';
import ProductsList from '../components/admin/productList/ProductsList';
import NewProduct from '../components/admin/newProduct/NewProduct';
import UpdateProduct from '../components/admin/updateProduct/UpdateProduct';
import OrdersList from '../components/admin/ordersList/OrdersList';
import ProcessOrder from '../components/admin/processOrder/ProcessOrder';
import UsersList from '../components/admin/usersList/UsersList';
import UpdateUser from '../components/admin/updateUser/UpdateUser';
import ProductReviews from '../components/admin/productReviews/ProductReviews';

const drawerWidth = 240;

const MuiListItem = withStyles({
    root: {
        color: "#FFFFFF",
        "& .MuiListItemIcon-root": {
            color: "#FFFFFF",
        },
        "&$selected": {
            backgroundColor: "#606060FF",
            margin: '0px 5px 0px 5px',
            borderRadius: '2px',
            border: '0.3px solid #ddd',
            color: "#D6ED17FF !important",
            fontWeight: "700 !important",
            "& .MuiListItemIcon-root": {
                color: "#D6ED17FF",
            },
            "&& .MuiListItemText-primary":
            {
                fontWeight: 600,
            }
        },
        "&$selected:hover": {
            backgroundColor: "#606060FF",
            color: "#D6ED17FF !important",
            "& .MuiListItemIcon-root": {
                color: "#D6ED17FF",
            }
        },
        "&:hover": {
            backgroundColor: "#606060FF",
            color: "#D6ED17FF",
            "& .MuiListItemIcon-root": {
                color: "#D6ED17FF",
            }
        }
    },
    selected: {}
})(ListItem);

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        background: '#232940',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
        background: '#232940'
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(1),
    },
}));

const MiniDrawer = () => {
    const classes = useStyles();
    const history = useHistory();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const [selectedIndex, setSelectedIndex] = React.useState(0);


    const itemsList = [
        {
            text: "Dashboard",
            icon: <MailIcon />,
            indexes: 0,
        },
        {
            text: "All Products",
            icon: <InboxIcon />,
            indexes: 1,
        },
        {
            text: "Create Product",
            icon: <MailIcon />,
            indexes: 2,
        },
        {
            text: "Orders",
            icon: <InboxIcon />,
            indexes: 3,
        },
        {
            text: "Users",
            icon: <MailIcon />,
            indexes: 4,
        },
        {
            text: "Reviews",
            icon: <MailIcon />,
            indexes: 5,
        }
    ];

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        if (index === 0) {
            history.push('/dashboard');
        }
        else if (index === 1) {
            history.push('/admin/products');
        }
        else if (index === 2) {
            history.push('/admin/product');
        }
        else if (index === 3) {
            history.push('/admin/orders');
        }
        else if (index === 4) {
            history.push('/admin/users');
        }
        else if (index === 5) {
            history.push('/admin/reviews');
        }
    };

    React.useEffect(() => {
        let total_url = window.location.pathname.split('/')
        let url = total_url[1];
        if (url === "/dashboard") {
            setSelectedIndex(0)
        }
        else if (url === "/admin/products") {
            setSelectedIndex(1)
        }
        else if (url === "/admin/product") {
            setSelectedIndex(2)
        }
        else if (url === "/admin/orders") {
            setSelectedIndex(3)
        }
        else if (url === "/admin/users") {
            setSelectedIndex(4)
        }
        else if (url === "/admin/reviews") {
            setSelectedIndex(5)
        }
    }, []);


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar style={{ background: "#232F3E" }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >

                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        {selectedIndex == 0 ? "Dashboard" : selectedIndex == 1 ? "All Products" : selectedIndex == 2 ? "Create Product" : selectedIndex == 3 ? "Orders" : selectedIndex == 4 ? "Users" : selectedIndex == 5 ? "Reviews" : ""}
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                </Toolbar>
            </AppBar>



            <Drawer
                variant="permanent"

                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >


                <div className={classes.toolbar} style={{ background: "#232F3E" }} >
                    <img src={logo} alt="" style={{ maxWidth: "160px", cursor: "pointer" }} onClick={() => history.push("/")} />
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon style={{ color: "#fff" }} /> : <ChevronLeftIcon style={{ color: "#fff" }} />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {itemsList.map((item, index) => {
                        const { text, icon, indexes } = item;
                        return (
                            <MuiListItem button key={index} selected={selectedIndex === indexes}
                                onClick={(event) => handleListItemClick(event, indexes)}
                            >
                                {icon && <ListItemIcon>
                                    {icon}
                                </ListItemIcon>}
                                <ListItemText primary={text} />

                            </MuiListItem>
                        );
                    })}
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Switch>
                    <ProtectedRoute path="/dashboard" isAdmin={true} component={Dashboard} exact />
                    <ProtectedRoute path="/admin/products" isAdmin={true} component={ProductsList} exact />
                    <ProtectedRoute path="/admin/product" isAdmin={true} component={NewProduct} exact />
                    <ProtectedRoute path="/admin/product/:id" isAdmin={true} component={UpdateProduct} exact />
                    <ProtectedRoute path="/admin/orders" isAdmin={true} component={OrdersList} exact />
                    <ProtectedRoute path="/admin/order/:id" isAdmin={true} component={ProcessOrder} exact />
                    <ProtectedRoute path="/admin/users" isAdmin={true} component={UsersList} exact />
                    <ProtectedRoute path="/admin/user/:id" isAdmin={true} component={UpdateUser} exact />
                    <ProtectedRoute path="/admin/reviews" isAdmin={true} component={ProductReviews} exact />
                </Switch>
            </main>
        </div>
    );
}

export default MiniDrawer