// make function to send email with gmail
import axios, { AxiosResponse } from 'axios'
import { google } from 'googleapis'
import { handleAutomation } from '../Services/AutomationService'
import nodemailer from 'nodemailer'

// Gmail API endpoints
const GMAIL_API_BASE_URL = 'https://www.googleapis.com/gmail/v1'

function makeBody(to, from, subject, message) {
  const str = [
    'Content-Type: text/plain; charset="UTF-8"\n',
    'MIME-Version: 1.0\n',
    'Content-Transfer-Encoding: 7bit\n',
    'to: ',
    to,
    '\n',
    'from: ',
    from,
    '\n',
    'subject: ',
    subject,
    '\n\n',
    message,
  ].join('')

  const encodedMail = Buffer.from(str).toString('base64').replace(/\+/g, '-').replace(/\//g, '_')
  return encodedMail
}

export async function sendEmail(step, accessToken: string) {
  try {
    if (step.details === undefined) {
      console.log('Details is undefined')
      throw new Error('Details is undefined')
    }

    console.log('Getting User response')
    console.log('ACCESS TOKEN', accessToken)
    const userResponse: AxiosResponse = await axios.get(`${GMAIL_API_BASE_URL}/users/me/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    console.log('RESPONSE', userResponse)

    const gmail = google.gmail({ version: 'v1', auth: accessToken })
    console.log('GMAIL', gmail)

    const email = {
      to: step.details.detail1,
      subject: step.details.detail2,
      message: step.details.detail3,
    }

    const raw = makeBody(email.to, email.to, email.subject, email.message)
    console.log('making raw mail')
    const response = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: raw,
      },
    })

    console.log('Email sent:', response.data)
    return 'success'
  } catch (error) {
    console.error('Error sending email:', error)
    throw new Error('Failed to send email')
  }
}

export async function sendEmailSmtp(step): Promise<void> {
  try {
    const email = step.details.detail1
    const subject = step.details.detail2
    const text = step.details.detail3

    // Create a transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 465,
      secure: true,
      auth: {
        user: 'info.freelance@leop.me',
        pass: 'Lovemeloveme1313@',
      },
    });

    // Email options using step.details
    const mailOptions = {
      from: 'info.freelance@leop.me', // Sender address
      to: email, // Use the received email value as the receiver address
      subject: subject, // Email subject
      text: text, // Email body
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}


export default async function handleGmail(automation, accessToken: string) {
  const currentStep = automation.steps[0]
  let isListening: boolean
  isListening = false

  const numberOfSteps = Object.keys(automation.steps).length - 1

  switch (currentStep.action) {
    case 'send_email':
      console.log('GmailSendEmail')

      // const emailResponse = await sendEmail(currentStep, accessToken)
      // console.log('Email Response', emailResponse)

      automation.steps.shift()

      if (numberOfSteps > 0) {
        handleAutomation(automation)
      }
      break
    case 'send_email_smtp':
      console.log('GmailSendEmailSmtp')

      const smtpResponse = await sendEmailSmtp(currentStep)
      console.log('Email Response', smtpResponse)

      automation.steps.shift()

      if (numberOfSteps > 0) {
        handleAutomation(automation)
      }
      break
    default:
      console.log('GmailDefault')
      break
  }
}
