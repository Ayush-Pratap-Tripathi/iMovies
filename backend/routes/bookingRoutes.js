const router = require("express").Router();
const fetchUser = require("../middlewares/fetchUser");
const {
  addBooking,
  getBookings,
  cancelBooking,
} = require("../controllers/bookingController");

router.post("/addbooking", fetchUser, addBooking);
router.get("/getbookings", fetchUser, getBookings);
router.put("/cancelbooking/:bookingId", cancelBooking);
module.exports = router;
