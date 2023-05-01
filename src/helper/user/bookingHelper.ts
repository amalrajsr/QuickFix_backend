import { ObjectId } from "bson";
import userColletion from "../../model/userModel";
import expertCollection from "../../model/expertModel";
import { IExpert } from "../../interface/interface";

export const bookingHelper = {
  addBooking: async (userId: string, bookingId: ObjectId): Promise<boolean> => {
    const result = await userColletion.updateOne(
      { _id: userId },
      { $push: { booking: bookingId } }
    );
    let status: boolean;
    result.modifiedCount ? (status = true) : (status = false);
    return status;
  },

  checkExperts: async (service: string, pincode: number):Promise<IExpert[] | []> => {

    try{
    const result = await expertCollection.aggregate([
      {
        $lookup: {
          from: "services",
          localField: "service",
          foreignField: "_id",
          as: "service",
        },
      },
      {
        $lookup: {
          from: "locations",
          localField: "city",
          foreignField: "_id",
          as: "city",
        },
      },
      {
        $match: {
          "service.service": service,
          "city.pincode": pincode,
          isBlocked: false,
        },
      },
      {
        $lookup: {
          from: "bookings",
          localField: "works",
          foreignField: "_id",
          as: "myWorks",
        },
      },
      { $project: { name: 1, myWorks: 1, _id: 0 } },
    ]);

    return result
}catch(error){
    throw new Error('cheking expert failed')
}
  },
};
