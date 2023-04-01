import AppError from "../utils/error";
import { Model } from "mongoose";
export const crudHelper = {
  addItem: async (
    model: Model<any>,
    data: any,
    filter?: object
  ): Promise<null | any> => {
    
    if (filter) {
      const itemExists = await model.findOne(filter);

      if (itemExists) {
        throw new AppError(409, "data alreday exists");
      }
    }
    const collection = new model(data);
    const result = await collection.save();
    if (result) {
      return result;
    }

    return false;
  },

  fetchItems: async (collection: Model<any>): Promise<[] | any> => {
    const data = await collection.find();
    return data;
  },
  fetchSingleItem: async (
    collection: Model<any>,
    _id: string
  ): Promise<any> => {
    const data = await collection.findById(_id);

    return data;
  },
  block_UnBlock_Items: async (
    collection: Model<any>,
    _id: string
  ): Promise<boolean> => {
    let status = true;

    const currentStatus = await collection.findOne({ _id });
    if (currentStatus) {
      const blockStatus = await collection.updateOne(
        { _id },
        { $set: { isBlocked: !currentStatus.isBlocked } }
      );

      blockStatus.modifiedCount ? (status = true) : (status = false);
    } else {
      status = false;
    }

    return status;
  },
  editItem: async (
    collection: Model<any>,
    _id: string,
    data: any,
    filter: object
  ): Promise<boolean> => {
    const itemExists = await collection.findOne(filter);

    if (itemExists) {
      throw new AppError(409, "data alreday exists");
    }
    let status: boolean;
    const updateStatus = await collection.updateOne({ _id }, { $set: data });

    updateStatus.modifiedCount ? (status = true) : (status = false);
    return status;
  },
};
