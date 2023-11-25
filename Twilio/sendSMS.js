// Your AccountSID and Auth Token from console.twilio.com
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

const client = require("twilio")(accountSid, authToken);
const rclone = require("rclone");
const exec = require('child_process').exec;

const options = {
  logLevel: "DEBUG",
  source: "/home/kishorekumar/Dropbox/Manager/Passwords.kdbx",
  destination: "manager:kk-manager/keys",
};

const sentSMSToPhone = (content) => {
  client.messages
    .create({
      body: content,
      to: "",
      from: "",
    })
    .then((message) => console.log(message.sid));
};

// rclone.sync(options, (err, stats) => {
//   if (err) {
//     sentSMSToPhone(err)
//   } else {
//     sentSMSToPhone(stats)
//   }
// });

const command = "ls"

exec(command, (err, stdout, stderr) => {
    console.log(stdout)
if (err) {
    console.log("[ERR]",err)
    sentSMSToPhone(err)
} else {
    sentSMSToPhone(stdout)
}
})
