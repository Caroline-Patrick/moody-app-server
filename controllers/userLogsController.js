const pool = require("../sql/connections");

const list = (req, res) => {
  const userId = parseInt(req.params.userId);

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
  const { mood, userId } = req.body;

  // Find the moodId associated with the mood string
  pool.query(
    "SELECT moodId FROM moods WHERE moodName = ?",
    [mood],
    (err, rows, fields) => {
      if (err || rows.length === 0) {
        // Handle error
        console.log(err);
        res.status(500).send("Error occurred while fetching moodId");
        return;
      }

      // Get the moodId from the query result
      const moodId = rows[0].moodId;

      // Insert a new record into the userLogs table
      const currentDate = new Date();
      pool.query(
        "INSERT INTO userLogs(createDate, createTime, moodId, userId) VALUES (?, ?, ?, ?)",
        [currentDate, currentDate, moodId, userId],
        (err, result) => {
          if (err) {
            // Handle error
            console.log(err);
            res.status(500).send("Error occurred while inserting userLog");
            return;
          }

          // res.json({ message: "UserLog created successfully" });
        }
      );

      //below, 'i' is variable for interventions table && 'mi' stands for mood_interventions table
      //The INNER JOIN is joining the interventions and mood_interventions tables based on their common interventionId column
      //WHERE mi.moodId = ? --> filters the joined rows based on specified moodId. Will return rows where  moodId in the mood_interventions table (mi.moodId) is equal to the given moodId.
      pool.query(
        "SELECT i.interventionId, i.interventionName, i.interventionDesc FROM interventions i INNER JOIN mood_interventions mi ON i.interventionId = mi.interventionId WHERE mi.moodId = ?",
        [moodId],
        (err, interventions, fields) => {
          if (err) {
            console.log(err);
            res.status(500).send("Error occurred while fetching interventions");
            return;
          }

          // Send a response with the intervention options
          res.json({
            message: "UserLog created successfully",
            interventions: interventions,
          })
        });
    }
  );
};

const update = (req, res) => {
  const userId = parseInt(req.params.userId);
  const logId = parseInt(req.params.logId);
  const { mood } = req.body;

  if (isNaN(userId) || isNaN(logId)) {
    res.status(400).send("Invalid userId or logId");
    return;
  }

  // Find the moodId associated with the mood string
  pool.query(
    "SELECT moodId FROM moods WHERE moodName = ?",
    [mood],
    (err, rows, fields) => {
      if (err || rows.length === 0) {
        // Handle error
        console.log(err);
        res.status(500).send("Error occurred while fetching moodId");
        return;
      }

      // Get the moodId from the query result to update userLogs table
      const moodId = rows[0].moodId;

      pool.query(
        `UPDATE userLogs SET moodId = ? WHERE userId = ? AND logId = ?`,
        [moodId, userId, logId],
        function (err, result) {
          if (err) {
            console.log(err);
            res.status(500).send("Error occurred while updating the userLog");
            return;
          }
          res.json({ affectedRows: result.affectedRows });
        }
      );
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
  remove,
};
