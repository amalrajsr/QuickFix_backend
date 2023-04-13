import asyncHandler from "express-async-handler";
import { crudHelper } from "../../helper/crudHelper";
import expertCollection from "../../model/expertModel";
import { transporter } from "../../utils/nodemailer";
import bcrypt from "bcrypt";
export const fetchExperts = asyncHandler(async (req, res) => {
  const result = await crudHelper.fetchItems(expertCollection,[{$lookup:{from:'services',localField:'service',foreignField:'_id', as:'serviceDetails'}}],true);

  res.json({
    sucess: true,
    result,
  });
});


export const addExpert = asyncHandler(async (req, res) => {

  const password= Math.random().toString(36).slice(2)
  const passwordHash = await bcrypt.hash(password, 12);
  const expertData={...req.body,password:passwordHash}
  const result = await crudHelper.addItem(expertCollection, expertData, {
    $or: [{ mobile: req.body.mobile }, { email: req.body.email }],
  });

  if (!result) {
    // res.json({
    //   success: false,
    // });
    throw Error('Failed to add Expert')
  }

  const mailOptions = {
    from: process.env.AUTH_USER,
    to: result.email,
    subject: "Account verification",
    html: ` <h3>Greetings from Quickfix</h3> <h4>Welcome valued worker we are thrilled to have you as a member of our team
            and are committed to supporting you in every way we can
           </h4><h4> you can now login using this credentials </h4> Email: ${result.email} <br>Password:${password} 
           <br> Login here: ${'http://localhost:3000/expert/login'}` ,
  };
  transporter.sendMail(mailOptions);

  res.json({
    success: true,
    result,
  });
});

export const blockExpert = asyncHandler(async (req, res) => {
  const result = await crudHelper.block_UnBlock_Items(
    expertCollection,
    req.params.id
  );
  res.json({
    success: result,
  });
});
