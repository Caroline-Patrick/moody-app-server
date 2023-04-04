const express = require("express");
const app = express();

const pool =require("./sql/connections")
const PORT = process.env.PORT || 5000;


//route is the '/', and ()=>{} function is the controller
app.get('/', (req,res)=> {
   res.json({message: "Hello Universe!"})
});


app.get('/users', (req,res)=>{
    pool.query("SELECT * FROM users", function(err, rows,fields) {
        res.json(rows)
    })
});

app.get('/users/:id', (req,res)=> {
    // console.log(req.params.id)
    const {id} = req.params
    pool.query(`SELECT * FROM users WHERE userId =${id}`, function(err, rows, fields) {
   
    res.json(rows)
 }) 
 });

 app.use(express.json());

 app.post('/users/', (req,res)=> {
    console.log(req.body)
    
    const {firstName, lastName, email, userName, password} = req.body
 
    pool.query(`INSERT INTO users(userId, firstName, lastName, email, userName, password) VALUES (?, ?, ?, ?, ?, ?)`, 
    [null, firstName, lastName, email, userName, password], 
    function(err, row, fields) {
   
    res.json(row)
 })
 });
 
 

app.listen(PORT, ()=> console.log(`Listening @ http://localhost:${PORT}`));