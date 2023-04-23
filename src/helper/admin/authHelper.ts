import AppError from "../../utils/error";
import adminCollection from "../../model/adminModel";
import { IAdmin } from "../../interface/interface";
export const authHelpers = {
  findAdmin: async (
    name: string,
    password: string
  ): Promise< IAdmin | null> => {
    try {
      const adminData = await adminCollection.findOne({ name, password });
      return adminData;
    } catch (error) {
      throw new AppError(500, "something went wrong");
    }
  },
};
