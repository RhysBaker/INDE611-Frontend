import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

import Sketch from "../components/Sketch.js";
export class home extends Component {
  state = {
    sketches: null,
  };

  componentDidMount() {
    axios
      .get("/sketches")
      .then((res) => {
        this.setState({
          sketches: res.data,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    let recentSketchesMarkUp = this.state.sketches ? (
      this.state.sketches.map((sketch) => (
        <Sketch key={sketch.sketchId} sketch={sketch} />
      ))
    ) : (
      <p>Loading...</p>
    );
    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {recentSketchesMarkUp}
        </Grid>
        <Grid item sm={4} xs={12}>
          <p>Profile....</p>
        </Grid>
      </Grid>
    );
  }
}

export default home;
