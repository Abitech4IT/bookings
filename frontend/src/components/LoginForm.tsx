import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Container,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import { LoginSchema } from "../schemas/AuthSchema";
import { useLoginMutation } from "../services/authAPI";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

function LoginForm() {
  const [login] = useLoginMutation();

  const { login: authLogin } = useAuth();

  const navigate = useNavigate();

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography component="h1" variant="h5" align="center">
          Sign In
        </Typography>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={LoginSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const res = await login(values).unwrap();

              if (res.token && res.user) {
                authLogin(res.token, res.user);
                toast.success("Login successful");
                navigate("/dashboard");
              }
            } catch (err) {
              if (err instanceof Error) {
                toast.error(`Login failed: ${err.message}`);
                console.error(`Sighup failed: ${err.message}`);
              } else {
                toast.error("Login failed");
                console.error("Signup failed");
              }
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ errors, touched, status, isSubmitting }) => (
            <Form>
              <Box sx={{ mt: 3 }}>
                <Field
                  as={TextField}
                  margin="normal"
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <Field
                  as={TextField}
                  margin="normal"
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
                {status?.error && (
                  <Typography color="error" sx={{ mt: 2 }}>
                    {status.error}
                  </Typography>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
}

export default LoginForm;
