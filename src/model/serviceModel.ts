import   {Schema, model} from 'mongoose'
import { IService } from '../interface/interface'


const serviceSchema= new Schema<IService>({
    
    service:{
        type:String,
        required:true
    },
    image:{
        type:String,
         required:true
    }, 
     largeImage:{
        type:String,
         required:true
    },
    installationCharge1Hour:{
        type:Number,
        required:true
    },
    installationChargeLatelyHours:{
        type:Number,
        required:true
    },
    repairCharge1Hour:{
        type:Number,
        required:true
    },
    repairChargeLatelyHours:{
        type:Number,
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    bookings:{
        type:Number,
        default:0
    }

})


export default model<IService>('service',serviceSchema)