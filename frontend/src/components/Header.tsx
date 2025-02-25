import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Booking App
        </Typography>
        <Button
          color="inherit"
          onClick={() => {
            window.localStorage.clear();
            navigate("/login");
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};
