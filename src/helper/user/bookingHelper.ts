import { ObjectId } from "bson";
import userColletion from "../../model/userModel";

export const bookingHelper={

    addBooking:async (userId:string,bookingId:ObjectId):Promise<boolean>=>{

        const result= await userColletion.updateOne({_id:userId},{$push:{booking:bookingId}})
        let status: boolean;
        result.modifiedCount ? (status = true) : (status = false);
        return status;
    }
}
