import   {Schema, model,Types} from 'mongoose'

export interface IService{
    _id?:Types.ObjectId,
    service:string,
    image:string,
    largeImage:string,
    installationCharge1Hour:number,
    installationChargeLatelyHours:number,
    repairCharge1Hour:number,
    repairChargeLatelyHours:number,
    isDeleted?:boolean
}


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
    }

})


export default model<IService>('service',serviceSchema)