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
    const { interventionName, interventionDesc, userId } = req.body;
    const { tier1MoodId, tier2MoodId, subSubMoodId } = req.body;
  
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
  
        if (tier1MoodId) {
          pool.query(
            "INSERT INTO userInterventionMoods (userInterventionId, tier1MoodId) VALUES (?, ?)",
            [userInterventionId, tier1MoodId],
            (err, result) => {
              if (err) {
                console.log(err);
                res.status(500).send("Error occurred while inserting user intervention mood");
                return;
              }
            }
          );
        }
  
        if (tier2MoodId) {
          pool.query(
            "INSERT INTO userInterventionMoods (userInterventionId, tier2MoodId) VALUES (?, ?)",
            [userInterventionId, tier2MoodId],
            (err, result) => {
              if (err) {
                console.log(err);
                res.status(500).send("Error occurred while inserting user intervention mood");
                return;
              }
            }
          );
        }
  
        if (subSubMoodId) {
          pool.query(
            "INSERT INTO userInterventionMoods (userInterventionId, subSubMoodId) VALUES (?, ?)",
            [userInterventionId, subSubMoodId],
            (err, result) => {
              if (err) {
                console.log(err);
                res.status(500).send("Error occurred while inserting user intervention mood");
                return;
              }
            }
          );
        }
  
        res.json({ message: "User intervention created successfully" });
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
      };

      const remove = (req,res)=> {
        const {userId, userInterventionId} = req.params;
        
     
         pool.query(`DELETE FROM userInterventions WHERE userId = ? AND userInterventionId = ?`, 
         //put whatever updates that come in from req.body; could be 1 or all (i.e.  email, name, etc.) where id=id coming in
         [userId, userInterventionId],
         function(err, row, fields) {
         res.json(row)
      });
     };
  
  

module.exports = {
    list,
    show,
    create,
    update,
    remove
}