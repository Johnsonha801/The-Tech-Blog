# the-tech-blog

## Description

By using this application, users can read and manage blog posts that are tech related. This is done by first creating an account to access their own dashboards which contain a list of their previous blog posts. From here, users can create, update, and delete their posts by interacting with the UI. By creating a session using express-session, the server is able to remember which client is actively connected to grant access to a suite of functions that non authenticated users don't have access to. The UI is rendered using the handlebars templating engine.

## Tech Used
  * Javascript
  * NodeJS
  * Express JS
  * Sequelize
  * MySQL (mysql2 npm)
  * DotEnv
  * expres-session
  * handlebars

## Installation

Clone the repo to your local enviroment. You must have Node and MYSQL installed on your system in order for this program to work. Simply navigate in the command line to the root directory of the project and type "npm install" to install all of the projects dependencies. Next, type "npm start" to start the program. From here, users can use the application to manage their blog posts.

## Usage

Users will use this system to perform CRUD operations against the data stored in the database to manage their online blog posts. Users can also leave comments on other posts.

Deployed Application: [The Tech Blog](https://bloodcurdling-dungeon-16014.herokuapp.com/)

## Questions

GitHub profile [Johnsonha801](https://github.com/Johnsonha801)

## Application
![Working Project Screenshot](https://user-images.githubusercontent.com/84554237/139610970-70fa8896-cfb9-4fcf-93a5-aa8e686171d9.png)
