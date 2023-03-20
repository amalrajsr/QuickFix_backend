import userCollection from '../../model/userModel'

export const userServices={

    fetchAllUser:async():Promise<null|object>=>{
    
        const users= await userCollection.find()
        return users
    }
}
