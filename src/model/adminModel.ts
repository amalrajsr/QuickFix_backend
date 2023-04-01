import {Schema,model} from "mongoose";
import { IAdmin } from "interface/interface";

const adminSchema= new Schema<IAdmin>({

    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

export default model('admin',adminSchema)
