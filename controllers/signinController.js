const bcrypt = require('bcrypt');
const pool = require('../sql/connections');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign(user, 'tacos are good');
};
const signin = (req, res) => {
    
    const { email, password } = req.body;
    console.log("Email and password received:", email, password);
  
    pool.query(`SELECT * FROM users WHERE email='${email}'`,
      async (err, results, fields) => {
        if (err) {
          console.error("Error in query execution:", err);
          return res.status(500).json({ error: "Internal server error" });
        }
  
        console.log("Query results:", results);
  
        if (results.length === 0) {
          return res.status(404).json({ error: "User not found" });
        }
  
        const match = await bcrypt.compare(password, results[0].password);
        console.log("Password match:", match);
  
        if (match) {
          const token = generateToken(results[0]);
          res.json({
            token,
            user: results[0],
          });
        } else {
          res.status(401).json({ error: "Invalid password" });
        }
      });
  };
  
// const signin = (req, res) => {
    
//     const { email, password } = req.body;
//     console.log("Email and password received:", email, password);
  
//     pool.query(`SELECT * FROM users WHERE email='${email}'`,
//       async (err, results, fields) => {
//         if (err) {
//           console.error("Error in query execution:", err);
//           return res.status(500).json({ error: "Internal server error" });
//         }
  
//         console.log("Query results:", results);
  
//         if (results.length === 0) {
//           return res.status(404).json({ error: "User not found" });
//         }
  
//         const match = await bcrypt.compare(password, results[0].password);
//         console.log("Password match:", match);
  
//         if (match) {
//           const token = generateToken(results[0]);
//           res.json({
//             token,
//             user: results[0],
//           });
//         } else {
//           res.status(401).json({ error: "Invalid password" });
//         }
//       });
//   };
  

module.exports = {
    signin,
};
