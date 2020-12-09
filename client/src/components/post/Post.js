import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import { getPost } from '../../actions/post';
import PostItem from '../posts/PostItem';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';

const Post = ({ match }) => {
  const dispatch = useDispatch();
  const { post, loading } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPost(match.params.id));
  }, [dispatch, match]);

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

export default Post;
