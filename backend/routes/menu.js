const { application } = require('express');
const express = require('express');
const menu = require('../controllers/menu.js');
const router = express.Router();

router.use(express.json());

router.get("/", menu.getMenu);

module.exports = router;