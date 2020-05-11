import {
  SET_USER,
  SET_ERRORS,
  CLR_ERRORS,
  LOADING_UI,
  SET_AUTH,
  SET_UNAUTH,
} from "../types";

const initialState = {
  authenticated: false,
  credentials: {},
  likes: [],
  notifications: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTH:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        ...action.payload,
      };
    default:
      return state;
  }
}
