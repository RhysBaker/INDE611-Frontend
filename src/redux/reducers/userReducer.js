import {
  SET_USER,
  SET_AUTH,
  SET_UNAUTH,
  LOADING_USER,
  LIKE_SKETCH,
  UNLIKE_SKETCH,
  MARK_NOTIF_READ,
} from "../types";

const initialState = {
  authenticated: false,
  loading: false,
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
        loading: false,
        ...action.payload,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case LIKE_SKETCH:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            sketchId: action.payload.sketchId,
          },
        ],
      };
    case UNLIKE_SKETCH:
      return {
        ...state,
        likes: state.likes.filter(
          (like) => like.sketchId !== action.payload.sketchId
        ),
      };
    case MARK_NOTIF_READ: {
      state.notifications.forEach((notif) => (notif.read = true));
      return {
        ...state,
      };
    }
    default:
      return state;
  }
}
