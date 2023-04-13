const pool = require("../sql/connections");

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

module.exports = {
  getTier1Moods,
  getTier2Moods,
  getTier3Moods,
};
