// components/CommentForm.js
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const CommentForm = ({ onAddComment }: any) => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!comment) return;
    onAddComment(comment);
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit} className='flex items-center mt-4'>
      <TextField
        label='Add a comment'
        variant='outlined'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className='w-full'
      />
      <Button type='submit' variant='contained' className='ml-4'>
        Add
      </Button>
    </form>
  );
};

export default CommentForm;
