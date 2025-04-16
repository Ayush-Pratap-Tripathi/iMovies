const Admin = require("../models/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.adminRegister = async (req, res, next) => {
  try {
    const { name: username, password, email } = req.body;

    //check that is there a same username exits
    const usernameCheck = await Admin.findOne({ username });
    if (usernameCheck) {
      return res.json({ msg: "Username already used", status: false });
    }

    //check that is there a same email exists
    const emailCheck = await Admin.findOne({ email });
    if (emailCheck) {
      return res.json({ msg: "Email already used", status: false });
    }

    //create hashed pass
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const admin = await Admin.create({
      email,
      username,
      password: hashedPassword,
    });

    const adminDetails = {
      name: admin.username,
      email,
    };

    const secretKey = "SSC";
    const payload = {
      adminDetails,
    };
    const jwtToken = await jwt.sign(payload, secretKey);

    return res.json({ status: true, jwtToken, adminDetails });
  } catch (error) {
    return res.json({ msg: "Server issue :(", status: false });
  }
};

module.exports.adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //authentication for admin
    const admin = await Admin.findOne({ email });
    if (!admin)
      return res.json({ msg: "Email is not registered!", status: false });

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Password :(", status: false });

    const adminDetails = {
      name: admin.username,
      email,
    };

    const secretKey = "SSC";
    const payload = {
      adminDetails,
    };
    const jwtToken = await jwt.sign(payload, secretKey);

    return res.json({ status: true, jwtToken, adminDetails });
  } catch (error) {
    return res.json({ msg: "Server issue :(", status: false });
  }
};
