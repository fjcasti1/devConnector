import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../../actions/post';

const CommentForm = ({ postID }) => {
  const dispatch = useDispatch();

  const [text, setText] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addComment(postID, { text }));
    setText('');
  };

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Leave A Comment</h3>
      </div>
      <form className='form my-1' onSubmit={onSubmit}>
        <textarea
          name='text'
          value={text}
          cols='30'
          rows='5'
          placeholder='Comment on this post'
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

export default CommentForm;
