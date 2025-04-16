const router = require("express").Router();
const fetchUser = require("../middlewares/fetchUser");
const {
  addMovie,
  getMovies,
  getMovieDetails,
  editMovieDetails,
} = require("../controllers/movieController");
const fetchAdmin = require("../middlewares/fetchAdmin");

router.post("/addmovie", fetchAdmin, addMovie);
router.get("/getmoviedetails/:movieId", getMovieDetails);
router.get("/getmovies", getMovies);
router.put("/editmovie/:movieId", editMovieDetails);

module.exports = router;
