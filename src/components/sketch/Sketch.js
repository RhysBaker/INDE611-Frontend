import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import MyButton from "../../util/myButton";
import DeleteSketch from "./DeleteSketch";
import SketchDialog from "./SketchDialog";
import LikeButton from "./LikeButton";

//MUI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Typography } from "@material-ui/core";

//Icons
import ChatIcon from "@material-ui/icons/Chat";

//redux
import { connect } from "react-redux";
import AddImage from "./AddImage";

const styles = (theme) => ({
  ...theme.spreadThis,
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
  bodyImageUrl: {
    maxWidth: "75%",
  },
  invisibleSeperator: {
    border: "none",
    margin: 4,
  },
});

class Sketch extends Component {
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
        bodyImageUrl,
      },
      user: {
        authenticated,
        credentials: { handle },
      },
    } = this.props;

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteSketch sketchId={sketchId} />
      ) : null;

    const addImageButton = bodyImageUrl ? null : authenticated &&
      userHandle === handle ? (
      <AddImage sketchId={sketchId} />
    ) : null;

    let bodyImageEl = bodyImageUrl ? (
      <img src={bodyImageUrl} alt="body" className={classes.bodyImageUrl} />
    ) : null;

    return (
      <Card className={(classes.card, classes.sketchWrapper)}>
        <CardMedia
          image={userImage}
          title="Profile Image"
          className="userImage"
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
          <span>{addImageButton}</span>
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          {bodyImageEl}
          <hr className={classes.invisibleSeperator} />
          <LikeButton sketchId={sketchId} />
          <span>{likeCount} Likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} comments</span>
          <SketchDialog
            sketchId={sketchId}
            userHandle={userHandle}
            openDialog={this.props.openDialog}
          />
        </CardContent>
      </Card>
    );
  }
}

Sketch.propTypes = {
  user: PropTypes.object.isRequired,
  sketch: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Sketch));
