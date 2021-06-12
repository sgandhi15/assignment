import { useEffect, useState } from "react";

import { TextField, Container, MenuItem, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TableData from "./TableData";
import Appbar from "./Appbar";

function App() {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    designation: "",
    dob: "",
    gender: "",
    country: "",
    state: "",
    dist: "",
  });
  const [states, setStates] = useState([]);
  const [dist, setDist] = useState([]);
  const [newUser, setNewUser] = useState();
  useEffect(() => {
    fetch("http://localhost:3001/user")
      .then((data) =>
        data.json().then((data) => {
          getStates(data.country);
          getDist(data.country, data.state);
          setUser(data);
        })
      )
      .catch((err) => console.log("Failed to connect with server", err));
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:3001/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((data) =>
        data.json().then((data) => {
          getStates(data.country);
          getDist(data.country, data.state);
          setUser(data);
          setNewUser(data);
        })
      )
      .catch((err) => console.log("Failed to connect with server", err));
  };

  const countryChange = (e) => {
    const country = e.target.value;
    setUser({ ...user, country: country, state: "", dist: "" });
    getStates(country);
  };

  const stateChange = (e) => {
    const state = e.target.value;
    setUser({ ...user, state: state, dist: "" });
    getDist(user.country, state);
  };

  const getStates = (country) => {
    fetch(`http://localhost:3001/states?country=${country}`)
      .then((data) => data.json().then((data) => setStates(data)))
      .catch((err) => console.log("Failed to connect with server", err));
  };
  const getDist = (country, state) => {
    fetch(`http://localhost:3001/dists?country=${country}&state=${state}`)
      .then((data) => data.json().then((data) => setDist(data)))
      .catch((err) => console.log("Failed to connect with server", err));
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        marginLeft: "25%",
        width: "50%",
      },
    },
    button: {
      display: "flex",
      flexDirection: "column",
      width: "50%",
      margin: "auto",
    },
  }));
  const classes = useStyles();

  return (
    <Container>
      <Appbar />
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          id="outlined-basic"
          label="Full Name"
          name="fullName"
          variant="outlined"
          fullWidth
          value={user.fullName}
          onChange={handleChange}
        />
        <TextField
          id="outlined-basic"
          label="Email"
          name="email"
          variant="outlined"
          value={user.email}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          id="outlined-basic"
          label="Designation"
          variant="outlined"
          name="designation"
          value={user.designation}
          onChange={handleChange}
        />
        <TextField
          id="date"
          label="Birthday"
          type="date"
          name="dob"
          InputLabelProps={{
            shrink: true,
          }}
          value={user.dob}
          onChange={handleChange}
        />

        <TextField
          select
          value={user.gender}
          onChange={handleChange}
          label="Gender"
          name="Gender"
          variant="outlined"
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </TextField>
        <TextField
          select
          value={user.country}
          onChange={countryChange}
          name="country"
          label="Country"
          variant="outlined"
        >
          <MenuItem value="India">India</MenuItem>
          <MenuItem value="USA">USA</MenuItem>
        </TextField>
        <TextField
          select
          value={user.state}
          onChange={stateChange}
          label="State"
          name="state"
          placeholder="Select State"
          variant="outlined"
        >
          {states.map((state) => (
            <MenuItem value={state} key={state}>
              {state}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          value={user.dist}
          onChange={handleChange}
          label="Dist"
          name="dist"
          variant="outlined"
        >
          {dist.map((d) => (
            <MenuItem value={d} key={d}>
              {d}
            </MenuItem>
          ))}
        </TextField>
        <Button
          className={classes.button}
          type="submit"
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </form>
      {newUser && <TableData user={newUser} />}
    </Container>
  );
}

export default App;
