const router = require("express").Router();
//const {encode,decode} = require("../middlewares/crypt")
const { otpToPhone } = require("../controllers/otpToPhone");


router.post('/otp/phone', otpToPhone);

 
module.exports = router;