import { Link } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import LoginForm from "../components/LoginForm";

function Login() {
  return (
    <Box>
      <LoginForm />
      <Typography align="center" sx={{ mt: 2 }}>
        Don't have an account?{" "}
        <Link to="/signup" style={{ color: "#1976d2" }}>
          Sign Up
        </Link>
      </Typography>
    </Box>
  );
}

export default Login;
