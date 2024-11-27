import React, { Component } from "react";
import { connect } from "react-redux";
import { updateTask, deleteTask } from "../actions/tasks";
import TaskDataService from "../services/task.service";
import withRouter from "../utils/withRouter";

class Task extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getTask = this.getTask.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.removeTask = this.removeTask.bind(this);

    this.state = {
      currentTask: {
        id: null,
        title: "",
        description: "",
        isComplete: false,
      },
      message: "",
    };
  }

  componentDidMount() {
    const { id } = this.props.params; // Access route params via props.params
    this.getTask(id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState((prevState) => ({
      currentTask: {
        ...prevState.currentTask,
        title: title,
      },
    }));
  }

  onChangeStatus(e) {
    const status = e.target.value;

    this.setState((prevState) => ({
      currentTask: {
        ...prevState.currentTask,
        isComplete: status,
      },
    }));
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentTask: {
        ...prevState.currentTask,
        description: description,
      },
    }));
  }

  getTask(id) {
    TaskDataService.get(id)
      .then((response) => {
        this.setState({
          currentTask: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateStatus(status) {
    var data = {
      id: this.state.currentTask.id,
      title: this.state.currentTask.title,
      description: this.state.currentTask.description,
      isComplete: status,
    };

    this.props
      .updateTask(this.state.currentTask.id, data)
      .then((response) => {
        console.log(response);

        this.setState((prevState) => ({
          currentTask: {
            ...prevState.currentTask,
            isComplete: status,
          },
        }));

        this.setState({ message: "The status was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateContent() {
    this.props
      .updateTask(this.state.currentTask.id, this.state.currentTask)
      .then((response) => {
        console.log(response);

        this.setState({ message: "The task was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removeTask() {
    this.props
      .deleteTask(this.state.currentTask.id)
      .then(() => {
        this.setState({ message: "The task was removed successfully!" });
        this.props.history.push("/Tasks");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentTask } = this.state;

    return (
      <div>
        {currentTask ? (
          <div className="edit-form">
            <h4>Task</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentTask.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentTask.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Completed:</strong>
                </label>
                <input
          type="checkbox"
          checked={currentTask.isComplete}
          onChange={this.onChangeStatus}
        />
              </div>
            </form>
            <button
              onClick={this.removeTask}
            >
              Delete
            </button>

            <button
              type="submit"
              onClick={this.updateContent}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Task...</p>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { updateTask, deleteTask })(withRouter(Task));
