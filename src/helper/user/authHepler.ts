
import userCollection from '../../model/userModel'
import {IUser} from '../../interface/interface'
export const authHelpers={

    findUserByMobile:  async(mobile:number):Promise<IUser|null>=>{

            const userData=await userCollection.findOne({mobile})
           
           return userData
        

    }
}