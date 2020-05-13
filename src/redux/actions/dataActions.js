import {
  SET_SKETCHES,
  LOADING_DATA,
  LOADING_UI,
  LIKE_SKETCH,
  UNLIKE_SKETCH,
  DELETE_SKETCH,
  SET_ERRORS,
  CLR_ERRORS,
  POST_SKETCH,
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
      dispatch({
        type: CLR_ERRORS,
      });
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

export const deleteSketch = (sketchId) => (dispatch) => {
  axios
    .delete(`/sketch/${sketchId}`)
    .then(() => {
      dispatch({ type: DELETE_SKETCH, payload: sketchId });
    })
    .catch((err) => console.log(err));
};
