# HRadvocate Mobile App Prototype
This code base will server as a prototype for the HRadvocate mobile apps

## Installation and Setup
 * Clone the repo
   `git clone https://github.com/<User>/HRadvocate_mobile.git`
 * Install Expo

### Installing Expo
  * [Expo XDE Installation Guide](https://docs.expo.io/versions/latest/introduction/installation.html)
#### Downloads:
  * [XDE for Windows](https://xde-updates.exponentjs.com/download/win32)
  * [XDE for macOS](https://xde-updates.exponentjs.com/download/mac)
  * [XDE for Linux](https://xde-updates.exponentjs.com/download/mac)

#### Create an Expo Account
  * [Create Account Page](https://expo.io/signup)

#### Install Expo App
  * Search Expo in the Play/App Store
  * Install app and log in with your credentials

#### Windows Setup
  1. Install Node.js ([download](https://nodejs.org/dist/v9.6.1/node-v9.6.1-x64.msi))
  2. Change to your HRadvocate directory
    `cd <C:\PATH\TO\DIRECTORY\HRadvocate_mobile\`
  3. create *package.json* file with npm
    `npm install`

#### Start Expo Server
  1. Open XDE and log into the account you created earlier
  2. click *Open Project*
  3. find `HRadvocate_mobile` directory and click open
  4. start the project
  5. Open the Expo app on your phone, and click on your computers name and the app should open
  6. use credentials listed below in the Demo section to access the app


## Demo Credentials
  * Company Code: `abc`
  * Username/Email: `bob@abc.com`
  * Password: `secret`

## Documentation
![Documentation](https://s.dou.ua/storage-files/image2-700.jpg)

  * I would like to reiterate that this was a project done be a group of college students with no experience over two quarters while taking other classes, so I'm sorry that:
    * the architecture was not very well thought out
    * there are a ton of inline styles
    * the programming styles vary widely
    * most of the functions and components are heavily coupled to the demo data
    * there are no tests, I couldn't even get snapshots working
    * much of the code is soaking W.E.T

### Schema
  * The scheme for the data in the app, can be found in `./companySelector/companies.json`
  * All the test data in the app is loaded in from there

### Main Components
#### App.js
Where the store is wrapped around main

#### Main.js
  * This was my first attempt at navigation without actually using a navigation library
  * This component can go to one of three places
    * Company Selector Page `./companySelector/index.js`
    * Login Page `./login/index.js`
    * Navigation(Homepage) `./navigation/index.js`

### Screens
#### Company Selector
  * `./companySelector/index.js`
  * Handles reading all the data in from `./companySelector/companies.json`
  * Allows the user to set the company

#### Login
  * `./login/index.js`
  * BUG: There is a bug with the remember me check box, it doesn't remember that it is checked

#### Navigation
  * `./navigation/index.js`
  * This isn't actually a page, but it does define what each screen is called
  * We ended up using [React Navigation](https://reactnavigation.org/) for all of the navigation after the login page

#### Dashboard
  * `./homePage/index.js`
  * This is the main screen that you land on when you open the app
  * a lot of the code for the calendar is copy pasted from the calendar page, and should probably be pulled out into it's own component

#### Calendar
  * `./calendar/index.js`
  * most of the code and functions on this pages, is just for parsing the schedule, shifts and events lists.
  * a lot of work went into converting standard time into JS datetime objects

#### Notifications
  * `./notifications/index.js`
  * simply lists the notifications and calls the navigator to change to the page the notification links to
  * make sure that "link" element in notifications matches the actual names of the pages linked to

#### Profile
  * `./profile/index.js`
  * One giant form used for updating employee info 
  * BUG: Address auto complete doesn't work on android

#### Clock In/Out
  * `./clockInOut/index.js`
  * Allows the user to clock in and out
  * lots of logic for controlling when the user can log in and out
  * added some demo features when the countdown timer is touched
    * short press puts 10s on the clock
    * long press takes the company's time window and adds 5 seconds this allows you to demo the clockin button being enabled

#### Time Card
  * `./timeCard/index.js`
  * keeps a record of clock ins and outs

#### Time Off
  * `./timeOffRequests/index.js`
  * allows user to see the time off requests and hours available 

#### Request Page
  * `./RequestPage/index.js`
  * form for creating new time off requests

#### Downloads
  * `./docpage/index.js`
  * Just a bunch of links to fake PDFs there should probably be a system to dynamically grab links and display them

#### Common Components
  * Button: `./button/index.js`
    * Generic button that looks the same on all devices
  * Header Bar: `./headerBar/index.js`
    * Header bar that contains the company name, nav menu, calendar link and notifications icon
    * Must be placed on every new page
  * Section Header: `./sectionHeader/index.js`
    * The black bar above each section on all the main pages
    * take only one parameter *top*
      * boolean
      * if true, it removes the top padding from the section, which makes it not look weird when it's the first thing on the page
  * Toast Box: `./toastBox/index.js`
    * Not actually a toast, more of a information/error notification box that is used to give information to the user
    * Used heavily on the Company Selector and the Login Page
  * Common Components: `./commonComponents`
    * After with is where all the above components should go, I just didn't have time to move them all there and fix the imports in every file, and I was too afraid I would break something
