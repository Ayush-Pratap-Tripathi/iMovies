const router = require("express").Router();
const {
  addReview,
  editReview,
  deleteReview,
  getReviews,
} = require("../controllers/reviewController");
const fetchUser = require("../middlewares/fetchUser");

router.post("/addreview", fetchUser, addReview);
router.put("/editreview", editReview);
router.delete("/deletereview/:reviewId", deleteReview);
router.get("/getreviews/:movieId", getReviews);

module.exports = router;
