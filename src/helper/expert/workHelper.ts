import expertCollection from "../../model/expertModel";


export const workHelper={

    async addWorks(expertID:string,bookingID:string){
        try{
            let status: boolean;
            const data= await expertCollection.updateOne({_id:expertID},{$push:{works:bookingID}})
            data.modifiedCount ? (status = true) : (status = false);
            return status;
        }catch(error){
            throw new Error()
        }
    }
}