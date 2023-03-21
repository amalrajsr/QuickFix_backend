import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();


const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
 
export const  sendVerificationToken=(phoneNumber:Number):Promise<boolean>=>{
    return new Promise((resolve)=>{
        client.verify.
            v2.services(process.env.TWILIO_SERVICE_ID as string)
            .verifications
            .create({
                to: `+91${phoneNumber}`,
                channel: "sms" 
            }).then((data) => {
                
                resolve(true)

            }).catch((error) => {
                console.log(error);
                
                resolve(false)

            })
    })
}

export const checkVerificationToken=(otp:string,phoneNumber:number):Promise<boolean>=>{
    return new Promise((resolve)=>{
        client.verify.v2
            .services(process.env.TWILIO_SERVICE_ID as string)
            .verificationChecks
            .create({
                to: `+91${phoneNumber}`,
                code: otp
            }).then((data) => {
                if (data.valid) { 
                    
                    resolve(true);
                } else {
                    resolve(false)
                }
            }).catch(() => {
                resolve(false)
            })
    })
}