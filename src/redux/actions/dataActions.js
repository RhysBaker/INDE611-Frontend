import {
  SET_SKETCHES,
  LOADING_DATA,
  LIKE_SKETCH,
  UNLIKE_SKETCH,
  DELETE_SKETCH,
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
