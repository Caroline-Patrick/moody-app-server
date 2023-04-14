const express = require("express");
const router = express.Router();
const interventionsController = require("../controllers/interventionsController");

//list all interventions r/t mood
router.get("/:userId/:subSubMoodId", interventionsController.list);

//show 1 intervention r/t mood
router.get("/:userId/:subSubMoodId/:userInterventionId", interventionsController.show);

module.exports = router;
