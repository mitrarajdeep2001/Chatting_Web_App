const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const nodemailer = require("nodemailer");

// Create a transporter
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com", // Brevo SMTP server
  port: 587, // Use 587 for TLS or 465 for SSL
  secure: false, // Set to true if using port 465
  auth: {
    user: process.env.BREVO_EMAIL, // Your Brevo email or API key
    pass: process.env.BREVO_SMTP_KEY, // Brevo password or API key
  },
});

exports.sendEmail = async (info) => {
  // Set up email options
  const mailOptions = {
    from: "rajdeepmitra8@gmail.com", // Sender email
    to: info.to, // Recipient email
    subject: info.subject,
    text: info.text || "",
    html: info.html || "",
    attachments: info.attachments || [],
  };
  console.log(mailOptions, "MAIL OPTIONS");

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error occurred: " + error.message);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
