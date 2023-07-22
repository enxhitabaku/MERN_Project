# MERN PROJECT - Travel Albania

## Description

Travel Albania is a web application developed for Albanian tourists, allowing them to discover and share different
places in Albania. Users can add places with images and descriptions, view each other's places, and easily check the
places on Google Maps with a single button click.

## Installation

To get started with the project, follow these steps:

1. Clone the repository: git clone https://github.com/enxhitabaku/MERN_Project.git\
2. Checkout to the **master** branch
3. Set up the database
    - Get Started with Mongo DB and build a Cluster, check this step-by-step
      guide https://www.javatpoint.com/mongodb-atlas
    - Copy the connection string
    - Open the file _./backend/.env_
    - Replace the value under MONGO_DB_URI with your personal connection string.
4. Install dependencies for both the backend and frontend:
    - On the project root open the terminal and run the command **npm run install**
    - Again on the project root open the terminal and run the command **npm run install-dependencies**
5. Start the development server for both the backend and frontend:
    - On the project root open the terminal and run the command **npm run start-concurrently**

## Usage

- Main Page: View a list of all users with their images, email addresses, and the number of places they have added.
- User Profile: Click on a user to view their place records.

## Technologies Used

The project is built using the MERN (MongoDB, Express, React, Node.js) stack.

## backend

The backend directory contains the server-side code for the application built using NodeJS and MongoDB.

- **controllers**: Contains the logic for handling requests and responses.
- **database**: Manages the connection and interaction with the MongoDB database.
- **middleware**: Holds custom middleware functions to process requests before they reach the routes.
- **models**: Defines the data models and schemas used to interact with the database.
- **routes**: Contains the route definitions and maps them to appropriate controller functions.
- **shared**: Contains shared utility functions and constants used across the backend.
- **uploads**: Stores end user images uploaded to the server.
- **index.js**: The main entry point for the Node application.

## frontend

The frontend directory contains the client-side code for the application built using ReactJS.

- **public**: Contains static assets like HTML, images, and other files that are directly served to the client.
- **src**: Contains the source code for the frontend application.
    - **places**: Holds components and logic related to displaying and managing places in the application.
    - **shared**: Contains shared utility functions, components, and constants used across the frontend.
    - **static**: Stores static assets specific to the frontend, like images.
    - **user**: Contains components and logic related to user-related functionalities.
    - **App.css**: CSS file for styling the root App component.
    - **App.js**: The main component that serves as the entry point for the frontend.
    - **index.js**: The main entry point for the React application.

## Features

1. Sign Up and Log In functionality
    - Sign Up: Create an account by providing your gender, email, and password.
    - Log In: Existing users can log in and authenticate by providing the email and password.
2. Create, Edit, and Delete place records
    - Place Records: Each place is listed with an image, title, and description.
    - Create a New Place: Users can add a new place with details such as title, image, location longitude and latitude.
    - **NOTE**: Image size is restricted to _256KB_, and longitude and latitude must be within the Albanian borders'
      coordinates range _(longitude: 19 to 21, latitude: 39 to 42)_.
3. View other users' place records
    - User Profile: Click on a user to view their place records.
    - Open on Google Maps: With a click of a button, you can view the listed place on Google Map

## Contact

- Author: Enxhi Tabaku
- Email: enxhi.tabaku@gmail.com
- LinkedIn: Enxhi Tabaku (enxhi-tabaku)


