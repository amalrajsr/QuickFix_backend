import asyncHandler from "express-async-handler";
import { crudHelper } from "../../helper/crudHelper";
import locationCollection from "../../model/locationModel";
export const addLocation = asyncHandler(async (req, res) => {

  const filter={pincode:req.body.pincode}
 
  const result = await crudHelper.addItem(
    locationCollection,
    req.body,
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
  const result = await crudHelper.fetchItems(locationCollection,{});

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

export const editLocation=asyncHandler(async (req,res)=>{

 const filter={place:req.body.place,pincode:req.body.pincode}

   const result= await crudHelper.editItem(locationCollection,req.params.id,req.body,filter)

   res.json({
      success:true,
      updated:result
   })
})


