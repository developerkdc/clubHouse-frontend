import { Button, Container, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "80vh",
  },
  typography: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const AnimatedContainer = animated(Container);

const NotFound = () => {
  const classes = useStyles();

  // Define animations
  const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 100 });
  const slideUp = useSpring({
    transform: "translateY(0)",
    from: { transform: "translateY(50px)" },
    delay: 400,
  });

  return (
    <AnimatedContainer
      style={{ ...fadeIn, ...slideUp }}
      className={classes.container}
    >
      <Typography variant="h1" className={classes.typography}>
        Oops! Page Not Found
      </Typography>
      <Typography variant="h5" className={classes.typography}>
        The page you are looking for might be in another castle.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
        className={classes.button}
      >
        Go Home
      </Button>
    </AnimatedContainer>
  );
};

export default NotFound;
