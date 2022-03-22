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

<br />
<br />
<br />
<br />

# Trello React Frontend (Part 2)

### Now its time for the fun stuff, creating our frontend that will connect to our backend.

<hr />

### Libraries Utilized

- create-react-app
- react-router-dom (new and improved)
- axios

## A little sneak peek of what this will look like at the end.

![Trello Pic](/client/public/trello.png)

- Styling could be better, but its what it is on the inside that counts.

# Getting Started

To create our react app we will be using create-react-app. This command (create by Facebook) will create a basic starter react app. This allows us to just start coding instead of set it up from scratch.

- We will run the command below inside of our `office_hours` folder

### <u>create-react-app Usage</u>

```
npx create-react-app client
```

- This will take minute to run but once its done we will have a fully running React app!

Once the process is complete we will then cd into our client (what we just created) and install our necessary dependencies.

```
cd client

npm i react-router-dom@6 axios

code .
```

# Lets clean our app up!

create-react-app adds a lot on bells and whistles that we don't really need in this project, lets delete these files so its not so cluttered.

- Delete these files

  ```js
  rm App.test.js logo.svg reportWebVitals.js setupTests.js index.css
  ```

- Delete these lines from our `index.js`

  ```js
  import reportWebVitals from './reportWebVitals';
  ```

  ```js
  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
  ```

- And finally, in the `App.js` delete everything inside the return statement but leave the top level `div`. After that delete the import statement for the logo.

<hr />

# [React Router Dom](https://reactrouter.com/docs/en/v6/getting-started/concepts)

React Router Dom is a great package for react that we allow us to dynamic route rendering on the client side whiling also having many other features we can take advantage of. So instead of our express routes serving files with speific routes, we will simulate that on the client side using React components. We can do this by wrapping our entire app in a Router component and giving that component routes to render.

