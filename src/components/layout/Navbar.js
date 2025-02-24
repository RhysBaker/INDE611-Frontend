import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MyButton from "../../util/myButton";
import PostSketch from "../sketch/PostSketch";
import Notifications from "./Notifications";

//MUI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

//Icons
import GestureIcon from "@material-ui/icons/Gesture";
import HomeIcon from "@material-ui/icons/Home";
import HelpIcon from "@material-ui/icons/Help";

export class Navbar extends Component {
  render() {
    const { authenticated } = this.props;
    return (
      <AppBar>
        <Toolbar className="nav-container">
          {authenticated ? (
            <Fragment>
              <Link to="/">
                <MyButton tip="Home">
                  <HomeIcon />
                </MyButton>
              </Link>

              <PostSketch />

              <Link to="/draw">
                <MyButton tip="Draw">
                  <GestureIcon />
                </MyButton>
              </Link>

              <Notifications />

              <Link to="/faq">
                <MyButton tip="Frequently asked questions">
                  <HelpIcon />
                </MyButton>
              </Link>
            </Fragment>
          ) : (
            <Fragment>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/draw">
                Draw
              </Button>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
              <Button color="inherit" component={Link} to="/faq">
                FAQ
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(Navbar);
