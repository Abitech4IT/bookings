import { Link } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import SignupForm from "../components/SignupForm";

function Signup() {
  return (
    <Box>
      <SignupForm />
      <Typography align="center" sx={{ mt: 2 }}>
        Already have an account?{" "}
        <Link to="/login" style={{ color: "#1976d2" }}>
          Sign In
        </Link>
      </Typography>
    </Box>
  );
}

export default Signup;