- [API Reference](https://reactrouter.com/docs/en/v6/api)

### For example:

- Express way

```js
app.get('/logs', (req, res) => {
  res.render('Index');
});
```

- React Router Dom way

```js
<Route path="/logs" element={<Index />} />
```

React Router Dom will look at this and display the correct component depending on the url path in your browser. In this example, when the user is on `localhost:3000/logs` it will see that and display the Index component. We will also be implementing a DefaultLayout like we're used to doing but the React Router Dom way.

<br />
<br>

# Making our screen components

We already have our index page for the application which will be the App.js file. Since that is taken care of the only other screens we will need are the layout and show screens.

```js
cd src

mkdir screens

touch screens/Show.js screens/layout/Layout.js
```

### Starter code for our screens

<details>
<summary><u>App.js</u></summary>
<br>

```js
import './App.css';

function App() {
  return <div className="App">Index Page</div>;
}

export default App;
```

</details>

<br>

<details>
<summary><u>Show.js</u></summary>
<br>

```js
function Show() {
  return <div>Show Page</div>;
}

export default Show;
```

</details>

<br>

The layout is a little different from the App.js and Show.js. Since the layout will wrap all of our other pages it will use a special component from react-router-dom called `js <Outlet /> `. I would compare `<Outlet />` component to {this.props.children}. The Layout will be the parent component of the app while the routes will display where the `<Outlet />` component is placed.

<details>
<summary><u>layout/Layout.js</u></summary>
<br>

```js
import '../../App.css';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="layout">
      <header>
        <h1 className="title">Trello</h1> //Will always be displayed
      </header>
      <main>
        <Outlet /> // Where the rest of our components will be displayed
      </main>
    </div>
  );
};

export default Layout;
```

</details>
<br>

Finally lets insert our css code.

<details>
<summary><u>App.css</u></summary>
<br>

```css
body,
header,
h1 {
  text-align: center;
  background-color: burlywood;
  margin: 0;
  padding: 0;
}

.layout {
  margin: 0;
}

.title {
  font-size: 50px;
}

.App {
  width: 100vw;
  height: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.container {
  padding: 0;
  height: 80vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.section {
  display: flex;
  flex-direction: column;
}

.task {
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 10vh;
  width: 27vw;
  border: 3px solid black;
  border-radius: 5px;
  background-color: #ece9d4;
}

.button {
  height: 35px;
  width: 50px;
}

.list {
  height: 700px;
  width: 30vw;
  border: 5px solid black;
  border-radius: 5px;
  background-color: azure;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.formContainer {
  height: 10vh;
  border: 2px solid black;
  width: 40vw;
  border: 2px solid black;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  border-radius: 5px;
  background-color: #ece9d4;
}

.form {
  width: inherit;
  height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.submit {
  width: 150px;
}

.showPage {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: burlywood;
}

.taskContainer {
  width: 70vw;
  height: 60vh;
  border: 1px solid black;
  background-color: azure;
  display: flex;
  justify-self: center;
  align-items: center;
  flex-direction: column;
}
```

</details>
<br>

<br>
<br>

# React Router Implementation

### <u>Index.js</u>

We will need as couple of react-router-dom components to set up our index.js file. First lets import these components.

```js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
```

### Router (Parent)

- This is the component that will wrap our entire app. Everything else will go inside of the Router component.

### Routes (Child of Router)

- This component tells the router that whatever is a child of this component will be a route with an element attached to it. When our url changes react-router will will look through the children of `<Routes />` and decide which component to render.

### Route (Child of Routes)

- An example of the Route component is above but this component will assign a component to the url path it is provided.
- We can actually nest routes with React Router Dom's new update. For example

  ```js
  //If we wanted to render a component at this route:

  "localhost:3000/home/about"

  // We can do something like this:

  <Route path="/home" element={ <Home /> }>
      <Route path="about" element={ <About /> }>
  </Route>
  ```

  #### ⬆ This is exactly how will will use our Layout component. Our App and Show components will be nested inside of the Route component containing Layout

### In order do set this up we also need to import the components we created. (App and Show)

- This is what our `index.js` should look like at the end of integrating react-router-dom

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './App.css';
import Show from './screens/Show';
import Layout from './screens/layout/Layout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<App />} />
        <Route path=":id" element={<Show />} />
      </Route>
    </Routes>
  </Router>,
  document.getElementById('root')
);
```

<br>
<br>

# Making Our App.js

We will be using our `App.js` as our home/landing page. To set up our Trello mock we will make three separate columns to organize the tasks based upon their status. In order to that we will use a variety of hooks provided by React.

## 1. Building out our JSX structure.

- We will do all live in class

<hr/>

1. We should have a single App div right now. Lets make another div inside of that div and give it a className of `container`

2. After that, lets add three sibling divs inside of our div with the className of `container`. Give all of these divs a className of section. Give the first div a id of to-do, the second an id of pending, and the third an id of completed.

3. Once those divs are created insert an h2 element and div (I know I know, can't you tell I like divs 🤣 ). Give the div an className of `list`. Inside this div is where we are going to map over and display the tasks.

- What your App.js should look like after

    <details>
    <summary><u>App.js</u></summary>
    <br>

  ```js
  import './App.css';

  function App() {
    return (
      <div className="App">
        <div className="container">
          <div id="to-do" className="section">
            <h2>To-DO</h2>
            <div className="list"></div>
          </div>
          <div id="pending" className="section">
            <h2>Pending</h2>
            <div className="list"></div>
          </div>
          <div id="completed" className="section">
            <h2>Completed</h2>
            <div className="list"></div>
          </div>
        </div>
      </div>
    );
  }

  export default App;
  ```

    </details>

## 2. Now the fun stuff. Next we will pull in our data and manage that data with state.

Before we do this step we have to understand the React hooks we will be using do to so:

- First is the `useState` hook. We will be using our state to store the data we get back from our JSON API backend. This will be crucial to our data updating live and without a refresh

- `useEffect`: this hook will allow us to write a function that executes everytime the component mounts. useEffect can also watch a state variable and will execute everytime that state is changed.

### <u>Implementation</u>

This code will be written in the App function but above the return.

First lets import the hooks from React and axios (a popular library for making http requests).

```js
import { useState, useEffect } from 'react';
import axios from 'axios';
```

Now lets create our `useState` variable and set the initial value to an empty object.

```js
const [tasks, setTasks] = useState({});
```

<u>useEffect:</u>

Since our useEffect will fire everytime the App.js is mounted onto the screen we will use it to retreive the data from our backend.

The useEffect hook takes 2 arguments:

1. The function it will execute. Inside this function take advantage of the try/catch promise statement. Inside of the try we will use axios to fetch our data from the backend.
2. The second arg is what the useEffect watches. Since we just want it to watch when the component mounts we'll put an empty array

```js
useEffect(async () => {
  try {
    // where we will fetch our data with axios
  } catch (err) {
    console.log(err);
  }
}, []);
```

### <u>Fetching our data with axios</u>

Before we write this code, go back to your `trello-backend` folder and make sure that it is running on port 3000 and you have the cors middleware configured.

Inside of the `try` statement will make our axios call, sounds complicated but axios makes it really easy for us. To make a request with axios just access your axios import and call the method that you need. [Axios request method docs](https://axios-http.com/docs/api_intro). We will use the `js .get()` method to make a GET request to our '/tasks' route.

```js
const { data } = await axios.get('http://localhost:3000/tasks/table');
```

Finally lets store the json data we recieved from the request into the tasks state variable we made earlier. Instead of setting data equal to tasks, we have to use the setData function to set our state variable.

```js
setTasks(data);
```

And thats it! If we start up our client we can look and see we have our tasks inside of our tasks state variable!

=> [Chrome React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)

## <u>Displaying our Data</u>

Inside each `list` div we will map over the tasks depending on their status. To do this, all we have to do it map over the correct array inside of your tasks object.

Once inside the return statement of the map method we will create parent div with a className of `task`. As children, a Link component from React Router Dom and another div that will hold two button elements. The Link is react router's way of linking to another page, it works just like an anchor tag but instead of `href` we use the attribute `to`. For example

```js
<Link to="/home/about">About Page</Link>
```

```js
<div className="list">
  {tasks['TO-DO']
    ? tasks['TO-DO'].map((item) => {
        return (
          <div className="task">
            <Link to={`/${item._id}`}>{item.entry}</Link>
            <div>
              Change to:
              <br />
              <button>Pending</button>
              <button>Completed</button>
            </div>
          </div>
        );
      })
    : ''}
