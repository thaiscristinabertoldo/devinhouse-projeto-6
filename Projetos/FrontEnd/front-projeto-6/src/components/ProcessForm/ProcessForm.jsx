import { useTheme } from "@emotion/react";
import {
  DialogActions,
  Button,
  DialogContent,
  DialogTitle,
  useMediaQuery,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

export const ProcessForm = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <DialogTitle>teste</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth={fullScreen}
          autoFocus
          margin="dense"
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth={fullScreen}
          margin="dense"
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained" type="submit">
          Submit
        </Button>
      </DialogActions>
    </form>
  );
};
