# Trello React Frontend (Part 2)

### Now its time for the fun stuff, creating our frontend that will connect to our backend.

<hr />

### Libraries Utilized

- create-react-app
- react-router-dom (new and improved)
- axios

## A little sneak peek of what this will look like at the end.

[

INSERT PICTURE HERE

]

# Self Notes

- Introduction
- set up react app and install dependencies
- Go over React Router and explain how to set it up
  - create pages Show and a layout folder with a Layout.js
  - Create the routing inside of the index.js
- Once that is done start building the Appp.js
  - Create the structure of the jsx
  - Pull in data from backend using useEffect and useState and display it onto the screen.
  - create buttons and button functions
  - finally add the form at bottom to add tasks

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

touch Show.js layout/Layout.js
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
<br>

# Implementation

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
