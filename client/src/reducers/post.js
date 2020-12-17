import {
  GET_POST_REQUEST,
  POST_FAIL,
  CLEAR_POST,
  GET_POSTS_SUCCESS,
  GET_POST_SUCCESS,
  UPDATE_LIKES_SUCCESS,
  UPDATE_DISLIKES_SUCCESS,
  DELETE_POST_SUCCESS,
  ADD_POST_SUCCESS,
  ADD_COMMENT_SUCCESS,
  REMOVE_COMMENT_SUCCESS,
} from '../actions/types';

const initialState = {
  post: null,
  posts: [],
  loadingPost: true,
  loadingPosts: true,
  error: {},
};

export const postReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_POST_REQUEST:
      return {
        ...state,
        loadingPost: true,
      };
    case GET_POST_SUCCESS:
      return {
        ...state,
        post: payload,
        loadingPost: false,
        error: {},
      };
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: payload,
        loadingPosts: false,
        error: {},
      };
    case UPDATE_LIKES_SUCCESS:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.postID
            ? {
                ...post,
                likes: payload.likes,
              }
            : post,
        ),
        loadingPosts: false,
        error: {},
      };
    case UPDATE_DISLIKES_SUCCESS:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.postID
            ? {
                ...post,
                dislikes: payload.dislikes,
              }
            : post,
        ),
        loadingPosts: false,
        error: {},
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loadingPost: false,
        error: {},
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loadingPost: false,
        error: {},
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loadingPost: false,
        error: {},
      };
    case REMOVE_COMMENT_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter((comment) => comment._id !== payload),
        },
        loadingPost: false,
        error: {},
      };
    case CLEAR_POST:
      return {
        ...state,
        post: null,
        error: {},
      };
    case POST_FAIL:
      return {
        ...state,
        error: payload,
        post: null,
        loadingPost: false,
        loadingPosts: false,
      };
    default:
      return state;
  }
};
