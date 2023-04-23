const pool = require("../sql/connections");


const list = (req, res) => {
  const userId = parseInt(req.query.userId);

  pool.query(
    `SELECT * FROM userLogs WHERE userId = ?`,
    [userId],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
        res.status(500).send("Error occurred while fetching userLogs");
        return;
      }
      
      res.json(rows);
    }
  );
};


const show = (req, res) => {
  const userId = parseInt(req.params.userId);
  const logId = parseInt(req.params.logId);

  pool.query(
    `SELECT * FROM userLogs WHERE userId = ? AND logId = ?`,
    [userId, logId],
    function (err, row, fields) {
      if (err) {
        console.log(err);
        res.status(500).send("Error occurred while fetching userLog");
        return;
      }
      res.json(row[0]); // Send the first row since we expect a single log entry
    }
  );
};

const create = (req, res) => {

const {userId, subSubMoodName} = req.params;
const {userNotes, color} = req.body
  
  const currentDate = new Date();


      pool.query(
        "INSERT INTO userLogs(createDate, createTime, subSubMoodName, userNotes, color, userId) VALUES (?, ?, ?,?,?, ?)",
        [currentDate, currentDate, subSubMoodName, userNotes, color, userId],
        (err, result) => {
          if (err) {
            // Handle error
            console.log(err);
            res.status(500).send("Error occurred while inserting userLog");
            return;
          }
         
          res.json({
            message: "UserLog created successfully",
            
          });     
        });
    
      }

const update = (req, res) => {
  const userId = parseInt(req.params.userId);
  const logId = parseInt(req.params.logId);
  const { userNotes } = req.body;

  if (isNaN(userId) || isNaN(logId)) {
    res.status(400).send("Invalid userId or logId");
    return;
  }

      pool.query(
        `UPDATE userLogs SET userNotes = ? WHERE userId = ? AND logId = ?`,
        [userNotes, userId, logId],
        function (err, result) {
          if (err) {
            console.log(err);
            res.status(500).send("Error occurred while updating the userLog");
            return;
          }
          console.log("Updated")
          res.json({ affectedRows: result.affectedRows });
        }
      );
    };


const remove = (req, res) => {
  const userId = parseInt(req.params.userId);
  const logId = parseInt(req.params.logId);
  console.log(`userId: ${userId} and logId: ${logId}`);

  pool.query(
    `DELETE FROM userLogs WHERE userId=? AND logId= ?`,
    //put whatever updates that come in from req.body; could be 1 or all (i.e.  email, name, etc.) where id=id coming in
    [userId, logId],
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
  remove
}
