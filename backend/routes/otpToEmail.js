const router = require("express").Router();
const { otpToEmail } = require("../controllers/otpToEmail");

router.post('/email/otp', otpToEmail);

 
module.exports = router;