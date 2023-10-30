const nodemailer = require("nodemailer");
const ejs = require("ejs");

const transport = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_SYSTEM,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = (req, res) => {
  const { receiver, subject, url } = req.body;
  try {
    ejs.renderFile(
      __dirname + "/templates/welcome.ejs",
      { receiver, url },
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          var mailOptions = {
            from: process.env.EMAIL_SYSTEM,
            to: receiver,
            subject: subject,
            html: data,
          };

          transport.sendMail(mailOptions, (error, info) => {
            if (error) {
              return console.log(error);
            }
          });
          res.json({
            success: true,
            message: "Comment created successfully",
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  sendEmail,
};
