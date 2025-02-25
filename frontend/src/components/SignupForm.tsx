import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Container,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import { SignupSchema } from "../schemas/AuthSchema";
import { useSignupMutation } from "../services/authAPI";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function SignupForm() {
  const [signup] = useSignupMutation();

  const navigate = useNavigate();

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography component="h1" variant="h5" align="center">
          Sign Up
        </Typography>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const data = {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password,
              };
              const res = await signup(data).unwrap();
              if (res.token) {
                localStorage.removeItem("token");
                localStorage.setItem("token", res.token);
              }
              toast.success("Signup successful");
              navigate("/dashboard");
            } catch (err) {
              if (err instanceof Error) {
                toast.error(`Signup failed: ${err.message}`);
                console.error(`Sighup failed: ${err.message}`);
              } else {
                console.error("Signup failed");
                toast.error("Signup failed");
              }
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ errors, touched, status, isSubmitting }) => (
            <Form>
              <Box sx={{ mt: 3 }}>
                <>
                  <Field
                    as={TextField}
                    margin="normal"
                    fullWidth
                    label="First Name"
                    name="firstName"
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />
                  <Field
                    as={TextField}
                    margin="normal"
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />
                </>

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

export default SignupForm;
