const pool = require("../sql/connections");

const getMoodsByTier = (req, res) => {

    const tier =parseInt(req.params.tier);
    const parentMoodId = req.params.parentMoodId || null;

    //create query statement + array for placeholder for tier 1(doesn't have parentMoodId)
    let query = "SELECT * FROM moods WHERE tier = ?";
    const queryParams = [tier];

    //if parentMoodId exists, then add 2nd part to query and add 2nd number to array
    if (parentMoodId) {
        query += " AND parentMoodId = ?";
        queryParams.push(parentMoodId);
    }

    //run the query with the pieces from above
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