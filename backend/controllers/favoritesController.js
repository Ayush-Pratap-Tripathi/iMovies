const Favorite = require("../models/favoriteModel");
const Movie = require("../models/movieModel");

module.exports.saveMovie = async (req, res) => {
  try {
    const { movieId } = req.body;
    const { email } = req.user.userDetails;
    const find = await Favorite.findOne({ movieId, userEmail: email });
    if (find) {
      return res.json({ status: false, msg: "Movie is already saved!" });
    }
    await Favorite.create({
      movieId,
      userEmail: email,
    });
    return res.json({ status: true, msg: "Movie saved successfully :)" });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, msg: "Server issue :(" });
  }
};

module.exports.unsaveMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { email } = req.user.userDetails;

    await Favorite.deleteOne({
      movieId,
      userEmail: email,
    });
    return res.json({ status: true, msg: "Movie unsaved successfully :)" });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, msg: "Server issue :(" });
  }
};

module.exports.getSavedMovies = async (req, res) => {
  try {
    const { email } = req.user.userDetails;
    const favMovies = await Favorite.find({ userEmail: email });
    const favoriteMoviesData = await Promise.all(
      favMovies.map(async (fav) => {
        const movieId = fav.movieId;
        const movie = await Movie.findOne({ movieId });
        if (movie) return movie;
      })
    );

    return res.json({ status: true, favoriteMoviesData });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, msg: "Server issue :(" });
  }
};
