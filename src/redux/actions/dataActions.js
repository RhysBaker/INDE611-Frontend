import {
  SET_SKETCHES,
  LOADING_IMAGE_DATA,
  LOADING_DATA,
  LOADING_UI,
  LIKE_SKETCH,
  UNLIKE_SKETCH,
  DELETE_SKETCH,
  SET_ERRORS,
  CLR_ERRORS,
  POST_SKETCH,
  SET_SKETCH,
  STOP_LOADING_UI,
  SUBMIT_COMMENT,
} from "../types";
import axios from "axios";

//get all sketches
export const getSketches = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/sketches")
    .then((res) => {
      dispatch({ type: SET_SKETCHES, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SET_SKETCHES, payload: [] });
    });
};

//get one sketch
export const getSketch = (sketchId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/sketch/${sketchId}`)
    .then((res) => {
      dispatch({
        type: SET_SKETCH,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};

//post sketch
export const postSketch = (newSketch) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/sketch", newSketch)
    .then((res) => {
      dispatch({
        type: POST_SKETCH,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

//Like sketch
export const likeSketch = (sketchId) => (dispatch) => {
  axios
    .get(`/sketch/${sketchId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_SKETCH,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// unlike sketch
export const unlikeSketch = (sketchId) => (dispatch) => {
  axios
    .get(`/sketch/${sketchId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_SKETCH,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

//submit a comment
export const submitComment = (sketchId, commentData) => (dispatch) => {
  axios
    .post(`/sketch/${sketchId}/comment`, commentData)
    .then((res) => {
      dispatch({ type: SUBMIT_COMMENT, payload: res.data });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

//delete a sketch
export const deleteSketch = (sketchId) => (dispatch) => {
  axios
    .delete(`/sketch/${sketchId}`)
    .then(() => {
      dispatch({ type: DELETE_SKETCH, payload: sketchId });
    })
    .catch((err) => console.log(err));
};

export const getUserData = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then((res) => {
      dispatch({
        type: SET_SKETCHES,
        payload: res.data.sketches,
      });
    })
    .catch(() => {
      dispatch({ type: SET_SKETCHES, payload: null });
    });
};

export const handleBodyImage = (formData, sketchId) => (dispatch) => {
  dispatch({ type: LOADING_IMAGE_DATA });
  axios
    .post(`/sketch/${sketchId}/image`, formData)
    .then((res) => {
      dispatch(getSketches());
    })
    .catch((err) => console.log(err));
};

//error clearing func
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLR_ERRORS });
};
