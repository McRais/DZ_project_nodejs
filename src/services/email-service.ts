import nodemailer from 'nodemailer';

export class EmailService {
    static async RegisterUser(login: string, email: string, password: string): Promise<any> {
        let email = await nodemailer.createTransport({

        })
    }
}