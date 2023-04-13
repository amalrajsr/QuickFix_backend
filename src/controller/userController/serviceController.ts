import asyncHandler from "express-async-handler";
import AppError from "../../utils/error";
import expertCollection from "../../model/expertModel";
import bookingCollection from "../../model/bookingModel";
import { crudHelper } from "../..//helper/crudHelper";
import { IService, IExpert } from "../../interface/interface";
export const fetchExpertsbyService = asyncHandler(async (req, res) => {
  const results = await Promise.allSettled([
    crudHelper.fetchItems(expertCollection, { service: req.params.id,isBlocked:false }),
    crudHelper.fetchItems(bookingCollection, { service: req.params.name }),
  ]);

  const experts: IService[] | null = results[0].status === "fulfilled" ? results[0].value : null;
  const works: IExpert[] | null = results[1].status === "fulfilled" ? results[1].value : null;

  res.json({
    success: true,
    experts: experts?.length ||0,
    works: works?.length ||0,
  });
});
