const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("HEY DU!");
});

app.post("/signin", (req, res) => {
  console.log(req.body);

  if (req.body.email === "admin@admin.com" && req.body.password === "12345") {
    res.send({ token: process.env.AUTH_TOKEN });
  } else {
    res.send({ errorMessage: "Wrong password or email" });
  }
});

app.listen(port, () => {
  console.log("Server Running at ", port);
});
