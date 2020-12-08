import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeComment } from '../../actions/post';

const CommentItem = ({ comment, postID }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const { _id, user, text, name, image, date } = comment;

  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={image} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
        {!auth.loading && user === auth.user._id && (
          <button
            type='button'
            className='btn btn-danger'
            onClick={() => dispatch(removeComment(postID, _id))}
          >
            Delete Comment
          </button>
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  postID: PropTypes.string.isRequired,
};

export default CommentItem;
