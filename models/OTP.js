const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const OTPSchema = mongoose.Schema({
    email: {
        type:String,
        required: true,
    },
    otp: {
        type:String,
        required:true
    },
    createdAt: {
        type:Date,
        default:Date.now(),
        expires: 5*60,
    }
});

// a function -> to send emails
async function sendVerificationEmail(email, otp) {
    try {
      const mailResponse =  await mailSender(email, "Verification Email from EdTech Platfrom", otp);

    } catch (error) {
        console.log("Error occured while sending mails", error);
        throw error;
    }

}

// pre middleware
OTPSchema.pre("save", async function(next){
    await sendVerificationEmail(this.email, this.otp);
    next();
});
module.exports = mongoose.model("OTP", OTPSchema);