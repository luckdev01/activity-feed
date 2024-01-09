import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function Login() {
  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues: {
        username: '',
        password: '',
      },
      validationSchema: Yup.object({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required'),
      }),
      onSubmit: (values) => {
        // Login logic here
        console.log('Login values:', values);
      },
    });

  return (
    <Box sx={{ pt: 12, maxWidth: 500, margin: 'auto' }}>
      <Typography variant="h5" textAlign="center">
        Log In
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          id="username"
          name="username"
          label="Username"
          margin="normal"
          variant="outlined"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.username}
          error={touched.username && Boolean(errors.username)}
          helperText={touched.username && errors.username}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          margin="normal"
          variant="outlined"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          error={touched.password && Boolean(errors.password)}
          helperText={touched.password && errors.password}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, height: 50 }}
        >
          Sign In
        </Button>
      </form>
    </Box>
  );
}
