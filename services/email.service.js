const nodemailer = require("nodemailer");
const aws = require("@aws-sdk/client-ses");
const { defaultProvider } = require("@aws-sdk/credential-provider-node");
const { PORT } = require('../helpers/env');

const BASE_URL = `http://localhost:${PORT}/api`

const ses = new aws.SES({
  apiVersion: "2010-12-01",
  region: "eu-west-2",
  defaultProvider,
});

const transporter = nodemailer.createTransport({
  SES: { ses, aws },
});

const sendEmail = async (userEmail, code) => {
  const link = `${BASE_URL}/users/verify/${code}`

  try {
    await transporter.sendMail(
    
    {
      from: "ppractik@gmail.com",
      to: userEmail,
      subject: "Confirm your email",
      html: `<h4>Click on this link to confirm registration ${link}</h4>`,
    },
  );
    
  } catch (error) {
    console.log(error)
    throw error
    
  }

  
}

module.exports = {
    sendEmail
}