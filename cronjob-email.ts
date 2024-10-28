import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Gmail SMTP host
    port: 587, // Port for secure SMTP
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASSWORD // Your email password or app-specific password
    }
});

/**
 * Interface for email parameters used with Nodemailer
 */
interface EmailParams {
    toEmail: string; // Recipient email address
    subject: string; // Email subject line
    textContent: string; // Plain text email content
    htmlContent?: string; // HTML formatted email content
}

/**
 * Sends an email using Nodemailer
 */
const sendEmail = async (params: EmailParams) => {
    try {
        // Configure mail options
        const mailOptions = {
            from: `"${process.env.SENDER_NAME}" <${process.env.EMAIL_USER}>`,
            to: params.toEmail,
            subject: params.subject,
            text: params.textContent,
            html: params.htmlContent
        };

        // Send mail with defined transport object
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        return info;

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
const daysLeftPlural = daysLeft === '1' ? 'Day' : 'Days';
console.log(daysLeft);

// Create HTML content with better styling
const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .container {
            background-color: #f8f9fa;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            color: #2c3e50;
            margin-bottom: 20px;
        }
        .countdown {
            font-size: 36px;
            color: #e74c3c;
            text-align: center;
            margin: 20px 0;
            font-weight: bold;
        }
        .message {
            font-size: 18px;
            text-align: center;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            color: #7f8c8d;
            font-size: 14px;
            margin-top: 30px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 Fractal Bootcamp Countdown</h1>
        </div>
        <div class="countdown">
            ${daysLeft} ${daysLeftPlural} Left!
        </div>
        <div class="message">
            <p>Hey Faisal! 👋</p>
            <p>Your journey to becoming a Fullstack Engineer continues!</p>
            <p>Keep pushing forward and building amazing things! 💪</p>
        </div>
        <div class="footer">
            <p>Stay focused, stay motivated! 🎯</p>
        </div>
    </div>
</body>
</html>
`;

sendEmail({
    toEmail: 'faisal@owimer.co',
    subject: `Fractal Bootcamp – ${daysLeft} ${daysLeftPlural} Left!`,
    textContent: `Faisal, you have ${daysLeft} ${daysLeftPlural} left to be a Fullstack Engineer. Keep ripping code!`,
    htmlContent: htmlContent
})
