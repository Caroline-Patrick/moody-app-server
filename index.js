const express = require("express");
const app = express();

const pool =require("./sql/connections")

const usersRoute =require("./routes/usersRoute")
const PORT = process.env.PORT || 5000;



app.use(express.json());

app.use('/users', usersRoute);

 



app.get('/', (req,res)=> {
    res.json({message: "Hello Universe!"})
 });

app.listen(PORT, ()=> console.log(`Listening @ http://localhost:${PORT}`));