</div>
```

Repeat this process to the other divs with the className of `list` but instead of grabbing the "TO-DO" array within the tasks object, access the other two possible fields. Also change the buttons to the 2 other options of statues depending on what your filtering for.

# Look at that! We have our data displaying accordingly!! 🔮 ✨ ITS MAGIC ✨ 🔮

## By now you should have your tasks separated into the speific status coloumns that you made. Now lets make it to where we can change the status of a task on the db and visually on the screen. The way that we set up our application, we are letting our backend do all of the work throughout the application.

<br>

## <u>Updating our tasks' status in real time.</u>

In order to do this lets create a `handleClick` async function that we will assign to our buttons. This function will take 2 arguments:

- statusChange: this value will tell us the status we need to update our task to.
- id: the id of the task we want to update

```js
const handleClick = (statusChange, id) => {};
```

Inside the function:

- First lets use a try/catch statement
- Create a variable called `response` and set it equal to the `axios.put` method. Enter our `PUT` route url as the argument and insert the id from the function's parameters. In the second param of the axios method make an object and specifiy the feild key and the update value.

```js
const handleClick = async (statusChange, id) => {
  try {
    const { status } = await axios.put(`http://localhost:3000/tasks/${id}`, {
      status: statusChange,
    });
  } catch (err) {
    console.log(err);
  }
};
```

No that we have updated our backend with the correct data, lets catch our frontend up to speed. In order to do this we need to make another useState varibale that we can toggle once we have successfully updated a task. This variable will be watched by our useEffect so everytime we set that variable the useEffect funciton will fetch our updated data and rerender the DOM.

```js
const [buttonPressed, setButtonPressed] = useState(false);
```

Now lets make it to where our useEffect watches this variable. Insert the `butttonPressed` useState

```js
useEffect(() => {
  (async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/tasks/table');
      setTasks(data);
    } catch (err) {
      console.log(err);
    }
  })();
}, [buttonPressed]);
```

Doing this tells the useEffect to watch when the variable changes so when we change the state the function to fetch our data will fire.

Finally we just need to toggle this useState if our request went through, and assign this function to all of our buttons.

Final `handleClick` function:

```js
const handleClick = async (statusChange, id) => {
  try {
    const { status } = await axios.put(`http://localhost:3000/tasks/${id}`, {
      status: statusChange,
    });
    if (status === 200) {
      setButtonPressed(!buttonPressed);
    } else {
      console.log('Something went wrong :(');
    }
  } catch (err) {
    console.log(err);
  }
};
```

Assigning funciton to button:

```js
<div className="list">
  {tasks['TO-DO']
    ? tasks['TO-DO'].map((item) => {
        return (
          <div className="task">
            <p>{item.entry}</p>
            <div>
              Change to:
              <br />
              <button onClick={handleClick('PENDING', item._id)}>
                Pending
              </button>
              <button onClick={handleClick('COMPLETED', item._id)}>Completed</button>
            </div>
          </div>
        );
      })
    : ''}
