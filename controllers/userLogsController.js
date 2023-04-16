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
      console.log(userId)
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
console.log("made it to create!")
const {userId, subSubMoodName} = req.params;
const {userNotes} = req.body
  
  const currentDate = new Date();


      pool.query(
        "INSERT INTO userLogs(createDate, createTime, subSubMoodName, userNotes, userId) VALUES (?, ?, ?,?, ?)",
        [currentDate, currentDate, subSubMoodName, userNotes, userId],
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
        


  // Find the moodId associated with the mood string
  // pool.query(
  //   "SELECT moodId FROM moods WHERE moodName = ?",
  //   [mood],
  //   (err, rows, fields) => {
  //     if (err || rows.length === 0) {
  //       // Handle error
  //       console.log(err);
  //       res.status(500).send("Error occurred while fetching moodId");
  //       return;
  //     }

  //     // Get the moodId from the query result
  //     const moodId = rows[0].moodId;

  //     // Insert a new record into the userLogs table
  //     const currentDate = new Date();
  //     pool.query(
  //       "INSERT INTO userLogs(createDate, createTime, moodId, userId) VALUES (?, ?, ?, ?)",
  //       [currentDate, currentDate, moodId, userId],
  //       (err, result) => {
  //         if (err) {
  //           // Handle error
  //           console.log(err);
  //           res.status(500).send("Error occurred while inserting userLog");
  //           return;
  //         }
  //       }
  //     );

  //     // Fetches and returns the list of interventions (preset & user generated) based on the mood
  //     pool.query(
  //     `SELECT 
  //       i.interventionId, 
  //       i.interventionName, 
  //       i.interventionDesc,
  //       'preset' as interventionType
  //     FROM interventions i
  //     INNER JOIN mood_interventions mi ON i.interventionId = mi.interventionId
  //     WHERE mi.moodId = ?
  //     UNION ALL
  //     SELECT 
  //       ui.userInterventionId as interventionId, 
  //       ui.interventionName, 
  //       ui.interventionDesc,
  //       'user' as interventionType
  //     FROM userInterventions ui
  //     INNER JOIN userInterventionMoods uim ON ui.userInterventionId = uim.userInterventionId
  //     WHERE uim.moodId = ? AND ui.userId = ?`,
  //       [moodId, moodId, userId],
  //       (err, rows, fields) => {
  //         if (err) {
  //           console.log(err);
  //           res.status(500).send("Error occurred while fetching interventions");
  //           return;
  //         }

  //         // Send a response with the intervention options
  //         res.json({
  //           message: "UserLog created successfully",
  //           interventions: rows,
  //         });
  //       }
  //     );
  //   }
  // );
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

const updateIntervention = (req, res) => {
  const userId = parseInt(req.params.userId);
  const logId = parseInt(req.params.logId);
  const { interventionId } = req.body;

  pool.query(
    `UPDATE userLogs SET interventionId = ? WHERE userId = ? AND logId = ?`,
    [interventionId, userId, logId],
    function (err, result) {
      if (err) {
        console.log(err);
        res
          .status(500)
          .send("Error occurred while updating the userLog with intervention");
        return;
      }
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
  updateIntervention,
  remove,
};
