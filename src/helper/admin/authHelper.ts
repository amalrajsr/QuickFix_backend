import AppError from "../../utils/error";
import adminCollection from "../../model/adminModel";
export const authHelpers={

    findAdmin:async(name:string,password:string):Promise<null|object|any>=>{
        
        try{


      
        const adminData= await adminCollection.findOne({name,password})
        return adminData
    }catch(error){

        throw new AppError(500,'something went wrong')
    }
    }
}