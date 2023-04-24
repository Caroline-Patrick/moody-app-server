const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(cors({
  origin: "https://effulgent-strudel-007716.netlify.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

const usersRoute = require("./routes/usersRoute");
const userLogsRoute = require("./routes/userLogsRoute");
const signupRoute = require("./routes/signup");
const signinRoute = require("./routes/signin");
const userInterventionRoute = require("./routes/userInterventions");
const moodsRoutes = require("./routes/moodsRoutes");
const interventionsRoute = require("./routes/interventionsRoutes");


const PORT = process.env.PORT || 5000;

const authenticateToken = (req, res, next) => {
  //Get meta information for our request
  const authHeader = req.headers.authorization;
  // console.log({auth: authHeader})
  console.log("Request headers: ", req.headers)

  //take the Bearer token (if it exists) and split it at the space and then take the 2nd item in array
  const token = authHeader && authHeader.split(" ")[1];
  console.log("Token: ", token);

  //error 403 (not found) sent
  if (!token) return res.sendStatus(403);

  //if token exists, let's verify it. need to match token + our secret string (would usually hide the secret string in a .env)
  // if first 2 args are good, then callback fxn fires
  jwt.verify(token, "tacos are good", (err, user) => {
    if (err) return res.sendStatus(403);

    // add property called user to the request object
    req.user = user;
  });

  next();
};



// app.use(cors({
//   origin: 'https://effulgent-strudel-007716.netlify.app',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// app.use(cors());


// app.use(function (req, res, next) {
//   //allow this url to access
//   res.setHeader("Access-Control-Allow-Origin", "https://effulgent-strudel-007716.netlify.app/");

//   // Request methods you wish to allow
//   res.setHeader("Access-Control-Allow-Methods", "POST", "GET", "PUT", "DELETE");

//   //request headers you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type",
//     "Authorization"
//   );

//   //this is for setting cookies
//   res.setHeader("Access-Control-Allow-Credentials", true);

//   next();
// });

app.use(express.json());
app.use("/signup", signupRoute);
app.use("/signin", signinRoute);
app.use("/users", authenticateToken, usersRoute);
app.use("/log", moodsRoutes);
app.use("/userLogs", authenticateToken, userLogsRoute);
app.use("/user-interventions", userInterventionRoute);
app.use("/interventions", interventionsRoute);

app.get("/", (req, res) => {
  res.json({ message: "Hello Universe!" });
});

app.get("/test", (req, res) => {
  res.json({ message: "Test route working" });
});


app.listen(PORT, () => console.log(`Listening @ http://localhost:${PORT}`));
