const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

var port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const auth = require("./Routes/Authentication/auth");
const user = require("./Routes/User/user");

// const port = process.env.PORT || 5000;

app.use(express.json());
// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };
// app.use(cors(corsOptions));
app.use(cors());
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "*");
//   res.header("Access-Control-Allow-Headers", "*");
//   next();
// });
app.use(auth);
// app.use(team);
app.use(user);

app.get("/get_image/:name", (req, res) => {
  const name = req.params.name;
  res.sendFile(path.join(__dirname, `./uploads/${name}`));
});

require("./conn");

const server = app.listen(port, () => {
  // const port = server.address().port;
  console.log(`connection successfull at ${port}`);
});
