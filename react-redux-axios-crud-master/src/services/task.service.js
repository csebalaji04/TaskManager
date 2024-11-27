import http from "../http-common";

class TaskDataService {
  getAll() {
    return http.get("/Tasks/GetTaskDetails");
  }

  get(id) {
    return http.get(`/Tasks/GetTaskDetail/${id}`);
  }

  create(data) {
    return http.post("/Tasks/PostTaskDetail", data);
  }

  update(id, data) {
    return http.put(`/Tasks/PutTaskDetail/${id}`, data);
  }

  delete(id) {
    return http.delete(`/Tasks/DeleteTaskDetail/${id}`);
  }

  deleteAll() {
    return http.delete(`/Tasks`);
  }

  findByTitle(title) {
    return http.get(`/Tasks?title=${title}`);
  }
}

export default new TaskDataService();