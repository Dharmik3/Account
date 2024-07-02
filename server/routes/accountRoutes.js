const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

router.get('/', accountController.getAllAccounts);
router.post('/', accountController.createAccount);
router.delete('/:id', accountController.deleteAccount)
router.patch('/:id', accountController.updateAccount)

module.exports = router;
