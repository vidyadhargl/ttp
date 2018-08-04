var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vid.lonarmath@gmail.com',
    pass: 'aishwarya9'
  }
});

module.exports = {
	sendEmail(interestId){
		var reco_link = "http://172.22.184.95:4200/traveller-home/"+interestId
		var mailOptions = {
		  from: 'vid.lonarmath@gmail.com',
		  to: 'vid.lonarmath@gmail.com',
		  subject: 'Congratulations! You got recommendations.',
		  html: '<h3>You have received recommendations for your travel interest.</h3><p>Please <a href="'+reco_link+'">Click here</a> to see recommendations.'
		}; 

		transporter.sendMail(mailOptions, function(error, info){
		  if (error) {
		    console.log(error);
		  } else {
		    console.log('Email sent: ' + info.response);
		  }
		});
	}
}

//usage
//var mailsender = require('./utils/emailsender.js')
//mailsender.sendEmail('URL_FOR_RECOS')