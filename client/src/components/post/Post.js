import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import { getPost } from '../../actions/post';
import PostItem from '../posts/PostItem';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';

const Post = ({ match, getPost, post: { post, loading } }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to='/posts' className='btn'>
        Back To Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postID={match.params.id} />

      <div className='comments'>
        {post.comments.map((comment, index) => (
          <CommentItem key={index} comment={comment} postID={post._id} />
        ))}
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
