# Interview Scheduler

Built to better understand React and its advantages. Uses a Postgres database and different testing packages (Storybook, Jest and Cypress). Click around to try it out! 

The app allows a user to book a schedule and select their interviewer. They can then edit the existing appointment or delete it. Main effort was responsiveness between the front-end and back-end.

!["default-view"](https://github.com/Luke-Berzins/Interview-Scheduler/blob/master/docs/default-view.png?raw=true)
!["new"](https://github.com/Luke-Berzins/Interview-Scheduler/blob/master/docs/form-display.png?raw=true)

## Setup


Install dependencies with `npm install`.
Setup and install https://github.com/Luke-Berzins/scheduler-api to integrate the database, without recieving data the application will not render.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

