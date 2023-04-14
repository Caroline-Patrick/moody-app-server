const express = require("express");
const router = express.Router();
const moodsController = require('../controllers/moodsController');

// Get all tier 1 emotions
router.get('/moods/tier1', moodsController.getTier1Moods);

// Get all tier 2 emotions for a given parent mood id
router.get('/moods/tier2/:parentMoodId', moodsController.getTier2Moods);

// // Get all tier 3 emotions for a given sub mood id
router.get('/moods/tier3/:subMoodId', moodsController.getTier3Moods);

//show 1 mood
router.get('/moods/:userId/:subSubMoodId', moodsController.showTier3Mood);

module.exports = router;