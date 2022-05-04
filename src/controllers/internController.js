const internModel = require("../models/internModel");
const collegeModel = require("../models/collegeModel");

//===============POST/intern====================
const createIntern = async function(req, res) {
    try {
        let data = req.body;
        if (Object.keys(data).length != 0) {
            let collegeId = req.body.collegeId;
            if (!collegeId) return res.send({ msg: "collegeId is required" });
            let validationcollegeId = await collegeModel.findById(collegeId);
            if (!validationcollegeId) return res.send({ msg: "enter valid collegeId" });

            let intern = req.body;
            let interncreated = await internModel.create(intern);
            res.status(201).send({ data: interncreated });
        } else {
            return res.status(400).send({ msg: "Bad request" });
        }
    } catch (err) {
        res.status(500).send({ status: false, err: err.message });
    }
};

module.exports.createIntern = createIntern;