var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '<useremail to authorize sending mails>',
    pass: '<password>'
  }
});

module.exports = {
	sendEmail(reco_link){
		var reco_link = "http://www.google.com"
		var mailOptions = {
		  from: 'from_email_address',
		  to: 'to_email_address',
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