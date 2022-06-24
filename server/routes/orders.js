const { application } = require('express');
const express = require('express');
const orders = require('../controllers/orders.js');
const router = express.Router();

router.use(express.json());

router.get("/", orders.getOrder);
router.post("/", orders.createOrder);
// router.put("/", orders.updateOrder);

module.exports = router;