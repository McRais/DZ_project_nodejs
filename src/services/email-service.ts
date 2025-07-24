import nodemailer from 'nodemailer';

export class EmailService {
    static async RegisterUser(login: string, email: string, password: string): Promise<any> {
        let mail = await nodemailer.createTransport({

        })
    }
}