import nodemailer from 'nodemailer';
import {usersRepo} from "../repo/users-repository";

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
            from: '"TestingMailService" <process.env.USER>',
            to: email, // list of receivers
            subject: "Hello", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body*/
        })

        const user = await usersRepo.createUser(login, password, email, (new Date).toISOString())
    }
}