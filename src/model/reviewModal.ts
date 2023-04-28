import { Types,Schema,model } from "mongoose";
import { IReview } from "../interface/interface";

const reviewSchema=new Schema<IReview>({

    user:{
        type:Types.ObjectId,
        required:[true,'user is required'],
        ref:'user'
    },
    service:{
        type:Types.ObjectId,
        required:[true,'service is required'],
        ref:'service'
    },
    booking:{
        type:Types.ObjectId,
        required:[true,'booking is required']
    },
    date:{
        type:Date,
        default:Date.now()
    },
    review:{
        type:String,
        required:[true,'review is required']

    },
    rating:{
        type:Number,
        required:[true,'rating is required']
    }
    
})

export default model<IReview>('review',reviewSchema)