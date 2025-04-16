const router = require("express").Router();
const {
  addShow,
  getMovieShows,

  updateShowTickets,
  getShow,
  deleteShow,
  getAdminShows,
} = require("../controllers/showController");
const fetchAdmin = require("../middlewares/fetchAdmin");
const fetchUser = require("../middlewares/fetchUser");

router.post("/addshow", fetchAdmin, addShow);
router.get("/getmovieshows/:movieId", getMovieShows);
router.put("/updateshowtickets/:showId", updateShowTickets);
router.get("/getshow/:showId", getShow);
router.get("/getadminshows", fetchAdmin, getAdminShows);
router.delete("/deleteshow/:movieId/:showId", deleteShow);

module.exports = router;
