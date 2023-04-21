import { IReview } from "../../interface/interface";
import reviewCollection from "../../model/reviewModal";

export const reviewHelper = {
  async fetchReviewsByService(serviceId: string): Promise<IReview[]> {
    try {
      const result = await reviewCollection
        .find({ service: serviceId }).populate('user','name avatar')
        .sort({ _id: -1 })
        .limit(6)

      return result;
    } catch (error) {
      throw new Error();
    }
  },
  async deleteReview(_id: string): Promise<boolean> {
    try{
    let status: boolean;
    const result = await reviewCollection.deleteOne({ _id });

    result.deletedCount > 0 ? (status = true) : (status = false);
    return status;
    }catch(error){
      throw new Error()
    }
  },
};
