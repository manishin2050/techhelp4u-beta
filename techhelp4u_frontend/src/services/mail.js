require("dotenv").config(); 

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user:"9d74e9001@smtp-brevo.com",
    pass: "bskEvt9qHphsWyH",
  },
  connectionTimeout: 30000,
  socketTimeout: 30000,
    tls: {
    rejectUnauthorized: false,
  }
});

async function sendTestMail() {
  const info = await transporter.sendMail({
    from: `"Praashi" <monikatest46@gmail.com>`, 
    to:"monikailasharma@gmail.com",
    subject: "I have Done",
    text:`
    Hello Monika,

    to mai show jau..? hn bilkul so jao agr neend ari to..
    nhi thoda sa padhunga tb soung t ka call aa gyaaa kiska ca,`,
  });

  console.log("✅ Email sent:", info.messageId);
}

sendTestMail().catch(console.error);
