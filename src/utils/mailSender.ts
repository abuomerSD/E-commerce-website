import * as nodemailer  from 'nodemailer';
import { config } from 'dotenv'
config({path: '../../.env'});

const myEmail = process.env.EMAIL ;
const appPassword = process.env.APP_PASSWORD ;

/**
 * you need to turn on 2 steps verfication if you are using gmail
 * @param from the sender name
 * @param to the targeted email (You can pass a list of emails)
 * @param subject the mail title
 * @param text the mail body
 * @param html to send html elements on the body
 * 
 */

export async function send(from: {name:string , address: any}, to: string, subject: string, text: string, html: string) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        service: 'gmail',
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: myEmail,
          pass: appPassword,
        },
      });

      const info = await transporter.sendMail({
        from,  // sender address
        to, // list of receivers
        subject, // Subject line
        text, // plain text body
        html, // html body
      });

      // console.log(info);
      
}


// send({
//     name: 'Eltayeb Node',
//     address: myEmail
// },
//     'tayeb1293@yahoo.com',
//     'Test nodeMailer', 'testing',
//     `<button style="background: red;">Click here</button>`)
//     .catch(err => console.log(err.message));