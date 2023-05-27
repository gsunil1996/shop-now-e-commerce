import React from 'react';
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
import { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';


const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

const Header = () => {
  const classes = useStyles();
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(false);

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
                  />
                  <button className={classes.searchButton}>
                    <SearchIcon className={classes.searchIcon} />
                  </button>
                </div>
              </div>
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
              <div className={classes.flexContainer}>
                {isLogin ?
                  <div className={classes.profileContainer}>
                    <Avatar alt="Profile pic" src="" className={classes.avatar} />
                    <div className={classes.profileText}>Sunil Kumar</div>
                    <div>
                      <ArrowDropDownIcon className={classes.profileIcon} />
                    </div>
                  </div> :
                  <div>
                    <Button
                      variant="contained"
                      className={classes.loginButton}
                    >
                      Login
                    </Button>
                  </div>
                }
                <div>
                  <IconButton aria-label="cart" className={classes.cartButton}>
                    <StyledBadge badgeContent={4} color="secondary">
                      <ShoppingCartIcon className={classes.cartIcon} />
                    </StyledBadge>
                  </IconButton>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Header;
