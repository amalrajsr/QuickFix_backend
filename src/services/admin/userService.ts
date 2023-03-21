import userCollection from '../../model/userModel'
export const userServices={

    fetchAllUser:async(page:string|number):Promise<null|object>=>{

        const limit=+page*10
        const skip=(+page-1)*10
        const users= await userCollection.find().sort({_id:-1}).skip(skip).limit(limit)
        return users
    },
    block_unblockUser:async(_id:string):Promise<boolean>=>{
          
        let status=true
        const currentStatus= await userCollection.findOne({_id})
        if(currentStatus){

         const blockStatus= await userCollection.updateOne({_id},{$set:{isBlocked:!currentStatus.isBlocked}})
        
         blockStatus.modifiedCount?status=true:status=false;         

        }else{
            
            status=false
        }

        return status

    }
}
