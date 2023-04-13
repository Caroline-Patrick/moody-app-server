const moodsController = require('./controllers/moodsController');

// API endpoint allows parentMoodId to be optional b/c tier 1 won't have it
router.get('/api/moods/tier/:tier/:parentMoodId?', moodsController.getMoodsByTier);
