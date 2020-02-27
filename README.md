# HL7sender #
===================

A simple utility for testing sending of dummy data to a HL7 server

### Installation ###
To run the application follow the following steps.
1. Install NodeJS on your PC
2. Clone this repository and go to the cloned directory
3. Install and run MySQL, create a database named nhcr_dev
4. Install dependencies using npm install
5. Create database tables using `npx sequelize-cli db:migrate`
6. Populate the database with dummy data using `npx sequelize-cli db:seed:all`
7. Start the application using `npx nodemon start`
8. Go to your browser and access `localhost:3000/clients`

### Post-install use ###
You will see a list of all clients in your database that you can now push to the defined HL7 server in the controllers.

__________________
_Work in Progress_
