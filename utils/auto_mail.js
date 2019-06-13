const nodemailer = require('nodemailer');

const URL = [];
const PATH = [];
const USER = 'tangkiemthusinh@gmail.com';
const PASS = 'ufvzyqzwayeopcyg';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: USER,
      pass: PASS
    }
});

function sendMail(receiver, subject, content){
	console.log(receiver);
    let mailOptions = {
        from: USER,
        to: receiver,
        subject: subject,
        text: content
    };  

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }    
    });
};

module.exports = {
	transporter : transporter,
    sendMail : sendMail,
}

