import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import MyButton from "../util/myButton";
import DeleteSketch from "./DeleteSketch";
import SketchDialog from "./SketchDialog";

//MUI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Typography } from "@material-ui/core";

//Icons
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

//redux
import { connect } from "react-redux";
import { likeSketch, unlikeSketch } from "../redux/actions/dataActions";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: "cover",
  },
};

class Sketch extends Component {
  likedSketch = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.sketchId === this.props.sketch.sketchId
      )
    )
      return true;
    else return false;
  };

  likeSketch = () => {
    this.props.likeSketch(this.props.sketch.sketchId);
  };

  unlikeSketch = () => {
    this.props.unlikeSketch(this.props.sketch.sketchId);
  };

  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      sketch: {
        body,
        createdAt,
        userImage,
        userHandle,
        sketchId,
        likeCount,
        commentCount,
      },
      user: {
        authenticated,
        credentials: { handle },
      },
    } = this.props;

    const likeButton = !authenticated ? (
      <MyButton tip="Like">
        <Link to="/login">
          <FavoriteBorder color="primary" />
        </Link>
      </MyButton>
    ) : this.likedSketch() ? (
      <MyButton tip="Undo like" onClick={this.unlikeSketch}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="like" onClick={this.likeSketch}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteSketch sketchId={sketchId} />
      ) : null;
    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile Image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          {likeButton}
          <span>{likeCount} Likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} comments</span>
          <SketchDialog sketchId={sketchId} userHandle={userHandle} />
        </CardContent>
      </Card>
    );
  }
}

Sketch.propTypes = {
  likeSketch: PropTypes.func.isRequired,
  unlikeSketch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  sketch: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  likeSketch,
  unlikeSketch,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Sketch));
