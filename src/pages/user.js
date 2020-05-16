import React, { Component } from "react";

import PropTypes from "prop-types";
import axios from "axios";
import Sketch from "../components/sketch/Sketch";
import Grid from "@material-ui/core/Grid";
import StaticProfile from "../components/profile/StaticProfile";

//redux
import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

class user extends Component {
  state = {
    profile: null,
    sketchIdParam: null,
  };

  componentDidMount() {
    const handle = this.props.match.params.handle;
    const sketchId = this.props.match.params.sketchId;

    if (sketchId) this.setState({ sketchIdParam: sketchId });

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { sketches, loading } = this.props.data;
    const { sketchIdParam } = this.state;

    const sketchesMarkUp = loading ? (
      <p>Loading Data...</p>
    ) : sketches === null ? (
      <p>No Sketches from this user</p>
    ) : !sketchIdParam ? (
      sketches.map((sketch) => <Sketch key={sketch.sketchId} sketch={sketch} />)
    ) : (
      sketches.map((sketch) => {
        if (sketch.sketchId !== sketchIdParam)
          return <Sketch key={sketch.sketchId} sketch={sketch} />;
        else return <Sketch key={sketch.sketchId} sketch={sketch} openDialog />;
      })
    );

    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {sketchesMarkUp}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <p>Loading Profile...</p>
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUserData })(user);
