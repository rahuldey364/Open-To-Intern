const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId
 
const internModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "candidate first name is required"]
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, "candidate email id is required"],
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email",
        }
    },
    mobile: {
        type: Number,
        required: [true, "Candidate mobile number is required"],
        unique: true,
    },
    collegeId:{
        type:ObjectId,
        ref:"college"
    },
    isDeleted:{
        type:Boolean,
        default:false
    }

},{timestamps:true})

internModel.path('mobile').validate(function validateMobile() {
    return (this.phoneNr > 999999999);
});

module.exports = mongoose.model("Intern", internSchema)
