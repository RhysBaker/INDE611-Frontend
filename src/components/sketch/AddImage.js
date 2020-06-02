import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import MyButton from "../../util/myButton";
//icons
import ImageIcon from "@material-ui/icons/Image";

import { connect } from "react-redux";
import { handleBodyImage } from "../../redux/actions/dataActions";

const styles = {
  addImageButton: {
    position: "absolute",
    right: "0",
    marginRight: "20px",
    top: "5%",
  },
};

class AddImage extends Component {
  handleBodyImage = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.handleBodyImage(formData, this.props.sketchId);
  };

  handleAddPicture = () => {
    const fileInput = document.getElementById("imageBodyInput");
    fileInput.click();
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <input
          type="file"
          id="imageBodyInput"
          hidden="hidden"
          onChange={this.handleBodyImage}
        />

        <MyButton
          tip="Add sketch image"
          onClick={this.handleAddPicture}
          className={classes.addImageButton}
        >
          <ImageIcon color="primary" />
        </MyButton>
      </Fragment>
    );
  }
}

AddImage.propTypes = {
  handleBodyImage: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  sketchId: PropTypes.string.isRequired,
};

export default connect(null, { handleBodyImage })(withStyles(styles)(AddImage));
