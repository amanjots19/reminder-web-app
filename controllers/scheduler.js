const User = require("../models/Users");
const nodemailer = require("nodemailer");
const schedule = require("node-schedule");
const Mailer = require("../Objects/mail");
const services = require("../services/mail");
const cron = require("node-cron");

let controller = {};

controller.create = async (req, res, next) => {
  try {
    console.log(req.body);
    let json = {};
    json["WeekDay"] = req.body.WeekDay;
    json["Date"] = req.body.Date;
    json["name"] = req.body.name;
    json["description"] = req.body.description;
    json["Time"] = req.body.Time;
    json["email"] = req.body.email;
    var newUser = await services.save(json);
    let task = await services.Reminder(json);
    if (!task) {
      res.json({
        msg: "Error in services",
      });
    } else {
      res.json({
        msg:
          "Task Successfully Scheduled , You will recieve an email on the time. ",
      });
    }
  } catch (e) {
    res.json({
      error: e,
    });
  }
};
controller.update = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    let db = user.Date.split("/");
    let day = db[0];
    let month = db[1];
    let year = db[2];
    let tb = user.Time.split(":");
    let hour = tb[0];
    let mins = tb[1];
    var task = cron.schedule(`${mins} ${hour} ${day} ${month} ${req.body.WeekDay}`, function () {
      console.log("Will not execute any more");
    });
    task.stop();

    let json = req.body;
    let newTask = await services.Reminder(json);
    if (!newTask) {
      res.json({
        msg: "Error in services",
      });
    } else {
      res.json({
        msg:
          "Task Successfully Scheduled , You will recieve an email on the time. ",
      });
    }
    const newuser = await User.updateOne({ email: req.body.email }, req.body);

    console.log(user);
  } catch (error) {
    console.log(error);
  }
};
controller.delete = async (req, res, next) => {
  try {
    console.log("here")
    const user = await User.findOne({ email: req.body.email });
    let db = user.Date.split("/");
    let day = db[0];
    let month = db[1];
    let year = db[2];
    let tb = user.Time.split(":");
    let hour = tb[0];
    let mins = tb[1];
    var task = cron.schedule(
      `${mins} ${hour} ${day} ${month} 4`,
      function () {
        console.log("Will not execute any more");
      }
    );
    task.stop();
    const deleteuser = await User.findOneAndRemove({ email: req.body.email });
    if (deleteuser) {
      res.json({
        msg: "Successfully deleted",
      });
    }
  } catch (error) {
      console.log(error);
      res.json({
          error:error
      })
  }
};
module.exports = controller;
