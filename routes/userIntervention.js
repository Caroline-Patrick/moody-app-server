const express = require("express");
const router = express.Router();
const userInterventionController = require("../controllers/userInterventionsController");

router.get("/:userId", userInterventionController.list);
router.get("/:userId/:userInterventionId", userInterventionController.show);
router.post("/", userInterventionController.create);
router.put("/:userId/:userInterventionId", userInterventionController.update);
// router.delete("/:userId/:userInterventionId", userInterventionController.remove);

module.exports = router;
