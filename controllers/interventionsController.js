const pool = require("../sql/connections");

const list = (req, res) => {
  const userId = parseInt(req.params.userId);
  const subSubMoodId = parseInt(req.params.subSubMoodId)

  pool.query(
    `SELECT * FROM mood_interventions WHERE userId = ?`,
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


  

module.exports = {
    list,
    show
}