import {Schema,model} from "mongoose";

export interface IAdmin{
    name:string,
    password:string
}

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
