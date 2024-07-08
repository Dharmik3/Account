const express = require('express');
const router = express.Router();
const dailyBookController = require('../controllers/dailyBookController');

router.get('/', dailyBookController.getJournalInRange);

module.exports = router;
