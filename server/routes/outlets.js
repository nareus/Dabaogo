const { application } = require('express');
const express = require('express');
const outlets = require('../controllers/outlets.js');
const router = express.Router();

router.use(express.json());

router.get("/", outlets.getOutlets);

module.exports = router;