const pool = require("../sql/connections");

const getMoodsByTier = (req, res) => {

    const tier =parseInt(req.params.tier);
    const parentMoodId = req.params.parentMoodId || null;

    let query = "SELECT * FROM moods WHERE tier = ?";
    const queryParams = [tier];

    if (parentMoodId) {
        query += " AND parentMoodId = ?";
        queryParams.push(parentMoodId);
    }

    pool.query(query, queryParams, (err, rows, fields)=> {
        if(err) {
            console.log(err);
            res.status(500).send("Error occurred while fetching moods");
            return;
        }
        res.json(rows);
    })

}

module.exports = {
    getMoodsByTier
}