# Parlay Island Teacher Platform 

## Purpose 
The Parlay Island teacher platform allows teachers to manage questions for the game and track student progress. In terms of managing questions, teachers can add, modify, or delete questions. For student progress, teachers can see a student's overall question accuracy, as well as a breakdown of the questions they answered for each unit.

## Setup 

This is a NodeJS app.

### Install Dependencies
1. [Install NodeJS and Npm](https://www.npmjs.com/get-npm)
2. All dependencies listed in `package.json`. 
3. Run `npm install` to install all dependencies.

## Local Development

### Running Locally 
1. Run `node app.js` 
2. Navigate to http://localhost:3000 to see the app running locally

## Running Tests Locally
This app uses **Cypress** as the testing framework. 
1. Run `npm run ci:dev` to open a cypress window and see the tests being run in a browser.
2. Run `npm run ci` to run a headless version of the tests.

## Deployment Configuration
For deployment, the variables defined in `config.js` should be defined in the deployment environment.
