import './App.css';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function App() {
  const [tasks, setTasks] = useState({});
  const [buttonPressed, setButtonPressed] = useState(false);
  const entry = useRef(null);
  const statusRef = useRef(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get('http://localhost:3001/tasks/table');
        if (data) {
          setTasks(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchTasks();
  }, [buttonPressed]);

  const handleClick = async (statusChange, id) => {
    try {
      const { status } = await axios.put(`http://localhost:3001/tasks/${id}`, {
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

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const { status } = await axios.post('http://localhost:3001/tasks', {
        entry: entry.current.value,
        status: statusRef.current.value.toUpperCase(),
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

  return (
    <div className="App">
      <div className="container">
        <div id="to-do" className="section">
          <h2>To-DO</h2>
          <div className="list">
            {tasks['TO-DO']
              ? tasks['TO-DO'].map((task) => {
                  return (
                    <div className="task">
                      <Link to={`/${task._id}`}>{task.entry}</Link>
                      <div>
                        Change to:
                        <br />
                        <button
                          onClick={() => {
                            handleClick('COMPLETED', task._id);
                          }}
                        >
                          {'<--'}
                        </button>
                        <button
                          onClick={() => {
                            handleClick('PENDING', task._id);
                          }}
                        >
                          {'-->'}
                        </button>
                      </div>
                    </div>
                  );
                })
              : ''}
          </div>
        </div>
        <div id="pending" className="section">
          <h2>Pending</h2>
          <div className="list">
            {tasks['PENDING']
              ? tasks['PENDING'].map((task) => {
                  return (
                    <div className="task">
                      <Link to={`/${task._id}`}>{task.entry}</Link>
                      <div>
                        Change to:
                        <br />
                        <button
                          onClick={() => {
                            handleClick('TO-DO', task._id);
                          }}
                        >
                          {'<--'}
                        </button>
                        <button
                          onClick={() => {
                            handleClick('COMPLETED', task._id);
                          }}
                        >
                          {'-->'}
                        </button>
                      </div>
                    </div>
                  );
                })
              : ''}
          </div>
        </div>
        <div id="completed" className="section">
          <h2>Completed</h2>
          <div className="list">
            {tasks['COMPLETED']
              ? tasks['COMPLETED'].map((task) => {
                  return (
                    <div className="task">
                      <Link to={`/${task._id}`}>{task.entry}</Link>
                      <div>
                        Change to:
                        <br />
                        <button
                          onClick={() => {
                            handleClick('PENDING', task._id);
                          }}
                        >
                          {'<--'}
                        </button>
                        <button
                          onClick={() => {
                            handleClick('TO-DO', task._id);
                          }}
                        >
                          {'-->'}
                        </button>
                      </div>
                    </div>
                  );
                })
              : ''}
          </div>
        </div>
      </div>
      <div className="formContainer">
        <form className="form" onSubmit={handleSubmit}>
          <label>
            Entry: <input type="text" ref={entry} />
          </label>
          <label>
            Status:
            <select ref={statusRef}>
              <option value="to-do">To-Do</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </label>
          <button type="submit" className="submit">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
