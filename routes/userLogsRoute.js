const express =require('express');
const router = express.Router();
const userLogsController = require("../controllers/userLogsController")


router.get('/:userId', userLogsController.list);
router.get('/:userId/:logId', userLogsController.show);
router.post('/', userLogsController.create);
router.put('/:userId/:logId', userLogsController.update);
router.delete('/:userId/:logId', userLogsController.remove);

module.exports = router;