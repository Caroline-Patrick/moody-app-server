const bcrypt = require("bcrypt");
const pool = require("../sql/connections");

const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    pool.query(
      `INSERT INTO users(userId, firstName, lastName, email, password) VALUES (?, ?, ?, ?, ?)`,
      [null, firstName, lastName, email, hashedPassword],
      function (err, row, fields) {
        if (err) {
          console.error(err);
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ message: "Email already exists" });
          }
          return res.status(500).json({ message: "Internal server error" });
        }
        res.json(row);
      }
    );
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = {
  signup,
};
