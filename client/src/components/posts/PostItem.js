import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { likePost, dislikePost, deletePost } from '../../actions/post';

const PostItem = ({ post, showActions }) => {
  const dispatch = useDispatch();
  const userID = useSelector((state) => state.auth.user._id); // Logged in user

  const {
    _id,
    loadingPosts,
    name,
    image,
    text,
    date,
    likes,
    dislikes,
    comments,
    user,
  } = post;

  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`profile/${user}`}>
          <img className='round-img' src={image} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
        {showActions && (
          <Fragment>
            <button
              type='button'
              className='btn btn-light'
              onClick={() => dispatch(likePost(_id))}
            >
              <i className='fas fa-thumbs-up' />{' '}
              {likes.length > 0 && <span>{likes.length}</span>}
            </button>
            <button
              type='button'
              className='btn btn-light'
              onClick={() => dispatch(dislikePost(_id))}
            >
              <i className='fas fa-thumbs-down' />{' '}
              {dislikes.length > 0 && <span>{dislikes.length}</span>}
            </button>
            <Link to={`/posts/${_id}`} className='btn btn-primary'>
              Discussion{' '}
              {comments.length > 0 && (
                <span className='comment-count'>{comments.length}</span>
              )}
            </Link>
            {!loadingPosts && user === userID && (
              <button
                type='button'
                className='btn btn-danger'
                onClick={() => dispatch(deletePost(_id))}
              >
                <i className='fas fa-times'></i>
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  showActions: PropTypes.bool,
};

PostItem.defaultProps = {
  showActions: true,
};

export default PostItem;
