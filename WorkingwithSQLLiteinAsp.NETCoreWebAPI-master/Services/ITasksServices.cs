using Microsoft.AspNetCore.Mvc;
using WorkingwithSQLLiteinAsp.NETCoreWebAPI.Models;

namespace WorkingwithSQLLiteinAsp.NETCoreWebAPI.Services
{
    public interface ITasksServices
    {
        public Task<IEnumerable<TaskDetail>> GetTaskDetails();

        public Task<TaskDetail> GetTaskDetail(long id);

        public Task<TaskDetail> PostTaskDetail(TaskDetail taskDetail);

        public Task<TaskDetail> PutTaskDetail(long id, TaskDetail taskDetail);

        public Task DeleteTaskDetail(long id);
    }
}
