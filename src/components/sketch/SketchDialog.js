import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/myButton.js";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
//MUI
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
//icons
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";

//redux
import { connect } from "react-redux";
import { getSketch, clearErrors } from "../../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme.spreadThis,
  profileImage: {
    maxWidth: 100,
    height: 100,
    borderRadius: "25%",
    objectFit: "cover",
  },
  dialogContent: {
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    left: "90%",
    top: "5%",
  },
  expandButton: {
    position: "relative",
    float: "right",
    right: "5%",
    marginRight: "10px",
    top: "10%",
  },
  spinnerDiv: {
    position: "relative",
    textAlign: "center",
    marginBottom: 50,
    marginTop: 50,
  },
  bodyImageUrl: {
    maxWidth: "100%",
  },
});

class SketchDialog extends Component {
  state = {
    open: false,
    oldPath: "",
    newPath: "",
    getSketchData: false,
  };

  componentDidMount() {
    if (this.props.openDialog && !this.state.getSketchData) {
      this.setState({ getSketchData: true });
      this.handleOpen();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.openDialog && !this.state.getSketchData) {
      this.setState({ getSketchData: true });
      this.handleOpen();
    }
  }

  handleOpen = () => {
    let oldPath = window.location.pathname;
    const { userHandle, sketchId } = this.props;
    const newPath = `/users/${userHandle}/sketch/${sketchId}`;
    if (oldPath === newPath) oldPath = `/users/${userHandle}`;
    window.history.pushState(null, null, newPath);

    this.setState({
      open: true,
      oldPath,
      newPath,
    });
    this.props.getSketch(this.props.sketchId);
  };

  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({
      open: false,
      getSketchData: false,
    });
    this.props.clearErrors();
  };

  render() {
    const {
      classes,
      sketch: {
        sketchId,
        body,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        userHandle,
        comments,
        bodyImageUrl,
      },
      UI: { loading },
    } = this.props;

    let bodyImageEl = bodyImageUrl ? (
      <img src={bodyImageUrl} alt="body" className={classes.bodyImageUrl} />
    ) : null;

    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : (
      <Grid container spacing={2}>
        <Grid item sm={3}>
          <img src={userImage} alt="Profile" className={classes.profileImage} />
        </Grid>
        <Grid item sm={9}>
          <Typography
            component={Link}
            color="primary"
            variant="h5"
            to={`/users/${userHandle}`}
          >
            @{userHandle}
          </Typography>
          <hr className={classes.invisibleSeperator} />
          <Typography variant="body2" color="textSecondary">
            {" "}
            {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
          </Typography>
          <hr className={classes.invisibleSeperator} />
          <Typography variant="body1">{body}</Typography>
          {bodyImageEl}
          <LikeButton sketchId={sketchId} />
          <span>{likeCount}</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} comments</span>
        </Grid>
        <hr className={classes.visableSeperator} />
        <CommentForm sketchId={sketchId} />
        <Comments comments={comments} />
      </Grid>
    );

    return (
      <Fragment>
        <MyButton
          onClick={this.handleOpen}
          tip="Expand Sketch"
          tipClassName={classes.expandButton}
        >
          <UnfoldMore color="primary" />
        </MyButton>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

SketchDialog.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  getSketch: PropTypes.func.isRequired,
  sketchId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  sketch: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  sketch: state.data.sketch,
  UI: state.UI,
});

const mapActionsToProps = {
  getSketch,
  clearErrors,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(SketchDialog));
