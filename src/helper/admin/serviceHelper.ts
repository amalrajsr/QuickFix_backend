import AppError from "../../utils/error";
import serviceCollection, { IService } from "../../model/serviceModel";

export const serviceHelpers = {

    addService: async (data: IService): Promise<boolean> => {

        const serviceExists= await serviceCollection.findOne({service:data.service})

         if(!serviceExists){
        const service = new serviceCollection(data)

        const status = await service.save()

        if (status) {
            return true
        }

        return false
    }else{
        throw new AppError(409,'service already exists')
    }

    },

    fetchServices: async (): Promise<IService[] | {}> => {

        const services = await serviceCollection.find()

        return services
    },

    deleteService: async (id: string): Promise<boolean> => {
     
        
        let status=false
        const currentStatus= await serviceCollection.findById(id)
        if(currentStatus){

         const blockStatus= await serviceCollection.updateOne({_id:id},{$set:{isDeleted:!currentStatus?.isDeleted}})
        
         blockStatus.modifiedCount?status=true:status=false;         

        }else{
            
            
            status=false
        }

        return status
    }
}