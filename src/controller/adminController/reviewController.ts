import { reviewHelper } from "../../helper/admin/reviewHelper";
import asyncHandler from "express-async-handler";

export const fetchReviews = asyncHandler(async (req, res) => {
  const result = await reviewHelper.fetchReviews();

  res.json({
    success: true,
    reviews: result,
  });
});

export const deleteReview = asyncHandler(async (req, res) => {

    console.log(req.params.id)
  const result = await reviewHelper.deleteReview(req.params.id);
  if (!result) throw new Error("review deletion failed");
  res.json({
    success: true,
  });
});
