import AppError from "../utils/error";
import { Model } from "mongoose";
export const crudHelper = {
  async addItem<T>(
    model: Model<T>,
    data: object,
    filter?: object
  ): Promise<T | false> {
    try {
      if (filter) {
        const itemExists = await model.findOne(filter);

        if (itemExists) throw new AppError(409, "data alreday exists");
      }
      const collection = new model(data);
      const result = await collection.save();
      if (result) {
        return result;
      }

      return false;
    } catch (error) {
      throw new Error();
    }
  },

  async fetchItems<T>(
    collection: Model<T>,
    filter: any,
    aggregate?: boolean
  ): Promise<T[]> {
    try {
      if (!aggregate) {
        const data = await collection.find(filter).sort({ _id: -1 });
        return data;
      } else {
        const data = await collection.aggregate(filter);
        return data;
      }
    } catch (error) {
      throw new Error();
    }
  },
  async fetchSingleItem<T>(
    collection: Model<T>,
    filter: any,
    aggregate?: boolean
  ): Promise<any> {
    try {
      if (!aggregate) {
        const data = await collection.findOne(filter);

        return data;
      } else {
        const data = await collection.aggregate(filter);
        // if (data.length < 1) return null;
        return data;
      }
    } catch (error) {
      throw new Error();
    }
  },

  async block_UnBlock_Items<T>(
    collection: Model<T>,
    _id: string
  ): Promise<boolean> {
    try {
      let status = true;
      const blockStatus = await collection.updateOne({ _id }, [
        { $set: { isBlocked: { $not: "$isBlocked" } } },
      ]);

      blockStatus.modifiedCount ? (status = true) : (status = false);

      return status;
    } catch (error) {
      throw new Error();
    }
  },

  async editItem<T>(
    collection: Model<T>,
    _id: string,
    data: object,
    filter?: object
  ): Promise<boolean> {
    try {
      if (filter) {
        const itemExists = await collection.findOne(filter);

        if (itemExists) {
          throw new AppError(409, "data alreday exists");
        }
      }

      let status: boolean;
      const updateStatus = await collection.updateOne({ _id }, { $set: data });
      updateStatus.modifiedCount ? (status = true) : (status = false);
      return status;
    } catch (error) {
      throw new Error();
    }
  },

  
};

