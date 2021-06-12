const { countries } = require("../model/Country");
const { User } = require("../model/User");

const router = require("express").Router();

router.get("/user", (req, res) => {
  res.status(200).send(User);
});

router.post("/user", (req, res) => {
  const user = { ...User, ...req.body };
  res.send(user);
});

router.get("/states", (req, res) => {
  const country = req.query.country;
  const states = Object.keys(countries[country]);
  res.status(200).send(states);
});

router.get("/dists", (req, res) => {
  const country = req.query.country;
  const state = req.query.state;
  const dists = countries[country][state];
  res.status(200).send(dists);
});

exports.router = router;
