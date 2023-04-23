const pool = require("../sql/connections");

const list = (req, res) => {
  pool.query("SELECT * FROM users", function (err, rows, fields) {
    res.json(rows);
  });
};

const show = (req, res) => {
  const { id } = req.params;
  pool.query(
    `SELECT * FROM users WHERE userId =${id}`,
    function (err, rows, fields) {
      res.json(rows);
    }
  );
};

const create = (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  pool.query(
    `INSERT INTO users(userId, firstName, lastName, email, password) VALUES (?, ?, ?, ?, ?, ?)`,
    [null, firstName, lastName, email, password],
    function (err, row, fields) {
      res.json(row);
    }
  );
};

const update = (req, res) => {
  const { userId } = req.params;
  pool.query(
    `UPDATE users SET ? WHERE userId= ?`,
    [req.body, userId],
    function (err, row, fields) {
      res.json(row);
    }
  );
};

const remove = (req, res) => {
  const { userId } = req.params;
  pool.query(
    `DELETE FROM users WHERE userId= ?`,
    [userId],
    function (err, row, fields) {
      res.json(row);
    }
  );
};

module.exports = {
  list,
  show,
  create,
  update,
  remove,
};
