import AppError from "../utils/error";
import { Model } from "mongoose";
export const crudHelper = {
  addItem: async (
    model: Model<any>,
    data: object,
    filter?: object
  ): Promise<null | any> => {

    if (filter) {
      const itemExists = await model.findOne(filter);

      if (itemExists)  throw new AppError(409, "data alreday exists");
      
    }
    const collection = new model(data);
    const result = await collection.save();
    if (result) {
      return result;
    }

    return false;
  },

  fetchItems: async (collection: Model<any>,filter:any,aggregate?:boolean): Promise<any> => {

    if(!aggregate){
      const data = await collection.find(filter).sort({_id:-1})
      return data;
    }else{
      const data= await collection.aggregate(filter)
      return data
    }
   
  },
  fetchSingleItem: async (
    collection: Model<any>,
    filter: any,
    aggregate?:boolean
  ): Promise<any> => {
    if(!aggregate){
      const data = await collection.findOne(filter);
      return data;
    }else{
      const data= await collection.aggregate(filter)
      return data
    }
   

  },
  
  block_UnBlock_Items: async (
    collection: Model<any>,
    _id: string
  ): Promise<boolean> => {
    let status = true;

    
      const blockStatus = await collection.updateOne(
        { _id },
        [{ $set: { isBlocked: { $not:'$isBlocked' } } }]
      );

      blockStatus.modifiedCount ? status = true : status = false;
    
    return status;
  },
  editItem: async (
    collection: Model<any>,
    _id: string,
    data: object,
    filter?: object
  ): Promise<boolean> => {

  
    if(filter){
      const itemExists = await collection.findOne(filter);

      if (itemExists) {
        throw new AppError(409, "data alreday exists");
      }
    }
   

    let status: boolean;
    const updateStatus = await collection.updateOne({ _id }, { $set: data });
    updateStatus.modifiedCount ? (status = true) : (status = false);
    return status;
  },
};
