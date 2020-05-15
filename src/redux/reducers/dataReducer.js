import {
  SET_SKETCHES,
  SET_SKETCH,
  LOADING_DATA,
  LIKE_SKETCH,
  UNLIKE_SKETCH,
  DELETE_SKETCH,
  POST_SKETCH,
  SUBMIT_COMMENT,
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
    case SET_SKETCH:
      return {
        ...state,
        sketch: action.payload,
      };
    case LIKE_SKETCH:
    case UNLIKE_SKETCH:
      let index = state.sketches.findIndex(
        (sketch) => sketch.sketchId === action.payload.sketchId
      );
      state.sketches[index] = action.payload;
      if (state.sketch.sketchId === action.payload.sketchId) {
        let tmp = state.sketch.comments;
        state.sketch = action.payload;
        state.sketch.comments = tmp;
      }
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
    case SUBMIT_COMMENT: {
      return {
        ...state,
        sketch: {
          ...state.sketch,
          comments: [action.payload, ...state.sketch.comments],
        },
      };
    }
    default:
      return state;
  }
}
