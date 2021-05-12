const mailer = require("nodemailer");
const User = require("../models/Users");
const nodemailer = require("nodemailer");
const Mailer = require("../Objects/mail");
const cron = require("node-cron");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "amanjotsingh192000@gmail.com",
    pass: "amanjots12#",
  },
});
let services = {};
services.sendMail = function (Obj) {
  return new Promise(async (resolve, reject) => {
    try {
      let mail = await transporter.sendMail(
        {
          to: Obj.email,
          from: Obj.from,
          subject: Obj.subject,
          text: Obj.text,
          html: Obj.html,
        },
        (err, info) => {
          if (err) {
            console.log(err);
            reject({ msg: err, code: "NOT SENT" });
          }
          resolve(info);
        }
      );
    } catch (e) {
      console.log(e);
      reject({ msg: e, code: "NOT SENT" });
    }
  });
};
services.save = function (Obj) {
  return new Promise(async (resolve, reject) => {
    try {
      var name = Obj.name;
      var email = Obj.email;
      var description = Obj.description;
      var Date = Obj.Date;
      var Time = Obj.Time;

      const user = new User({
        name: name,
        email: email,
        description: description,
        Date: Date,
        Time: Time,
      });
      resp = await user.save();
      resolve(resp);
    } catch (e) {
      reject({ msg: e, code: "DATABASE ERROR" });
    }
  });
};

services.Reminder = function(json){
    return new Promise(async (resolve, reject)=>{
        try {
        let db = json.Date.split("/");
        let day = db[0];
        let month = db[1];
        let year = db[2];
        console.log(db)
        let tb = json.Time.split(':');
        let hour = tb[0];
        let mins = tb[1];
        let weekday = json.WeekDay;
        let from = 'amanjotsingh192000@gmail.com';
            subject = 'Reminder for your task';
            text = `Reminder for your task`;
            html = `<div>Hey ${json["name"]}!
            Hope you're Doing well.
            This mail is a reminder, that you've a task, ${json["description"]} scheduled for ${json["Time"]} on ${json["Date"]}

            You can also reschedule your task using this web app </div>`;

        var Obj = new Mailer({email: json["email"] , from : from , subject : subject, text : text, html : html});
        var task = cron.schedule(`${mins} ${hour} ${day} ${month} ${weekday}`,async function(){
         await services.sendMail(Obj)});
        console.log("task scheduled")
        console.log(task )
         resolve(task);
        } catch (error) {
            console.log(error);
            reject(error)
        }
    })
}
module.exports = services;
