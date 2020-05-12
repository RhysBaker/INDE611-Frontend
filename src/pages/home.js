import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import PropTypes from "prop-types";

import Sketch from "../components/Sketch.js";
import Profile from "../components/Profile.js";

import { connect } from "react-redux";
import { getSketches } from "../redux/actions/dataActions";

export class home extends Component {
  componentDidMount() {
    this.props.getSketches();
  }
  render() {
    const { sketches, loading } = this.props.data;
    let recentSketchesMarkUp = !loading ? (
      sketches.map((sketch) => <Sketch key={sketch.sketchId} sketch={sketch} />)
    ) : (
      <p>Loading...</p>
    );
    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {recentSketchesMarkUp}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile></Profile>
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getSketches: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getSketches })(home);
