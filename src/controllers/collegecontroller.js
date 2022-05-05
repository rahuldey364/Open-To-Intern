const collegeModel = require("../models/collegeModel");

//===============POST/College====================
const createCollege = async function (req, res) {
  try {
    data = req.body;
    if (Object.keys(data).length != 0) {
      if (!data.name) {
        return res
          .status(400)
          .send({
            status: false,
            data: "College name is required for create a college doc",
          });
      }
      if(!/^([a-zA-Z]+)$/.test(data.name)){
        return res.status(400).send({status:false, massege:"plz enter valid name" })
      }
      let isValidName = await collegeModel.findOne({name:data.name})
      if(isValidName){
        return res.status(400).send({status:false,message:"Already one college registered with this same name"})
      }
      if (!data.fullName) {
        return res
          .status(400)
          .send({
            status: false,
            data: "college fullname is required for creating a college doc ",
          });
      }
      let isValidFullName = await collegeModel.findOne({fullName:data.fullName})
      if(isValidFullName){
        return res.status(400).send({status:false,message:"Already one college registered with this same fullname"})
      }


      /////======== logolink validation=======/////


      // if(!data.logolink){
      //     return res.status(400).send({status:false,data:"logolink is required for creating a college doc"})
      // }
    
      // if (!/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(data.email)) { 
      //   return res
      //     .status(400)
      //     .send({ status: false, data: "plz enter a valid logolink" });
      // }

            /////======== logolink validation=======/////

      let collegeCreated = await collegeModel.create(data);
      res.status(200).send({ status: true, data: collegeCreated });
    } else {
      return res
        .status(400)
        .send({ msg: "Please enter details for register a college" });
    }
  } catch (err) {
    res.status(500).send({ status: false, err: err.message });
  }
};

module.exports.createCollege = createCollege;
