import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import auth from './../auth/auth-helper'
import { Link, withRouter } from 'react-router-dom'
import logo1 from './../assets/images/articon_logo1.png'

const isHome = (history, path) => {
  if (history.location.pathname == path)
    return {
      font: '18px',
      fontWeight: 'bold',
      marginLeft: '15px',
      color: '#c4a2f9'
    }
  else
    return {
      font: '18px',
      fontWeight: 'bold',
      marginLeft: '15px',
      color: '#ffffff'
    }
}

const isActive = (history, path) => {
  if (history.location.pathname == path)
    return { color: '#c4a2f9' }
  else
    return { color: '#ffffff' }
}

const Menu = withRouter(({ history }) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h5" color="inherit">
        <img src={logo1} style={{ width: '24px', marginRight: '6px' }} />ARTICON
      </Typography>
      <Link to="/">
        <Button style={isHome(history, "/")}>Home
        </Button>
      </Link>
      {
        auth.isAuthenticated() && (<React.Fragment>
          <span>
            <Link to={"/user/" + auth.isAuthenticated().user._id}>
              <Button style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>My Profile</Button>
            </Link>
          </span>
          <span>
            <Link to="/showroom/">
              <Button style={isActive(history, "/showroom/")}>Showroom
            </Button>
            </Link>
          </span>
        </React.Fragment>
        )
      }
      <div style={{ flexGrow: 1 }}></div>
      {
        !auth.isAuthenticated() ? (<span>
          <Link to="/signup">
            <Button style={isActive(history, "/signup")}>Sign up
            </Button>
          </Link>
          <Link to="/signin">
            <Button style={isActive(history, "/signin")}>Sign In
            </Button>
          </Link>
        </span>) : (<React.Fragment>
          <span>
            <Button color="inherit" onClick={() => {
              auth.clearJWT(() => history.push('/'))
            }}>Sign out</Button>
          </span>
        </React.Fragment>
          )
      }
    </Toolbar>
  </AppBar>
))

export default Menu
