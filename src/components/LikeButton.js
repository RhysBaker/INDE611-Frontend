import React, { Component } from "react";
import MyButton from "../util/myButton";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
//Icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
//redux
import { connect } from "react-redux";
import { likeSketch, unlikeSketch } from "../redux/actions/dataActions";

export class LikeButton extends Component {
  likedSketch = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.sketchId === this.props.sketchId
      )
    )
      return true;
    else return false;
  };

  likeSketch = () => {
    this.props.likeSketch(this.props.sketchId);
  };

  unlikeSketch = () => {
    this.props.unlikeSketch(this.props.sketchId);
  };
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : this.likedSketch() ? (
      <MyButton tip="Undo like" onClick={this.unlikeSketch}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="like" onClick={this.likeSketch}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  sketchId: PropTypes.string.isRequired,
  likeSketch: PropTypes.func.isRequired,
  unlikeSketch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  likeSketch,
  unlikeSketch,
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
