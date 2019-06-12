const nodemailer = require('nodemailer');

const URL = [];
const PATH = [];
const USER = 'tangkiemthusinh@gmail.com';
const PASS = 'ufvzyqzwayeopcyg';

URL[0] = 'https://endpointa.eyeq.tech';
URL[1] = 'https://endpointf.eyeq.tech';
URL[2] = 'https://endpoints.eyeq.tech';

PATH[0] = '/recognize';
PATH[1] = '/register';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: USER,
      pass: PASS
    }
});

function sendMail(sender, receiver, subject, content){
    let mailOptions = {
        from: sender,
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
    sendMail : sendMail,
}

