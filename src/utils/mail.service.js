const nodeMailer = require('nodemailer');

const sendMail = async (email, subject, text) => {
    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: subject,
        text: text
    };

    try {
        await transporter.sendMail(mailOptions);
        return { message: 'Email sent' };
    } catch (error) {
        return { error: 'Email failed to send' };
    }
}

module.exports = { sendMail };