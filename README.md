# Founderland Communit

## 👾 Technologies Used

![JavaScript](https://img.shields.io/badge/-JavaScript-black?style=flat-square&logo=javascript)![Nodejs](https://img.shields.io/badge/-Nodejs-black?style=flat-square&logo=Node.js)![React](https://img.shields.io/badge/-React-black?style=flat-square&logo=react)![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)![CSS3](https://img.shields.io/badge/-CSS3-1572B6?style=flat-square&logo=css3)![Heroku](https://img.shields.io/badge/-Heroku-430098?style=flat-square&logo=heroku)![TailWindcss](https://img.shields.io/badge/-Tailwindcss-38B2AC?style=flat-square&logo=tailwindcss&logoColor=white)![Git](https://img.shields.io/badge/-Git-black?style=flat-square&logo=git)![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat-square&logo=github)

## 🧑‍💻 Installation

### APIs

You need accounts with the following services:

- Open Weather:

  https://api.openweathermap.org/

- Google Maps:

  https://developers.google.com/maps/

- Countries And Cities:

  https://api.countrystatecity.in

- Cloudinary

  https://cloudinary.com

- MongoDB Provider

  ex.: https://www.mongodb.com/cloud/atlas/

### Code

1. Clone the repo

   ```sh
   git clone git@github.com:Founderland/community.git
   ```

2. Install all packages

   ```sh
   yarn run deploy
   ```

3. Set all environmental variables

   1. Server

      ​ DB_USER={MongoDB database user}

      ​ DB_PASSWORD={MongoDB database password}

      ​ DB_NAME={MongoDB database name}

      ​ JWT_SECRET={String}

      ​ JWT_EXPIRE={login expiration - ex. 10d}

      ​ EMAIL_USER={email}

      ​ EMAIL_PASS={password}

      ​ HOST=http://localhost:3000 or hosting domain

      ​ CLOUDINARY_NAME={Cloudinary username}

      ​ CLOUDINARY_API_KEY={Cloudinary API Key}

      ​ CLOUDINARY_API_SECRET={Cloudinary API Secret}

   2. Client

      ​ REACT_APP_GOOGLE_MAPS_API_KEY={Google Maps API Key}

      ​ REACT_APP_COUNTRIES={Countries and Cities API Key}

      ​ REACT_APP_OPEN_WEATHER={Open Weather API Key}

## Starting the App

- Start the server in development

  ```sh
  yarn run dev
  ```

- Start the server in production

  ```sh
  yarn run heroku-postbuild
  yarn run server
  ```

## 🛠 Functionality

- Customizable forms for member sign up and approval
- Admin section for Members and Content management
- Community App with Directory, Resources and Events planning

## Admin Panel

- Settings

- - Profile

  - Users

  - - Add
    - Lock
    - Verify

- Forms

- - Edit question
  - Form order
  - Preview

- Applications

- - View
  - Comment
  - Approve
  - Reject

- Members

- - Add
  - View profile
  - Notify by Email
  - Lock Access

- Events

- - Add
  - Cancel
  - Delete

- Ressources

- - Categories

  - - Add
    - Delete

  - Resource

  - - Add
    - Edit
    - Delete

- Dashboard

- - Latest applicants
  - Widgets

## Community

- Directory
  - Search by Location
  - Search by Name
  - User Profile
- Resources
  - View Articles
  - View Pictures and Videos
  - View Google Slides
- Events
  - View Schedules Events
  - Plan and Host events

## 🧑‍💻 Developed by

- Salvatore Patti
  [![Linkedin Badge](https://img.shields.io/badge/-salvatorepatti-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/pattisalvatore/)](https://www.linkedin.com/in/pattisalvatore/) [![Github Badge](https://img.shields.io/badge/-sal9110-181717?style=flat-square&logo=Github&logoColor=white&link=https://github.com/sal9110)](https://github.com/sal9110)

- Sasmitha Nagesh
  [![Linkedin Badge](https://img.shields.io/badge/-sasmithanagesh-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/sasmitha-nagesh-9818336b/)](https://www.linkedin.com/in/sasmitha-nagesh-9818336b/) [![Github Badge](https://img.shields.io/badge/-Sashmu-181717?style=flat-square&logo=Github&logoColor=white&link=https://github.com/Sashmu)](https://github.com/Sashmu)

- Victor Isidoro
  [![Linkedin Badge](https://img.shields.io/badge/-victorisidoro-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/victorisidoro/)](https://www.linkedin.com/in/victorisidoro/)[![Github Badge](https://img.shields.io/badge/-vtr84-181717?style=flat-square&logo=Github&logoColor=white&link=https://www.github.com/vtr84/)](https://www.github.com/vtr84/)

Final project for [Wild Code School](http://wildcodeschool.com)
