import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();

const { TWILIO_SERVICE_ID,TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN}=process.env
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
 
export const  sendVerificationToken=(phoneNumber:Number)=>{
    return new Promise((resolve,reject)=>{
        client.verify.
            v2.services(TWILIO_SERVICE_ID)
            .verifications
            .create({
                to: `+91${phoneNumber}`,
                channel: "sms"
            }).then((data) => {
                
                resolve(true)

            }).catch((error) => {
                console.log(error);
                
                reject(false)

            })
    })
}

export const checkVerificationToken=(otp:string,phoneNumber:number)=>{
    return new Promise((resolve,reject)=>{
        client.verify.v2
            .services(TWILIO_SERVICE_ID)
            .verificationChecks
            .create({
                to: `+91${phoneNumber}`,
                code: otp
            }).then((data) => {
                if (data.valid) { 
                    console.log('if');
                    
                    resolve(true);
                } else {
                    console.log('else')
                    resolve(false)
                }
            }).catch(() => {
                console.log('error');
                
                resolve(false)
            })
    })
}