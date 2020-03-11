 4 X 4 board Boggle is word search games.

## Structure

### 1. Backend

API is created in Ruby on Rails. Postman Collection is added for reference: [Boggle.postman_collection.json]( https://github.com/nirojdyola/boggle/tree/master/postman_collection) . Mysql database is used. Please change the database configuration in `backend/config/database.yml`

## To run the project

`bundle install`

`rails db:migrate`

`rails db:seed`

`rails s`

It will open in port=3000

### 2. Frontend

Frontend is created using react js. Environment variables has been added in frontend/.env-example. Copy this and rename it to `.env` or `.env.local`

## To run the project

`npm install`

`npm start`

It will open in defined port.




