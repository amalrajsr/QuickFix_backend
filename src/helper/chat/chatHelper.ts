import { IChat } from "../../interface/interface";
import chatCollection from "../../model/chatModel";


export const chatHelper={

   async getConversations(filter:object|{user:string}):Promise<IChat[]|[]>{
     try{
    const result=await chatCollection.find(filter).populate('user','name avatar')
    return result
     }catch(error){
      throw new Error()
     }
   },

    async updateConversation(id:string,data:{message:string,sender:string}):Promise<boolean>{
 
        
      let status: boolean;
        const updateStatus=await chatCollection.updateOne({user:id},{$push:{conversation:data}})
        updateStatus.modifiedCount ? (status = true) : (status = false);
        return status;
    }
}