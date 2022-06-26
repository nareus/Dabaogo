const { application } = require('express');
const express = require('express');
const users = require('../controllers/userInfo.js');
const router = express.Router();

router.use(express.json());

router.get("/", users.getInfo);

module.exports = router;