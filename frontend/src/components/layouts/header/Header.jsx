import React, { useEffect, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import logo from "../../../assets/images/logo.png";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import useStyles from "./HeaderStyles";
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from '@material-ui/core/CircularProgress';
import { getProductsAction } from '../../../redux/actions/productActions';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { logoutAction } from '../../../redux/actions/userActions';
import { LOGOUT_USER_RESET } from '../../../redux/actionTypes/userTypes';
import { getCartAction } from '../../../redux/actions/cartActions';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

const Header = ({ search, setSearch, category, price, ratings, setPage }) => {

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.getProducts);

  const { isAuthenticated, user, logout: { isSuccess, isError, error } } = useSelector(state => state.auth);

  const { getCart: { cartItems } } = useSelector((state) => state.cart);



  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [openFailureAlert, setOpenFailureAlert] = useState(false);

  const handleClickOpenFailureAlert = () => {
    setOpenFailureAlert(true)
  }

  const handleCloseFailureAlert = () => {
    setOpenFailureAlert(false)
  }

  const handleClickOpenSuccessAlert = () => {
    setOpenSuccessAlert(true);
  };

  const handleCloseSuccessAlert = () => {
    setOpenSuccessAlert(false);
  };

  useEffect(() => {

    if (isError) {
      handleClickOpenFailureAlert()
      setTimeout(() => {
        handleCloseFailureAlert()
      }, 1000)
    }

    if (isSuccess) {
      handleClickOpenSuccessAlert()
      setTimeout(() => {
        handleCloseSuccessAlert()
      }, 1000)

      setTimeout(() => {
        dispatch({ type: LOGOUT_USER_RESET });
      }, 2000)

    }
  }, [dispatch, isAuthenticated, isError, isSuccess]);

  useEffect(() => {
    dispatch(getCartAction({ userId: user?._id }))
  }, [dispatch, user])

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };



  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleSearch = () => {
    setPage(1)
    const payload = { search, category, priceLTE: price[1], priceGTE: price[0], ratings, page: 1 }
    dispatch(getProductsAction(payload))
  }

  const handleLogout = (event) => {
    handleClose(event)
    dispatch(logoutAction());
  }

  const handleProfile = (event) => {
    handleClose(event)
    history.push("/profile")
  }


  useEffect(() => {
    if (search == "") {
      setPage(1)
      const payload = { search, category, priceLTE: price[1], priceGTE: price[0], ratings, page: 1 }
      dispatch(getProductsAction(payload))
    }
  }, [search])

  return (
    <div>
      <div className={classes.headerContainer}>
        <div className={classes.headerContent}>
          <Grid container justifyContent='space-between' alignItems='center' spacing={3}>
            <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
              <div className={classes.logoContainer}>
                <img
                  src={logo}
                  alt="logo"
                  className={classes.logo}
                  onClick={() => history.push('/')}
                />
              </div>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <div className={classes.container}>
                <div className={classes.searchContainer}>
                  <input
                    type="text"
                    placeholder="Enter Product Name"
                    className={classes.input}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSearch();
                      }
                    }}
                  />
                  <button className={classes.searchButton}>
                    {isLoading ? (
                      <CircularProgress style={{ width: "20px", height: "20px" }} />
                    ) : (
                      <SearchIcon
                        className={classes.searchIcon}
                        onClick={handleSearch}
                      />
                    )}
                  </button>
                </div>

              </div>
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
              <div className={classes.flexContainer}>
                {isAuthenticated ?
                  <div className={classes.profileContainer}>
                    <Avatar alt="Profile pic" src={user?.avatar?.url} className={classes.avatar} />
                    <div className={classes.profileText}>{user?.name}</div>
                    <div>
                      <ArrowDropDownIcon
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        className={classes.profileIcon} />
                      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal style={{ zIndex: 99 }} >
                        {({ TransitionProps, placement }) => (
                          <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                          >
                            <Paper>
                              <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>

                                  {user.role == "admin" && <MenuItem onClick={handleClose}>Dashboard</MenuItem>}

                                  <MenuItem onClick={handleClose}>Orders</MenuItem>
                                  <MenuItem onClick={handleProfile}>Profile</MenuItem>
                                  <MenuItem onClick={handleLogout} style={{ color: "#5C0512" }} >Logout</MenuItem>
                                </MenuList>
                              </ClickAwayListener>
                            </Paper>
                          </Grow>
                        )}
                      </Popper>
                    </div>
                  </div> :
                  <div>
                    <Button
                      variant="contained"
                      style={{
                        background: "#FA9C23",
                        color: "#000",
                      }}
                      onClick={() => history.push("/login")}
                    >
                      Login
                    </Button>
                  </div>
                }
                <div>
                  <IconButton aria-label="cart" className={classes.cartButton}>
                    <StyledBadge badgeContent={cartItems?.items?.length} color="secondary">
                      <ShoppingCartIcon className={classes.cartIcon} />
                    </StyledBadge>
                  </IconButton>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
      <Snackbar open={openSuccessAlert} autoHideDuration={6000} onClose={handleCloseSuccessAlert}>
        <Alert onClose={handleCloseSuccessAlert} severity="success">
          User Logout Successfully!
        </Alert>
      </Snackbar>

      <Snackbar open={openFailureAlert} autoHideDuration={6000} onClose={handleCloseFailureAlert}>
        <Alert onClose={handleCloseFailureAlert} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Header;
