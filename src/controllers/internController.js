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
      if (Object.keys(data.name).length == 0 || data.name.length == 0) {
        return res
          .status(400)
          .send({ status: false, data: "Enter a valid name" });
      }
      if (!data.email) {
        return res
          .status(400)
          .send({ status: false, message: "candidate email id is required" });
      }
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)) {
        return res
          .status(400)
          .send({ status: false, data: "plz enter a valid Email" });
      }
      let isRegisteredEmail = await internModel.find({ email: data.email });
      if (isRegisteredEmail.length != 0) {
        return res
          .status(400)
          .send({ status: false, message: "email id already registered" });
      }
      if (!data.mobile) {
        return res
          .status(400)
          .send({ status: false, message: "candidate mobile no is required" });
      }
      if (
        !/^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/.test(
          data.mobile
        )
      ) {
        return res
          .status(400)
          .send({ status: false, data: "plz enter a valid Mobile no" });
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
      if (
        Object.keys(data.collegeId).length == 0 ||
        data.collegeId.length == 0
      ) {
        return res
          .status(400)
          .send({ status: false, data: "Enter a valid college id" });
      }
      let validationcollegeId = await collegeModel.findById(data.collegeId);
      if (!validationcollegeId) {
        return res.status(400).send({
          status: false,
          message: "your college is not registered with us ",
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
    res.status(500).send({ status: false, message: err.message });
  }
};

//============GET /functionup/collegeDetails===========

const getCollegeDetails = async function (req, res) {
  try {
    const collegeName = req.query.collegeName.toUpperCase();
    if (!collegeName) {
      return res.status(400).send({
        status: false,
        message: "enter a college name first",
      });
    }
    const isValidCollege = await collegeModel.findOne({ name: collegeName }); //{ _Id}
    if (!isValidCollege) {
      return res.status(400).send({
        status: false,
        message: "you have entered a invalid college name ",
      });
    }
    const getIntern = await internModel
      .find({ collegeId: isValidCollege._id, isDeleted: false })
      .select({ name: 1, mobile: 1, email: 1, _id: 0 });
    if (getIntern.length == 0) {
      return res.status(404).send({
        status: false,
        message: "no intern found with your provided college details",
      });
    }
    const getAllIntern = {
      name: isValidCollege.name,
      fullName: isValidCollege.fullName,
      logolink: isValidCollege.logolink,
      interests: getIntern,
    };
    res.status(200).send({ status: true, data: getAllIntern });
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};

module.exports.createIntern = createIntern;
module.exports.getCollegeDetails = getCollegeDetails;
