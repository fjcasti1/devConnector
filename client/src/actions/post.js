import axios from 'axios';
import { setAlert } from './alert';
import {
  ADD_COMMENT_SUCCESS,
  ADD_POST_SUCCESS,
  DELETE_POST_SUCCESS,
  GET_POSTS_SUCCESS,
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  POST_FAIL,
  CLEAR_POST,
  REMOVE_COMMENT_SUCCESS,
  UPDATE_LIKES_SUCCESS,
  UPDATE_DISLIKES_SUCCESS,
} from './types';

// Get posts
export const getPosts = () => async (dispatch) => {
  dispatch({ type: CLEAR_POST });
  try {
    const res = await axios.get('/api/posts');
    dispatch({
      type: GET_POSTS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get post
export const getPost = (postID) => async (dispatch) => {
  dispatch({ type: GET_POST_REQUEST });
  try {
    const res = await axios.get(`/api/posts/${postID}`);
    dispatch({
      type: GET_POST_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Like a Post
export const likePost = (postID) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/${postID}/like`);
    dispatch({
      type: UPDATE_LIKES_SUCCESS,
      payload: { postID, likes: res.data.likes },
    });
    dispatch({
      type: UPDATE_DISLIKES_SUCCESS,
      payload: { postID, dislikes: res.data.dislikes },
    });
  } catch (err) {
    dispatch({
      type: POST_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Dislike a Post
export const dislikePost = (postID) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/${postID}/dislike`);
    dispatch({
      type: UPDATE_LIKES_SUCCESS,
      payload: { postID, likes: res.data.likes },
    });
    dispatch({
      type: UPDATE_DISLIKES_SUCCESS,
      payload: { postID, dislikes: res.data.dislikes },
    });
  } catch (err) {
    dispatch({
      type: POST_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Post
export const deletePost = (postID) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${postID}`);
    dispatch({
      type: DELETE_POST_SUCCESS,
      payload: postID,
    });
    dispatch(setAlert('Post Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Post
export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/posts/', formData, config);
    dispatch({
      type: ADD_POST_SUCCESS,
      payload: res.data,
    });
    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    dispatch({
      type: POST_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Comment
export const addComment = (postID, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(`/api/posts/${postID}/comment`, formData, config);
    dispatch({
      type: ADD_COMMENT_SUCCESS,
      payload: res.data,
    });
    dispatch(setAlert('Comment Posted', 'success'));
  } catch (err) {
    dispatch({
      type: POST_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Remove Comment
export const removeComment = (postID, commentID) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${postID}/comment/${commentID}`);
    dispatch({
      type: REMOVE_COMMENT_SUCCESS,
      payload: commentID,
    });
    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
