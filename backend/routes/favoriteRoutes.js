const router = require("express").Router();
const fetchUser = require("../middlewares/fetchUser");
const {
  saveMovie,
  unsaveMovie,
  getSavedMovies,
} = require("../controllers/favoritesController");

router.post("/savemovie", fetchUser, saveMovie);
router.delete("/unsavemovie/:movieId", fetchUser, unsaveMovie);
router.get("/getsavedmovies", fetchUser, getSavedMovies);

module.exports = router;
