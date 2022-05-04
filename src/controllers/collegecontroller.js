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
      if (!data.fullName) {
        return res
          .status(400)
          .send({
            status: false,
            data: "college fullname is required for creating a college doc ",
          });
      }
      // if(!data.logolink){
      //     return res.status(400).send({status:false,data:"logolink is required for creating a college doc"})
      // }
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
