import { rejects } from 'assert'
import { resolve } from 'path'
import userCollection from '../model/userModel'

export const userServices={

    findUserByMobile:  (mobile:number):Promise<any|null>=>{

        return new Promise(async(resolve,reject)=>{
            const userData=await userCollection.findOne({mobile})
           
            resolve(userData)
        }) 

    }
}