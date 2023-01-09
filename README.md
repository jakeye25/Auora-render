# Auora

Auora is a web-application clone inspired by [Quora](https://www.quora.com/), that allows users to ask and answer questions through the platform. It is also a place to social with the people with same interests.

* [Auora](https://auora.herokuapp.com/)

### Please see below links to Project Wiki:

##### [MVP Feature List](https://github.com/jakeye25/Auora/wiki/MVP-Feature-List)
##### [Database Schema and Backend Routes](https://github.com/jakeye25/Auora/wiki/Database-Schema-and-Backend-Routes)
##### [User Story](https://github.com/jakeye25/Auora/wiki/User-Story)
##### [Redux State](https://github.com/jakeye25/Auora/wiki/Redux-State)
##### [Wireframes and Front End Routes](https://github.com/jakeye25/Auora/wiki/Wireframes-and-Front-End-Routes)



### This project is built with:

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![SQLAlchemy](https://img.shields.io/badge/-SQLAlchemy-orange?style=for-the-badge)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)

# Run Locally
  1) Clone this repository
  2) Frontend instruction: cd into react-app directory
     and run command : npm install
  3) Make an .env file under the root directory and copy the content of
     .env.example to the .env file.

  4) Backend instruction: open another terminal at the same time and run the
     following command in order :
     pipenv install -r requirements.txt
     In the following order:
     pipenv shell ; flask db upgrade ; flask seed all; flask run.
  5) With the second terminal, run npm start in the react-app directory.


# Features Direction

Login Page
<img src="./react-app/public/FeatureImages/Login_Page.PNG" />

Home Page
<img src="./react-app/public/FeatureImages/Home_Page.PNG" />


# Future Focus
  1. We would like to work on upvote feature for questions and answers.

  2. We would like to work on search questions, answers and topics feature.

  3. We would like to work on follow user feature.

  4. We would to work on message user feature.
