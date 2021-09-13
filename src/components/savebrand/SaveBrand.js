import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import { withRouter } from "react-router";

const useStyles = makeStyles(() => {
  return {
    mainCon: {
      height: "100vh",
      width: "100%",
    },
  };
});
const SaveBrand = (props) => {
  const [brandName, setBrandName] = useState("");
  const [commission, setcommission] = useState(0);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const changeBrandHan = (event) => {
    setBrandName(() => event.target.value);
  };

  const changeComHan = (event) => {
    setcommission(() => event.target.value);
  };

  const saveBrand = async () => {
    if (brandName === "") return;
    const token = localStorage.getItem("dimitra_token");
    if (!token) return;
    const formData = new FormData();
    formData.append("name", brandName.trim());
    formData.append("commission", commission);
    try {
      setLoading(true);
      const res = await axios.post(
        `http://getenroute.se/BE-stg/public/api/admin/brands/create?access_token=${token}`,
        formData
      );
      setLoading(false);
      console.log(res);
      alert(res.data.message);
      setBrandName("");
      setcommission(0);
      //   console.log(res);
      //   console.log(res.data);
    } catch (error) {
      setLoading(false);
      localStorage.removeItem("dimitra_token");
      props.history.push("/");
    }
  };
  useEffect(() => {
    if (!localStorage.getItem("dimitra_token")) props.history.push("/");
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
          type="text"
          label="Brandname"
          value={brandName}
          onChange={changeBrandHan}
        />
      </Grid>
      <Grid item>
        <TextField type="number" value={commission} onChange={changeComHan} />
      </Grid>
      <Grid item>
        {/* <Button onClick={loginHan}>
          {loading ? <CircularProgress /> : "Login"}
        </Button> */}
        {loading ? (
          <CircularProgress />
        ) : (
          <Button onClick={saveBrand}>Save</Button>
        )}
      </Grid>
    </Grid>
  );
};

export default withRouter(SaveBrand);
