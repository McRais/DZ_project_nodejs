import nodemailer from 'nodemailer';

export class EmailService {
    static async RegisterUser(login: string, email: string, password: string): Promise<any> {
        let transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
        })
        const mail = await transport.sendMail({
            /*from: '"Example Team" <team@example.com>', // sender address
            to: "alice@example.com, bob@example.com", // list of receivers
            subject: "Hello", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body*/
        })
    }
}