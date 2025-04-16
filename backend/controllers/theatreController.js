const Theatre = require("../models/theatreModel");

module.exports.addTheatre = async (req, res, next) => {
  try {
    const {
      theatreName,
      location,
      balconySeatPrice,
      middleSeatPrice,
      lowerSeatPrice,
      balconySeats,
      middleSeats,
      lowerSeats,
      theatreId,
    } = req.body;

    //check is theatre is already existed
    const lowerCaseName = theatreName.toLowerCase();
    const findTheatre = await Theatre.findOne({ theatreName: lowerCaseName });

    if (findTheatre) {
      return res.json({
        status: false,
        msg: "Theatre is already Registered",
      });
    }

    const adminEmail = req?.user?.adminDetails?.email;
    await Theatre.create({
      theatreName: lowerCaseName,
      location,
      balconySeatPrice,
      middleSeatPrice,
      lowerSeatPrice,
      balconySeats,
      middleSeats,
      lowerSeats,
      theatreId,
      adminEmail,
      updatedBy: adminEmail,
      updatedDate: new Date(),
    });

    return res.json({ status: true, msg: "Theatre added successfully :)" });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, msg: "Server issue :(" });
  }
};

module.exports.getTheatre = async (req, res, next) => {
  try {
    const { theatreName } = req.params;
    const theatre = await Theatre.findOne({ theatreName });
    return res.json({ status: true, theatre });
  } catch (error) {
    return res.json({ status: false, msg: "Server issue :(" });
  }
};

module.exports.getTheatres = async (req, res, next) => {
  try {
    const theatres = await Theatre.find();
    return res.json({ status: true, theatres });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, msg: "Server issue :(" });
  }
};

module.exports.editTheatre = async (req, res) => {
  try {
    const {
      theatreName,
      location,
      balconySeatPrice,
      middleSeatPrice,
      lowerSeatPrice,
      balconySeats,
      middleSeats,
      lowerSeats,
    } = req.body;

    const { theatreId } = req.params;

    //check if theatre is already existed
    const lowerCaseName = theatreName.toLowerCase();

    const adminEmail = req?.user?.adminDetails?.email;

    await Theatre.updateOne(
      { theatreId },
      {
        theatreName: lowerCaseName,
        location,
        balconySeatPrice,
        middleSeatPrice,
        lowerSeatPrice,
        balconySeats,
        middleSeats,
        lowerSeats,
        theatreId,
        adminEmail,
        updatedBy: adminEmail,
        updatedDate: new Date(),
      }
    );

    return res.json({ status: true, msg: "Theatre edited successfully :)" });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, msg: "Server issue :(" });
  }
};

module.exports.getTheatreById = async (req, res, next) => {
  try {
    const { theatreId } = req.params;
    const theatre = await Theatre.findOne({ theatreId });
    return res.json({ status: true, theatre });
  } catch (error) {
    return res.json({ status: false, msg: "Server issue :(" });
  }
};
