import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, TextField, Button, Stack } from '@mui/material';
import useCurrentUser from '@/hooks/useCurrentUser';
import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { CommentType } from '../tickets/Ticket';
import {
  useAddComment,
  useDeleteComment,
  useEditComment
} from '@/hooks/ticket.hook';
import ticketId from '@/pages/projects/[projectId]';

const Comment = ({
  comments,
  ticketId,
  userId
}: {
  comments: CommentType[];
  ticketId: string;
  userId: string;
}) => {
  const [newComment, setNewComment] = React.useState('');
  const { mutateAsync } = useAddComment(ticketId);
  const { mutateAsync: deleteComment } = useDeleteComment(ticketId);
  const { mutateAsync: editComment } = useEditComment(ticketId);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedComment, setEditedComment] = useState<string>('');
  const addComment = () => {
    mutateAsync({ content: newComment, ticketId, userId });
    setNewComment('');
  };
  const handleEditClick = (commentId: string, content: string) => {
    setEditingCommentId(commentId);
    setEditedComment(content);
  };
  const handleUpdateComment = () => {
    // Update the comment with the editedComment value
    // You can use the existing useUpdateComment hook or create a new one for updating comments
    // After updating, reset the editing mode
    if (editedComment && editingCommentId) {
      editComment({
        ticketId,
        userId,
        id: editingCommentId,
        content: editedComment
      });
    }
    console.log({ id: editingCommentId, content: editedComment });
    setEditingCommentId(null);
    setEditedComment('');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    return formatter.format(date);
  };

  const { data: sessionData } = useCurrentUser();
  return (
    <Box sx={{ marginTop: '1rem', maxHeight: '100%', overflowY: 'auto' }}>
      {comments &&
        comments.map((comment: CommentType) => (
          <Card key={comment.id} sx={{ marginTop: '1rem' }}>
            <CardContent>
              {editingCommentId === comment.id ? (
                <TextField
                  value={editedComment}
                  onChange={(e) => setEditedComment(e.target.value)}
                  onBlur={handleUpdateComment}
                  fullWidth
                  autoFocus
                />
              ) : (
                <Typography variant='body2' className='text-lime-400'>
                  {comment.content}
                </Typography>
              )}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '0.5rem'
                }}
              >
                <Typography variant='caption' className='text-amber-200'>
                  {comment.author.name} | {formatDate(comment.createdAt)}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton
                    className='hover:text-blue-400'
                    aria-label='upvote'
                    onClick={() => {
                      // handle upvote logic here
                    }}
                    // sx={{
                    //   color: comment.author.id === userId ? 'skyblue' : null
                    // }}
                  >
                    <ThumbUpAltIcon />
                  </IconButton>
                  <Typography variant='caption'>
                    {comment.upvoteCount} upvotes
                  </Typography>
                </Box>
                <Stack direction='row' spacing={2}>
                  {editingCommentId === comment.id ? (
                    <Typography
                      variant='subtitle2'
                      className='hover:cursor-pointer hover:text-blue-400'
                      onClick={handleUpdateComment}
                    >
                      Save
                    </Typography>
                  ) : (
                    <Typography
                      variant='subtitle2'
                      className='hover:cursor-pointer hover:text-blue-400'
                      onClick={() =>
                        handleEditClick(comment.id, comment.content)
                      }
                    >
                      Edit
                    </Typography>
                  )}
                  <Typography
                    variant='subtitle2'
                    className='hover:cursor-pointer hover:text-blue-400'
                    onClick={() =>
                      deleteComment({ id: comment.id, ticketId, userId })
                    }
                  >
                    Delete
                  </Typography>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        ))}
      {sessionData && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginTop: '1rem'
          }}
        >
          <TextField
            label='Add comment'
            multiline
            fullWidth
            rows={4}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            variant='outlined'
          />
          <Button
            onClick={addComment}
            variant='contained'
            className='bg-cyan-700 m-1 mt-3'
            disabled={!newComment.trim()}
          >
            Comment
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Comment;
