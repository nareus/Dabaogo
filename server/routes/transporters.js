const { application } = require('express');
const express = require('express');
const transporters = require('../controllers/transporters.js');
const router = express.Router();

router.use(express.json());

router.post("/", transporters.createTransporter);
//router.put("/", transporters.updateOrder);
router.delete('/', transporters.deleteTransporter);
router.get('/', transporters.getTransporter);

module.exports = router;