import { GET_POSTS, POST_ERROR, UPDATE_LIKES } from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
        error: {},
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        post: null,
        loading: false,
      };
    case UPDATE_LIKES:
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
        loading: false,
        error: {},
      };

    default:
      return state;
  }
}
