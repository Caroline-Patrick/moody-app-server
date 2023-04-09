const pool = require("../sql/connections");

const list = (req, res) => {
  const userId = parseInt(req.params.userId);

  pool.query(
    `SELECT * FROM userInterventions WHERE userId = ?`,
    [userId],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
        res.status(500).send("Error occurred while fetching userInterventions");
        return;
      }
      res.json(rows);
    }
  );
};


const show = (req, res) => {
    const userId = parseInt(req.params.userId);
    const userInterventionId = parseInt(req.params.userInterventionId);
  
    pool.query(
      `SELECT * FROM userInterventions WHERE userId=? and userInterventionId = ?`,
      [userId, userInterventionId],
      function (err, row, fields) {
        if (err) {
          console.log(err);
          res.status(500).send("Error occurred while fetching intervention");
          return;
        }
        res.json(row[0]); // Send the first row since we expect a single log entry
      }
    );
  };

const create = (req, res) => {
    const { interventionName, interventionDesc, moods, userId } = req.body;
  
    // Insert a new record into the userInterventions table
    pool.query(
      "INSERT INTO userInterventions (interventionName, interventionDesc, userId) VALUES (?, ?, ?)",
      [interventionName, interventionDesc, userId],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error occurred while inserting user intervention");
          return;
        }
  
        const userInterventionId = result.insertId;
  
        // Loop through the moods array and insert associations into the userInterventionMoods table
        moods.forEach((mood, index) => {
          pool.query(
            "SELECT moodId FROM moods WHERE moodName = ?",
            [mood],
            (err, rows, fields) => {
              if (err || rows.length === 0) {
                console.log(err);
                res.status(500).send("Error occurred while fetching moodId");
                return;
              }
  
              const moodId = rows[0].moodId;
  
              pool.query(
                "INSERT INTO userInterventionMoods (userInterventionId, moodId) VALUES (?, ?)",
                [userInterventionId, moodId],
                (err, result) => {
                  if (err) {
                    console.log(err);
                    res.status(500).send("Error occurred while inserting user intervention mood");
                    return;
                  }
  
                  if (index === moods.length - 1) {
                    res.json({ message: "User intervention created successfully" });
                  }
                }
              );
            }
          );
        });
      }
    );
  };

  const update = (req, res) => {
    const userId = parseInt(req.params.userId);
    const userInterventionId = parseInt(req.params.userInterventionId);
  
        pool.query(
          `UPDATE userInterventions SET ? WHERE userId = ? AND userInterventionId = ?`,
          [req.body, userId, userInterventionId],
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

  
  

module.exports = {
    list,
    show,
    create,
    update
}