const pool = require("../sql/connections");


//list tier 1 moods
const getTier1Moods = (req, res) => {
  pool.query(`SELECT * FROM moods`, (err, rows, field) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error occurred while fetching moods");
      return;
    }
    res.json(rows);
  });
};

//list tier 2 moods
const getTier2Moods = (req, res) => {
  moodId = req.params.parentMoodId;

  pool.query(
    `SELECT * FROM sub_moods WHERE moodId =?`,
    [moodId],
    (err, rows, fields) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error occurred while fetching moods");
        return;
      }
      res.json(rows);
    }
  );
};

//list tier 3 moods
const getTier3Moods = (req, res) => {
  subMoodId = req.params.subMoodId;

  pool.query(
    `SELECT * FROM sub_sub_moods WHERE subMoodId =?`,
    [subMoodId],
    (err, rows, fields) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error occurred while fetching moods");
        return;
      }
    
      res.json(rows);
    }
  );
};


//show single mood from tier 3
const showTier3Mood = (req, res) => {
  const subSubMoodId = parseInt(req.params.subSubMoodId);
  const userId = parseInt(req.params.userId)
  console.log("req.params from moodController.showTier3Mood: " +req.params.userId)
  console.log(typeof subSubMoodId)


  pool.query(
    `SELECT * FROM sub_sub_moods WHERE subSubMoodId= ?`,
    [subSubMoodId],
    function (err, mood, fields) {
      if (err) {
        console.log(err);
        res.status(500).send("Error occurred while fetching userLog");
        return;
      }
      res.json(mood);

    }
  );
}; 




module.exports = {
  getTier1Moods,
  getTier2Moods,
  getTier3Moods,
  showTier3Mood
};
