const pool = require("../sql/connections");

// const list = (req, res) => {
//   const userId = parseInt(req.params.userId);
//   const subSubMoodId = parseInt(req.params.subSubMoodId)

//   pool.query(
//     `SELECT *
//     FROM userInterventions
//     JOIN mood_interventions
//       ON userInterventions.moodInterventionId = mood_interventions.id
//     WHERE userInterventions.userId = ? AND mood_interventions.subSubMoodId = ?
//     `,
//     [userId, subSubMoodId],
//     function (err, rows, fields) {
//       if (err) {
//         console.log(err);
//         res.status(500).send("Error occurred while fetching interventions");
//         return;
//       }
//       res.json(rows);
//     }
//   );
// };


const list = (req, res) => {
  const {userId, subSubMoodId} = req.params;
  pool.query(
    'SELECT * FROM userInterventionMoods JOIN mood_interventions ON userInterventionMoods.subSubMoodId = mood_interventions.subSubMoodId WHERE userInterventionMoods.subSubMoodId = ? OR mood_interventions.subSubMoodId = ?',
    [subSubMoodId, subSubMoodId],
    function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.status(500).send("Error occurred while fetching interventions");
            return;
        }
        res.json(rows);
    }
);

  // pool.query(
  //       `SELECT *
  //       FROM mood_interventions
  //       JOIN userInterventionMoods
  //         ON mood_interventions.subSubMoodId = userInterventionMoods.subSubMoodId
  //       JOIN userInterventions
  //         ON userInterventionMoods.userInterventionId = userInterventions.userInterventionId
  //       WHERE userInterventions.userId = ? AND mood_interventions.subSubMoodId = ?
  //       `,
  //         [userId, subSubMoodId],
  //         (err, rows, fields) => {
  //           if (err) {
  //             console.log(err);
  //             res.status(500).send("Error occurred while fetching interventions");
  //             return;
  //           }
  
  //           // Send a response with the intervention options

  //           console.log(rows)
  //           res.json({
  //             message: "Complete",
  //             interventions: rows,
  //           });
  //         }
  //       );
      }


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