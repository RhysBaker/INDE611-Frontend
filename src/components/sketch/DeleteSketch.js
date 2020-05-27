import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import MyButton from "../../util/myButton";

//Mui

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

//icons
import DeleteOutline from "@material-ui/icons/DeleteOutline";

import { connect } from "react-redux";
import { deleteSketch } from "../../redux/actions/dataActions";

const styles = {
  deleteButton: {
    position: "relative",
    float: "right",
    right: "5%",
    marginRight: "10px",
    top: "10%",
  },
};

class DeleteSketch extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  deleteSketch = () => {
    this.props.deleteSketch(this.props.sketchId);
    this.setState({
      open: false,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MyButton
          tip="Delete Sketch"
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteOutline color="secondary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            Are you sure you want to delete this sketch?
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deleteSketch} color="secondary">
              Confirm Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeleteSketch.propTypes = {
  deleteSketch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  sketchId: PropTypes.string.isRequired,
};

export default connect(null, { deleteSketch })(
  withStyles(styles)(DeleteSketch)
);
