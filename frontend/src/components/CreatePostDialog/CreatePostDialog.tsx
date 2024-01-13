import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import { IPostDTO } from '@/redux/modules/posts/types';
import { useFormik } from 'formik';
import * as Yup from 'yup';

type Props = {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  handlePost: (data: IPostDTO) => void;
  onPost: () => void;
};

export default function CreatePostDialog({
  open,
  loading,
  onClose,
  handlePost,
  onPost,
}: Props) {
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    isValid,
    resetForm,
  } = useFormik<IPostDTO>({
    initialValues: {
      postContent: '',
    },
    validationSchema: Yup.object({
      postContent: Yup.string().required('Content is required').max(200),
    }),
    onSubmit: values => {
      handlePost(values);
    },
  });

  const handleClose = () => {
    onClose();
    resetForm();
  };

  useEffect(() => {
    if (!loading) {
      handleClose();
      onPost();
    }
  }, [loading]);

  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': { width: '100%', maxHeight: '100%', margin: 0 },
      }}
      maxWidth="sm"
      open={open}
      onClose={handleClose}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle>Create Post</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ position: 'relative' }}>
            <TextField
              id="postContent"
              name="postContent"
              label=""
              multiline
              rows={8}
              variant="outlined"
              sx={{ width: '100%' }}
              value={values.postContent}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.postContent && Boolean(errors.postContent)}
              helperText={touched.postContent && errors.postContent}
            />
            <FormHelperText
              style={{
                position: 'absolute',
                bottom: 2,
                right: 8,
                color: 'gray',
              }}
            >
              {values.postContent.length} / 200
            </FormHelperText>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus color="inherit" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading || !isValid}
          >
            Post{loading && '...'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
