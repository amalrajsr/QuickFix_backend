import { IService } from "../../interface/interface";
import serviceCollection from "../../model/serviceModel";

export const serviceHelper = {
  async updateBookingCount(service: string):Promise<boolean> {
    try {
      let status: boolean;
      const updateStatus = await serviceCollection.updateOne(
        { service },
        { $inc: { bookings: 1 } }
      );
      updateStatus.modifiedCount ? (status = true) : (status = false);
      return status;
    } catch (error) {
      throw new Error();
    }
  },

  async trendingservice():Promise<IService[]|null>{

    try{
        const result = await serviceCollection.find({isDeleted:false}).sort({bookings:-1}).limit(3)
        return result
    }catch(error){
       throw new Error()
    }
    
  }
};
