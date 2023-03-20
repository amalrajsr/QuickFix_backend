
import userCollection from '../../model/userModel'
import {IUser} from '../../model/userModel'
export const authServices={

    findUserByMobile:  async(mobile:number):Promise<IUser|null|any>=>{

       
            const userData=await userCollection.findOne({mobile})
           
           return userData
        

    }
}