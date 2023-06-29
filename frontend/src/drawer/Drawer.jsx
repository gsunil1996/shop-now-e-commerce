import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
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
import logo from "../assets/images/logo.png";

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
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        background: '#232940',
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

export default function PersistentDrawerLeft() {
    const classes = useStyles();
    const history = useHistory();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

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
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        {selectedIndex == 0 ? "Dashboard" : selectedIndex == 1 ? "All Products" : selectedIndex == 2 ? "Create Product" : selectedIndex == 3 ? "Orders" : selectedIndex == 4 ? "Users" : selectedIndex == 5 ? "Reviews" : ""}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <img src={logo} alt="" style={{ maxWidth: "160px", cursor: "pointer" }} onClick={() => history.push("/")} />
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon style={{ color: "#fff" }} /> : <ChevronRightIcon style={{ color: "#fff" }} />}
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
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />

            </main>
        </div>
    );
}
