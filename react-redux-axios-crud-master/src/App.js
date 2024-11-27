import React, { Component } from "react";
import { BrowserRouter as Router,Routes,  Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTask from "./components/add-tasks.component";
import Task from "./components/task.component";
import TasksList from "./components/tasks-list.component";

class App extends Component {
  render() {
    return (
      <Router>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/Tasks"} className="navbar-brand">
            Home
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/Tasks"} className="nav-link">
                Tasks
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            {/* Replace "component" with "element" */}
            {/* Use separate Route for each path instead of an array */}
            <Route path="/" element={<TasksList />} />
            <Route path="/Tasks" element={<TasksList />} />
            <Route path="/add" element={<AddTask />} />
            <Route path="/Tasks/:id" element={<Task />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
