const internModel = require("../models/internModel");
const collegeModel = require("../models/collegeModel");

//===============POST/intern====================
const createIntern = async function (req, res) {
  try {
    let data = req.body;
    if (Object.keys(data).length != 0) {
      if (!data.name) {
        return res
          .status(400)
          .send({ status: false, message: "candidate name is required" });
      }
      if (!data.email) {
        return res
          .status(400)
          .send({ status: false, message: "candidate email id is required" });
      }
      let isRegisteredEmail = await internModel.find({ email: data.email }); // empty object always return undefined
      if (isRegisteredEmail.length != 0) {
        return res
          .status(400)
          .send({ status: false, message: "email id already registered" });
      }
      if (!data.mobile) {
        return res
          .status(400)
          .send({ status: false, message: "candidate name is required" });
      }
      let isRegisteredMobile = await internModel.find({ mobile: data.mobile });
      if (isRegisteredMobile.length != 0) {
        return res
          .status(400)
          .send({ status: false, msg: "mobile number already registered" });
      }
      if (!data.collegeId) {
        return res
          .status(400)
          .send({ status: false, message: "collegeId is required" });
      }
      let validationcollegeId = await collegeModel.findById(data.collegeId);
      if (!validationcollegeId) {
        return res.status(400).send({
          status: false,
          message: "enter valid collegeId or a new college",
        });
      }
      let interncreated = await internModel.create(data);
      res.status(201).send({ status: true, data: interncreated });
    } else {
      return res
        .status(400)
        .send({ status: false, message: "enter details for create an intern" });
    }
  } catch (err) {
    res.status(500).send({ status: false, data: err.message });
  }
};

//============GET /functionup/collegeDetails===========

module.exports.createIntern = createIntern;
