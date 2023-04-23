import asyncHandler from "express-async-handler";
import { crudHelper } from "../../helper/crudHelper";
import locationCollection from "../../model/locationModel";
import { ILocation } from "../../interface/interface";
export const addLocation = asyncHandler(async (req, res) => {
  const filter = {
    $or: [{ pincode: req.body.pincode }, { place: req.body.place }],
  };

  const result = await crudHelper.addItem<ILocation>(
    locationCollection,
    { ...req.body, place: req.body.place.toUpperCase() },
    filter
  );

  if (!result) {
    throw Error("something went wrong");
  }
  res.json({
    success: true,
  });
});

export const fetchLocations = asyncHandler(async (req, res) => {
  const result = await crudHelper.fetchItems(locationCollection, {});

  res.json({
    success: true,
    locations: result,
  });
});

export const blockLocation = asyncHandler(async (req, res) => {
  const result = await crudHelper.block_UnBlock_Items(
    locationCollection,
    req.params.id
  );

  res.json({
    status: result,
  });
});

export const editLocation = asyncHandler(async (req, res) => {
  const city: string = req.body.place.toUpperCase();
  const filter = { place: city, pincode: req.body.pincode };
  const result = await crudHelper.editItem(
    locationCollection,
    req.params.id,
    { ...req.body, place: city },
    filter
  );

  res.json({
    success: true,
    updated: result,
  });
});
