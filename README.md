# reminder-web-app


## You can install  the dependencies by simply writing npm install in console
## After installing the dependencies start the server by running command npm run dev or npm start

## About Headers
(http://localhost:3000/api/create/reminder) is an endpoint you can use for scheduling reminder.
Format for using the Api using postman : 
    {
    "name" : "your-name",
    "email" : "your-email",
    "description" : "decription about the task",
    "Time" : "time to schedule in format {Hour:Minutes}",
    "Date" : "Day/Month/Year",
    "WeekDay" : "For Sunday(it is 0) Enter Week Day 0-6"
}

(http://localhost:3000/api/update/reminder) is an endpoint you can use for updating the scheduled reminder.
Format for using the Api using postman and only enter the field user want to update : 
    {
    "name" : "your-name",
    "email" : "your-email",
    "description" : "decription about the task",
    "Time" : "time to schedule in format {Hour:Minutes}",
    "Date" : "Day/Month/Year",
    "WeekDay" : "For Sunday(it is 0) Enter Week Day 0-6"
}

(http://localhost:3000/api/delete/reminder) is an endpoint you can use for deleting the scheduled reminder.
Format for using the Api using postman and provide the email for which user want to delete the schedule: 
    {
    "email" : "your-email"
}