</div>
```

Repeat this process to the other map statements.js

## And look at that, some more 🔮 ✨ MAGIC ✨ 🔮

<br/>
<br/>

## We've achieved half of the CRUD operations. We can Update and Read our dat from the backend. Now lets implement the Create, Delete, and Show operations.

<br>
<br>

# Creating a Task

Inside the App.js. Make another div with a className of `formContainer` after the `container` div but still inside of the `App` div.

After that create a form element with a className of ` form``. All we need inside the form is an input of type text for the entry of the task, a dropdown input for the 3 status options (<select> `), and a button with a className of submit that will perform like a submit input.

```js
<div className="formContainer">
  <form className="form">
    <label>
      Entry: <input type="text" />
    </label>
    <label>
      Status:
      <select>
        <option value="to-do">To-Do</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
    </label>
    <button className="submit">Add</button>
  </form>
</div>
```

In order to actually have the form do something we need to collect these inputs on submit and create a Task with them.

First lets import the `useRef` hook. This hook will allow how to give our inputs a reference so we know the current value of these inputs at all times.

```js
import { useState, useEffect, useRef } from 'react';
```

## <u>useRef Usage</u>

First lets make a variables for each of the inputs within the form and set them equal to the useRef hook with an argument of `null`. Place these variables after your useState variables.

```js
const entry = useRef(null);
const status = useRef(null);
```

Once established, we can connect these to the two inputs within the form.

- To access the current value of a ref just access the current and value properties.

  ```js
  entry.current.value;
  ```

```js
<form className="form">
  <label>Entry: <input --> ref={entry} <-- type="text" /></label>
  <label>Status:
    <select --> ref={status} <-- >
      <option value="TO-DO">
        To-Do
      </option>
      <option value="PENDING">
        Pending
      </option>
      <option value="COMPLETED">
        Completed
      </option>
     </select>
  </label>
  <button className='submit' onClick={handleSubmit}>Add</button>
</form>
```

Now that we can reference these inputs we can use that to make a POST request to the backend.

Create a `handleSubmit` function and place it below your handleClick function. Inside this function insert a try/catch statement. Once set up, make a post request with axios to `/tasks` route and within the body establish the entry and status fields and set their value to the useRef variables' current value.

```js
const handleSubmit = async (evt) => {
  evt.preventDefault();

  try {
    const { status } = await axios.post('http://localhost:3000/tasks', {
      entry: entry.current.value,
      status: status.current.value,
    });
  } catch (err) {
    console.log(err);
  }
};
```

Now lets make a `didSubmit` useState variable that will act just like our `buttonPressed` variable. Once we have made a success request we will just trigger the useEffect function again to fetch the updated data. Check the status of the request and if success toggle that varibale. After that set the `entry.current.value` to an empty string.

Finally set the handleSubmit function to the button's onClick attribute.

```js
<button className="submit" onClick={handleSubmit}>
  Add
</button>
```

# Show and Delete Operations

Lets go inside of the Show.js and work in there. Since we didn't pass any kind of props to this page we will use React Router Dom's useParams hook. This hook will allow use to access the id we passed into the route back on the App.js (look for the `<Link>` component). We will also need our React hooks, axios, and some additional things we will need later from react router dom.

- Imports
  - ```js
    import React, { useState, useEffect } from 'react';
    import { useParams, Link, useNavigate } from 'react-router-dom';
    import axios from 'axios';
    ```

We can now use that useParams hook to grab the id and make a request with it inside of our useEffect

```js
const { id } = useParams();
```

Lets also go ahead and establish our useState variable that will hold our data.

```js
const [showData, setShowData] = useState({});
```

Now to fetch our data. This will like almost identical to the useEffect inside the App.js but instead of making a reaquest to the`/tasks/table` route, make a request to the `/tasks/:id` route. Use the id we got from the params inside of the url string. Set the data from the axios request to your useState variable.

Show Page useEffect:

```js
useEffect(() => {
  (async () => {
    try {
      // Assign our axios response to a variable. Use the id from params to get our speciifc task
      const { data } = await axios.get(`http://localhost:3000/tasks/${id}`);
      // Set the showData state to the data we recieved from our server.
      setShowData(data);
    } catch (err) {
      console.log(err);
    }
  })();
}, []);
```

## Nice!!! We should have the data from a specific task stored in the `showData` useState variable. Lets display some stuff with that data.

Put the following into the return statement.

```js
<div className="showPage">
  <Link to="/">Home</Link>
  <div className="taskContainer">
    <h1>Entry: {showData.entry}</h1>
    <p>Status: {showData.status}</p>
  </div>
</div>
```

## One word, 🔮 ✨ MAGIC ✨ 🔮

Finally lets make our delete functionality. I bet you can tell what we're going to do. Lets make a function called `handleDelete` that will make a request with axios to our delete route.

- First lets establish a try/catch/finally statement.

- Inside on the `try` make a request with axios and insert the id from the useParams hook inside the url string.

- Inside the `catch` console.log the err

- Inside the finally we are going to use another hook called the `useNaviagte` hook from React Router dom which will allow us to navigate to other screens with just a function.
  - First create the navigate variable at the top of the component and set it equal to useNavigate hook.
    ```js
    const navigate = useNavigate();
    ```
  - Use the navigate function inside of the finally brackets
    ```js
    finally {
      navigate(-1)
    }
    ```

Once we have completed the handleDelete function we can assign it to a delete button. Place this button below everything inside of the taskContainer div.

```js
<button onClick={handleDelete}>Delete 🔴 </button>
```

# And just like that we now have our React frontend and Express backend communicating to each other and achieving full CRUD functionality 🎊 CONGRATS 🎊
