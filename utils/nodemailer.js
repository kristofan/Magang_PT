const nodemailer = require('nodemailer');
const {oauth2Client} = require('./oauth2');
const ejs = require('ejs');
const {response} = require('express');

const {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_SENDER_EMAIL
} = process.env;

const GOOGLE_REFRESH_TOKEN = '1//04UFtM_NjGAftCgYIARAAGAQSNwF-L9IrTn0zGD2wCyPyoaEcy3_Dlcn1a7r9TVZ076jugHYlCAfsmW8VX7AjffelbAX7z278VA8'
// set credential
oauth2Client.setCredentials({refresh_token: GOOGLE_REFRESH_TOKEN});

module.exports = {
    sendMail: async (to, subject, html) => {
        const accessToken = await oauth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: GOOGLE_SENDER_EMAIL,
                clientId: GOOGLE_CLIENT_ID,
                clientSecret: GOOGLE_CLIENT_SECRET,
                refreshToken: GOOGLE_REFRESH_TOKEN,
                accessToken: accessToken
            }
        });

        transport.sendMail({to, subject, html});
    },

    getHtml: (fileName, data) => {
        return new Promise((resolve, reject) => {
            const path = `${__dirname}/../views/users/${fileName}`;

            ejs.renderFile(path, data, (err, data) => {
                if (err) {
                    return reject(err);
                }
                return resolve(data);
            });
        });
    }
};