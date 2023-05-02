import asyncHandler from "express-async-handler";
import expertCollection from "../../model/expertModel";
import bookingCollection from "../../model/bookingModel";
import { crudHelper } from "../../helper/crudHelper";
import { serviceHelper } from "../../helper/service/serviceHelper";

export const fetchExpertsbyService = asyncHandler(async (req, res) => {

  const results = await Promise.allSettled([
    crudHelper.fetchItems(expertCollection, { service: req.params.id,isBlocked:false }),
    crudHelper.fetchItems(bookingCollection, { service: req.params.name }),
  ]);

  const experts = results[0].status === "fulfilled" ? results[0].value : null;
  const works = results[1].status === "fulfilled" ? results[1].value : null;
  res.json({
    success: true,
    experts: experts?.length ||0,
    works: works?.length ||0,
  });
});

export const fetchTrendingService= asyncHandler (async(req,res)=>{
  
  const result = await serviceHelper.trendingservice()

  res.json({
    success:true,
    trending:result
  })
  
})

