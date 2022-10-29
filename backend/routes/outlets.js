const { application } = require('express');
const express = require('express');
const outlets = require('../controllers/outlets.js');
const router = express.Router();

router.use(express.json());

router.get("/", outlets.getOutlets);
router.put("/available", outlets.makeAvailable)
router.put("/unavailable", outlets.makeUnavailable)

module.exports = router;