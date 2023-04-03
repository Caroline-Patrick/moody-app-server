const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;


//route is the '/', and ()=>{} function is the controller
app.get('/', (req,res)=> {
   res.json({message: "Hello Universe!"})


});
app.listen(PORT, ()=> console.log(`Listening @ http://localhost:${PORT}`));