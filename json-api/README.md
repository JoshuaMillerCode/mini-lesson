# Trello Mock Backend API

Today we will be building the backend API that will provide the information needed through JSON to our frontend client. After the backend is complete we will then build the frontend.

### Libraries Utilized

- express
- dotenv
- cors
- mongoose

This Express server will be the same thing you all have been doing but instead of rendering our files with the server the frontend client will handle that. This application's purpose is to serve JSON data upon request.

<hr />

## Getting Started

First we will open up our terminal into the `software_classwork` folder. Once inside that folder run these commands:

```
mkdir office_hour

cd office_hour

mkdir trello-backend

cd trello-backend
```

<hr />

## JSON API Engineer Activated 🚀

- First let's download our dependencies
- Make sure we are in the `trello-backend` directory.
- Follow the commands below 🔽

```
touch server.js

npm init -y

npm i express dotenv cors mongoose
```

### After that lets make our `models` and `controllers` folders and the files with

```
mkdir controllers models

touch controllers/task.js

touch models/Task.js && touch models/connection.js
```

- We will worry about these files after we set up our server.
<hr />

## <u>Server</u>

### - First thing we always do, bring in our imports and create the nessecary variables for Express

- During this activity will we be separating our concerns to keep the server file neat.

```js
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;
```

### - Middleware Next!

- expess.json() allows our server to parse json
- we will discuss cors. [More Info](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

```js
app.use(cors());
app.use(express.json());
```

- And finally our listen statement at the bottom

```js
app.listen(PORT, () => {
  `Listening on port: ${PORT}`;
});
```

<hr />

## <u>Mongoose</u>

### - Connection

- Paste this inside of your connection.js file. Nothing new here we've seen this before!

```js
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .on('open', () => console.log('Connected to Mongoose'))
  .on('close', () => console.log('Disconnected from Mongoose'))
  .on('error', (error) => console.log(error));

module.exports = mongoose;
```

### - Schema && Model

For our Trello mock, the two main fields will be the task's entry and status. Entry for the content of the task and status so we can track the life cycle of the task.

- We are using a new schema property called enum, which allows us to restrict the status field to only be able to be equal to "TO-DO", "PENDING", and "COMPLETED".

```js
entry: {
    required: true,
    type: String
  },
status: {
    type: String,
    required: true,
    default: 'TO-DO',
    enum: ['TO-DO', 'PENDING', 'COMPLETED'],
  }
```

<hr />

## <u>Finally our Controller</u>

### - Imports

First lets require express and our Task mongoose model

### - Making our router

Create a route variable assign it to the `express.Router()` function

<hr />

The last step is to build out our CRUD routes.
Since we are not serving any files we will not not certain routes like Edit, New, and Show

### CRUD

( Every route will will return JSON )

- Create

  - POST route to create a task using the `req.body`
    - returns a status and the created task

- Read

  - GET `/` route that finds and returns everyhting in the Task database
  - GET `/table` route that will filter our tasks by their status and return the data in a neat object. (This route is key to our frontend functionality.)
  - GET `/:id` route that finds a task based on id and returns the found task

- Update
  - PUT `/:id` route that finds and updates a specific task then returns the updated task
- Delete
  - DELETE `/:id` route that will find and delete a specific task. Returns a status and message.

### Last step is the export the router and require it into the server file. Then set your controller middleware using "/tasks"

<hr />

## All Done!
