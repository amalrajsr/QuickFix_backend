import adminCollection from "../../model/adminModel";

export const authServices={

    findAdmin:async(name:string,password:string):Promise<null|object|any>=>{
        
        const adminData= await adminCollection.findOne({name,password})
        return adminData
    }
}