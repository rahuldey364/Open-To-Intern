const collegeModel = require("../models/collegeModel");


//===============POST/College====================
const createCollege = async function(req, res) {
    try {
        data = req.body
        if (Object.keys(data).length != 0) {
            let collegeCreated = await collegeModel.create(data)
            res.status(200).send({ status: true, data: collegeCreated })
        } else {
            return res.status(400).send({ msg: "Bad request" });
        }
    } catch (err) {
        res.status(500).send({ status: false, err: err.message });
    }
};


module.exports.createCollege = createCollege;