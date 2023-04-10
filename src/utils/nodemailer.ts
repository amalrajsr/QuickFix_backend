import nodemailer from 'nodemailer';

 const MAIL_SETTINGS= {
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS
      
    },
    
  }
 export const transporter = nodemailer.createTransport(MAIL_SETTINGS);
