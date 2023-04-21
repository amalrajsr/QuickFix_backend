import asyncHandler from "express-async-handler";
import reviewCollection from "../../model/reviewModal";
import serviceCollection from "../../model/serviceModel";
import { crudHelper } from "../../helper/crudHelper";
import { reviewHelper } from "../../helper/user/reviewHelper";
import exp from "constants";

export const addReview = asyncHandler(async (req, res) => {
  const serviceData = await crudHelper.fetchSingleItem(serviceCollection, {
    service: req.body.service,
  });
  if (!serviceData) throw new Error();
  const review = { ...req.body, service: serviceData._id };
  const result = await crudHelper.addItem(reviewCollection, review);
  if (!result) throw new Error("adding review failed");
 
  res.json({
    success: true,
  });
});

export const fetchSingleReview = asyncHandler(async (req, res) => {
 
  let reviewExist = false;
  const result = await crudHelper.fetchSingleItem(reviewCollection, {
    booking: req.params.id,
  });

  if (result) reviewExist = true

  res.json({
    success: reviewExist,
    result
  });
});

export const updateReview= asyncHandler(async(req,res)=>{

    const result = await crudHelper.editItem(reviewCollection,req.params.id,req.body)
    if(!result) throw new Error('review updation failed')
   
    res.json({
        success:true
    })
})


export const deleteReview= asyncHandler(async(req,res)=>{

    const result = await reviewHelper.deleteReview(req.params.id)

    if(!result) throw new Error('review updation failed')
   
    res.json({
        success:true
    })

})

export const fetchReviewsByService = asyncHandler(async(req,res)=>{

  const result = await reviewHelper.fetchReviewsByService(req.query.serviceId as string)
  res.json({
    success:true,
    reviews:result
  })
})



