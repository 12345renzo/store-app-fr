"use client"
import React from 'react'
import PropTypes from 'prop-types'
import { Box, Paper } from '@mui/material';
import "animate.css";

function AuthLayout({children}) {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        px: 2,
        overflow: "hidden",
      }}
    >
      <Paper
        elevation={5}
        sx={{
          p: 4,
          width: "90%",
          maxWidth: 400,
          textAlign: "center",
          borderRadius: 5,
          border: "5px solid aqua",
          backgroundColor: "black",
          boxShadow: "0 0 10px 5px rgba(255, 255, 255, 0.8)",
        }}
      >
        {children}
      </Paper>
    </Box>
  );
}

AuthLayout.propTypes = {
    children:PropTypes.any.isRequired,
    title:PropTypes.string.isRequired
}

export default AuthLayout
