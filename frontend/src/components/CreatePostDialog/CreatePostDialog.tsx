import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import { IPostDTO } from '@/redux/modules/posts/types';

type Props = {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onSubmit: (data: IPostDTO) => void;
};

export default function CreatePostDialog({
  open,
  loading,
  onClose,
  onSubmit,
}: Props) {
  const [content, setContent] = useState('');

  useEffect(() => {
    if (!loading) {
      onClose();
    }
  }, [loading]);

  const handleOk = () => {
    onSubmit({
      postContent: content,
    });
  };

  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': { width: '100%', maxHeight: '100%', margin: 0 },
      }}
      maxWidth="sm"
      open={open}
      onClose={onClose}
    >
      <DialogTitle>Create Post</DialogTitle>
      <DialogContent dividers>
        <TextField
          label=""
          multiline
          rows={8}
          variant="outlined"
          sx={{ width: '100%' }}
          onChange={e => setContent(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button autoFocus color="inherit" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleOk} disabled={loading}>
          Post{loading && '...'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
