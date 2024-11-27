  import React, { Component } from "react";
  import { connect } from "react-redux";
  import {
    retrieveTasks,
    findTasksByTitle,
    deleteAllTasks,
  } from "../actions/tasks";
  import { Link } from "react-router-dom";

  class TasksList extends Component {
    constructor(props) {
      super(props);
      this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
      this.refreshData = this.refreshData.bind(this);
      this.setActiveTask = this.setActiveTask.bind(this);
      this.findByTitle = this.findByTitle.bind(this);
      this.removeAllTasks = this.removeAllTasks.bind(this);

      this.state = {
        currentTutorial: null,
        currentIndex: -1,
        searchTitle: "",
      };
    }

    componentDidMount() {
      this.props.retrieveTasks();
    }

    onChangeSearchTitle(e) {
      const searchTitle = e.target.value;

      this.setState({
        searchTitle: searchTitle,
      });
    }

    refreshData() {
      this.setState({
        currentTutorial: null,
        currentIndex: -1,
      });
    }

    setActiveTask(task, index) {
      this.setState({
        currentTask: task,
        currentIndex: index,
      });
    }

    removeAllTasks() {
      this.props
        .deleteAllTasks()
        .then((response) => {
          console.log(response);
          this.refreshData();
        })
        .catch((e) => {
          console.log(e);
        });
    }

    findByTitle() {
      this.refreshData();

      this.props.findTasksByTitle(this.state.searchTitle);
    }

    render() {
      const { currentTask, currentIndex } = this.state;
      const { tasks } = this.props;

      return (
        <div className="list row">
          <div className="col-md-6">
            <h4>Tasks List</h4>

            <ul className="list-group">
              {tasks &&
                tasks.map((task, index) => (
                  <li
                    className={
                      "list-group-item " +
                      (index === currentIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveTask(task, index)}
                    key={index}
                  >
                    {task.title}
                  </li>
                ))}
            </ul>
          </div>
          <div className="col-md-6">
            {currentTask ? (
              <div>
                <h4>Task</h4>
                <div>
                  <label>
                    <strong>Title:</strong>
                  </label>{" "}
                  {currentTask.title}
                </div>
                <div>
                  <label>
                    <strong>Description:</strong>
                  </label>{" "}
                  {currentTask.description}
                </div>
                <div>
                  <label>
                    <strong>Completed:</strong>
                  </label>{" "}
                  {currentTask.isComplete ? "True" : "False"}
                </div>

                <Link
                  to={"/Tasks/" + currentTask.id}                  
                >
                  Edit
                </Link>
              </div>
            ) : (
              <div>
                <br />
                <p>Please click on a Task...</p>
              </div>
            )}
          </div>
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      tasks: state.tasks,
    };
  };

  export default connect(mapStateToProps, {
    retrieveTasks,
    findTasksByTitle,
    deleteAllTasks,
  })(TasksList);
