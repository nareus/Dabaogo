const { application } = require('express');
const express = require('express');
const user = require('../controllers/userInfo.js');
const router = express.Router();

router.use(express.json());

router.post("/", user.signUp);

module.exports = router;
 