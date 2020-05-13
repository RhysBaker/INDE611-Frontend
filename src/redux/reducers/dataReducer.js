import {
  SET_SKETCHES,
  LOADING_DATA,
  LIKE_SKETCH,
  UNLIKE_SKETCH,
  DELETE_SKETCH,
  POST_SKETCH,
} from "../types";

const initialState = {
  sketches: [],
  sketch: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_SKETCHES:
      return {
        ...state,
        sketches: action.payload,
        loading: false,
      };
    case LIKE_SKETCH:
    case UNLIKE_SKETCH:
      let index = state.sketches.findIndex(
        (sketch) => sketch.sketchId === action.payload.sketchId
      );
      state.sketches[index] = action.payload;
      return {
        ...state,
      };
    case DELETE_SKETCH: {
      let index = state.sketches.findIndex(
        (sketch) => sketch.sketchId === action.payload
      );
      let mutatedSketches = state.sketches.slice();
      mutatedSketches.splice(index, 1);
      return {
        ...state,
        sketches: [...mutatedSketches],
      };
    }
    case POST_SKETCH: {
      return {
        ...state,
        sketches: [action.payload, ...state.sketches],
      };
    }
    default:
      return state;
  }
}
