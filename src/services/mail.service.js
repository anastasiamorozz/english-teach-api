const nodemailer = require('nodemailer')
require('dotenv').config()

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMPT_USER, 
                pass: process.env.SMPT_PASSWORD  
            }
        });
    }

    async sendActivationMail(to, link){
        await this.transporter.sendMail({
            from: process.env.SMPT_USER,
            to,
            subject: '"English Teach" account activation',
            text: '',
            html: `
                <div>
                    <h1>Follow the link to activate your account</h1>
                    <p><a href="${link}">${link}</a></p>
                </div>
            `
        })
    }
}

module.exports = new MailService()