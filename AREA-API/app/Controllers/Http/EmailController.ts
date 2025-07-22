import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import nodemailer from 'nodemailer'

export default class EmailController {
  public async sendEmail({ request, response }: HttpContextContract) {
    try {
      const { email, subject, text } = request.all()
      // console.log('Req:', request);
      console.log('Email to:', email)
      console.log('Subject to:', subject)
      console.log('Text to:', text)

      // Create a transporter using Gmail SMTP
      const transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com',
        port: 465,
        secure: true,
        auth: {
          user: 'info.freelance@leop.me',
          pass: 'Lovemeloveme1313@',
        },
      })

      // Email options
      const mailOptions = {
        from: 'info.freelance@leop.me', // Sender address
        to: email, // Use the received email value as the receiver address
        subject: subject, // Email subject
        text: text, // Email body
      }

      // Send email
      const info = await transporter.sendMail(mailOptions)
      console.log('Email sent: ' + info.response)

      return response.send({ message: 'Email sent successfully' })
    } catch (error) {
      console.error('Error sending email:', error)
      return response.status(500).send({ error: 'Something went wrong while sending the email' })
    }
  }
}
