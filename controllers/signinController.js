const bcrypt = require('bcrypt');
const pool = require('../sql/connections');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign(user, 'tacos are good');
};

const signin = (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    pool.query(`SELECT * FROM users WHERE email='${email}'`, async (err, results, fields) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'An error occurred during the query.' });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }

        const match = await bcrypt.compare(password, results[0].password);
        console.log(match);

        if (match) {
            const token = generateToken(results[0]);
            res.json({
                token,
                user: results[0],
            });
        } else {
            res.status(401).json({ message: 'Incorrect password.' });
        }
    });
};

module.exports = {
    signin,
};
