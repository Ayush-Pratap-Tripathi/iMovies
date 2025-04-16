const router = require("express").Router();
const {
  addTheatre,
  getTheatre,
  getTheatres,
  editTheatre,
  getTheatreById,
} = require("../controllers/theatreController");
const fetchUser = require("../middlewares/fetchUser");

router.post("/addtheatre", fetchUser, addTheatre);
router.get("/gettheatre/:theatreName", getTheatre);
router.get("/gettheatres", getTheatres);
router.put("/edittheatre/:theatreId", fetchUser, editTheatre);
router.get("/gettheatrebyid/:theatreId", getTheatreById);

module.exports = router;
