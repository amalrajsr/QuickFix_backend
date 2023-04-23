import { IReview } from "interface/interface"
import reviewCollection from "../../model/reviewModal"
import { deleteReview } from "controller/userController/reviewController"


export const reviewHelper= {

    async fetchReviews():Promise<IReview[]>{
        try{
        const result=await reviewCollection.find().populate('user','name -_id').populate('service','service -_id')

        return result
        }catch(error){
            throw new Error()
        }
    },

    async deleteReview(reviewId:string):Promise<boolean>{
        try{
            let status:boolean
            const result = await reviewCollection.deleteOne({_id:reviewId})
            console.log(result)

            result.deletedCount > 0 ? (status = true) : (status = false);
            return status;

        }catch(error){
            throw new Error()
        }
    }
}