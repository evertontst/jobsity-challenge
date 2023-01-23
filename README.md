## Challenge for Jobsity

I developed the repository for Jobsity.

## Build Setup

## Build 

# With Docker
You have docker installed, you can set it up by running the build.sh script in this repo, this will setup the containers in docker (and run them) and install dependencies
```bash
sh build.sh
```
# Without Docker

You need to set in this terminal

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start
```

## Tests

```bash
yarn run test
```
# Mandatory Features
• Ability to add a new "reminder" (max 30 chars) for a user entered day and time. Also, include a city.
• Display reminders on the calendar view in the correct time order.
• Allow the user to select color when creating a reminder and display it appropriately.
• Ability to edit reminders – including changing text, city, day, time and color.
• Add a weather service call from a free API such as ​Open Weather Map​, and get the
weather forecast (ex. Rain) for the date of the calendar reminder based on the city.
• Unit test the functionality: ​Ability to add a new "reminder" (max 30 chars) for a user entered day and time. Also, include a city.
 
# Bonus (Optional)
•Expand the calendar to support more than the current month.
•Properly handle overflow when multiple reminders appear on the same date.
• Functionality to delete one or ALL the reminders for a specific day

