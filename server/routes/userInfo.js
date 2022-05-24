const express = require('express');
const user = require('../controllers/userInfo.js');
const router = express.Router();

router.post("/register", user.signUp);

router.get("/login", user.signIn);

module.exports = router;
 