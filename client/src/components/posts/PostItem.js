import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addLike, removeLike } from '../../actions/post';

const PostItem = ({
  userID, //Logged in user
  post: { _id, loading, name, avatar, text, date, likes, comments, user }, // Post user
  addLike,
  removeLike,
}) => {
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <a href='profile.html'>
          <img className='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </a>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
        <button type='button' className='btn btn-light' onClick={() => addLike(_id)}>
          <i className='fas fa-thumbs-up' />{' '}
          {likes.length > 0 && <span>{likes.length}</span>}
        </button>
        <button
          type='button'
          className='btn btn-light'
          onClick={() => removeLike(_id)}
        >
          <i className='fas fa-thumbs-down' />
        </button>
        <Link to={`/post/${_id}`} className='btn btn-primary'>
          Discussion{' '}
          {comments.length > 0 && (
            <span className='comment-count'>{comments.length}</span>
          )}
        </Link>
        {!loading && user === userID && (
          <button type='button' className='btn btn-danger'>
            <i className='fas fa-times'></i>
          </button>
        )}
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  userID: PropTypes.string.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userID: state.auth.user._id, // Logged in user Id
});

export default connect(mapStateToProps, { addLike, removeLike })(PostItem);
