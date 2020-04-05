# HL7sender #
=============

A simple utility for generating and sending of dummy patient data to a HL7 server. The data is meant for consumption by a client registry server that can handle HL7 data (MSH, EVN, PID, PV1, IN1 and optional ZXT Column for non-standard data).

### Installation ###
To run the application follow the following steps.
1. Install NodeJS on your PC
2. Install and run MySQL
3. Clone this repository and go to the cloned directory using your command line interface
4. While inside the cloned directory, nstall dependencies by running `npm install`
5. Create the database using `npx sequelize-cli db:create` then run `npx sequelize-cli db:migrate` to create tables
6. Populate the database with dummy data using `npx sequelize-cli db:seed:all` if you want to change the number of demo clients that get populated in your database then go to the cloned files inside 'seeder' directory and change the line that reads: ```const record_limit = 50;``` Change the number 50 to any number you prefer (it can take a while to seed 100,000 rows).
7. Start the application using `npx nodemon start`
8. OPTIONAL: To change DB environments got to app.js change the line that reads `res.locals.error = req.app.get('env') === 'development' ? err : {};` change the word 'development' to 'production' or 'test'.


### Post-install use ###
You will see a list of all clients in your database that you can now push to the defined HL7 server in the controllers. To change the destination, change the port and the IP addess in controllers/client.js to whatever IP and port you prefer.
1. Go to your browser and access `localhost:3000/clients`
2. Click More on the left side of any client's details to view more detailed information
3. In the information page, there is a button for sendin that client to the NHCR. Use that!
4. To do a bulk sendng of clients, use the link in the CLIENTS page to push all of them (NOTE: That can take a while!)

__________________
_Work in Progress - Kizito_