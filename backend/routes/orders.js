const { application } = require('express');
const express = require('express');
const orders = require('../controllers/orders.js');
const router = express.Router();

router.use(express.json());

router.get("/", orders.getOrder);
router.post("/", orders.createOrder);
router.put("/", orders.updateOrder);
router.put("/cancel", orders.cancelOrder);
router.put("/confirm", orders.confirmOrder);


module.exports = router;