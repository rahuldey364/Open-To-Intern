const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      uppercase:true,
      required: [true, "college name is required"],
      trim: true,
    },
    fullName: {
      type: String,
      required: [true, "college first name is required"],
      trim: true,
    },
    logolink: {
      type: String,
      required: [true, "logo is required"],
      trim: true,
      validate:{
        validator:function(v){
          return /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(v);
        }
      },
      default:
        "https://functionup.s3.ap-south-1.amazonaws.com/colleges/iith.png"
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("college", collegeSchema);
