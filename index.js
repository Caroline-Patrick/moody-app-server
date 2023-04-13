const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();

const usersRoute =require("./routes/usersRoute");
const userLogsRoute=require("./routes/userLogsRoute");
const signupRoute = require("./routes/signup");
const signinRoute= require("./routes/signin");
const userInterventionRoute= require("./routes/userIntervention");
const moodsRoutes=require("./routes/moodsRoutes");

const PORT = process.env.PORT || 5000;


const authenticateToken=(req, res, next) => {
    //Get meta information for our request
    const authHeader = req.headers.authorization;
    // console.log({auth: authHeader})

   
    //take the Bearer token (if it exists) and split it at the space and then take the 2nd item in array
    const token = authHeader && authHeader.split(' ')[1];
    // console.log(token);

    //error 403 (not found) sent
    if(!token) return res.sendStatus(403); 
    
    //if token exists, let's verify it. need to match token + our secret string (would usually hide the secret string in a .env)
    // if first 2 args are good, then callback fxn fires
    jwt.verify(token, 'tacos are good', (err, user)=> {
        if(err) return res.sendStatus( 403);

        // add property called user to the request object
        // console.log({user})
        // console.log(req)
        req.user = user;

    
    });

    next();
}
app.use(cors());
app.use(function(req, res, next) {
    //allow this url to access
    res.setHeader(
        "Access-Control-Allow-Origin",
        "http://localhost:3000"
    );

    // Request methods you wish to allow
    res.setHeader("Access-Control-Allow-Methods", "POST");

    //request headers you wish to allow
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );

    //this is for setting cookies
    res.setHeader("Access-Control-Allow-Credentials", true);

    next();
});


app.use(express.json());
app.use('/signup', signupRoute);
app.use('/signin', signinRoute);
app.use('/users', authenticateToken, usersRoute);
app.use('/log', moodsRoutes);
app.use('/userLogs', authenticateToken, userLogsRoute);
app.use('/interventions', authenticateToken, userInterventionRoute);

app.get('/', (req,res)=> {
    res.json({message: "Hello Universe!"})
 });

app.listen(PORT, ()=> console.log(`Listening @ http://localhost:${PORT}`));