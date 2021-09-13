import {
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Redirect, withRouter } from "react-router";

const useStyles = makeStyles(() => {
  return {
    mainCon: {
      height: "100vh",
      width: "100%",
    },
  };
});
const Login = (props) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const loginHan = async () => {
    if (email === "" || password === "") return;
    const formData = new FormData();
    formData.append("email", email.trim());
    formData.append("password", password.trim());
    try {
      setLoading(true);
      const res = await axios.post(
        "http://getenroute.se/BE-stg/public/api/admin/login",
        formData
      );
      setLoading(false);
      console.log(res.data);
      console.log(res.data.auth.access_token);
      if (res.data.status == "success") {
        localStorage.setItem("dimitra_token", res.data.auth.access_token);
        props.history.push("/savebrand");
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const changeEmailHan = (event) => {
    setEmail(() => event.target.value);
  };

  const changePassHan = (event) => {
    setPassword(() => event.target.value);
  };
  useEffect(() => {
    if (localStorage.getItem("dimitra_token")) {
      // console.log();
      props.history.push("/savebrand");
    }
  }, []);
  return (
    <Grid
      className={classes.mainCon}
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        <TextField
          type="email"
          label="email"
          value={email}
          onChange={changeEmailHan}
        />
      </Grid>
      <Grid item>
        <TextField
          type="password"
          label="password"
          value={password}
          onChange={changePassHan}
        />
      </Grid>
      <Grid item>
        {/* <Button onClick={loginHan}>
          {loading ? <CircularProgress /> : "Login"}
        </Button> */}
        {loading ? (
          <CircularProgress />
        ) : (
          <Button onClick={loginHan}>Login</Button>
        )}
      </Grid>
    </Grid>
  );
};

export default withRouter(Login);
