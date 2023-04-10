const express = require('express');
const router = express.Router();
const { createMail, getMailById, getAllMail, getMailByName } = require('../controllers/mail.controller');

router.post('/', createMail);
router.get('/:id', getMailById);
router.get('/', getAllMail);
router.get('/user', getMailByName)

module.exports = router;