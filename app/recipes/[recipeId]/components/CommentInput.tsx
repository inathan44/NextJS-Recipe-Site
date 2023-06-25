'use client';

import { useState } from 'react';

const CommentInput = () => {
  const [comment, setComment] = useState<string>('');

  function handleSubmit() {
    alert(comment);
  }

  return (
    <div className='py-2'>
      <form onSubmit={(e) => handleSubmit()}>
        <textarea
          className='block w-full rounded p-2 text-primary-dark'
          placeholder='Leave a comment'
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
      </form>
      <button onClick={handleSubmit}>Post comment</button>
    </div>
  );
};

export default CommentInput;
