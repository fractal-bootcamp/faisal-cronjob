import Mailjet from 'node-mailjet';
import * as dotenv from 'dotenv';

dotenv.config();

// Initialize Mailjet client with API credentials
const mailjet = new Mailjet({
    apiKey: process.env.MAILJET_API_KEY || '',
    apiSecret: process.env.MAILJET_API_SECRET || '',
});

/**
  Interface for email parameters used with Mailjet
 **/
interface EmailParams {
    toEmail: string; // Recipient email address
    subject: string; // Email subject line
    textContent: string; // Plain text email content
    htmlContent?: string; // HTML formatted email content
}
const sendEmail = async (params: EmailParams) => {
    try {
        // Construct the email data
        const data = {
            Messages: [
                {
                    From: {
                        Email: process.env.MAILJET_SENDER_EMAIL,
                        Name: process.env.MAILJET_SENDER_NAME
                    },
                    To: [
                        {
                            Email: params.toEmail
                        }
                    ],
                    Subject: params.subject,
                    TextPart: params.textContent,
                    HTMLPart: params.htmlContent
                }
            ]
        };

        // Send the email
        const result = await mailjet.post('send', { version: 'v3.1' }).request(data);
        console.log('Email sent successfully:');
        return result;

    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

// Calculate days between today and Dec 21st 2024
const targetDate = new Date('2024-12-21');
const today = new Date();
const diffTime = targetDate.getTime() - today.getTime();
const daysLeft = `${Math.ceil(diffTime / (1000 * 60 * 60 * 24))}`;
const daysLeftPlural = daysLeft === '1 day left' ? 'Day' : 'Days';
console.log(daysLeft);

sendEmail({
    toEmail: 'faisal@owimer.co',
    subject: `Fractal Bootcamp – ${daysLeft} ${daysLeftPlural} Left!`,
    textContent: `Faisal, you have ${daysLeft} ${daysLeftPlural} left to be a Fullstack Engineer. Keep ripping code!`,
})
