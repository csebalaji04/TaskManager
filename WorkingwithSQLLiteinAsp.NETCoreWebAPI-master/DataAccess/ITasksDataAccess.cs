using Microsoft.AspNetCore.Mvc;
using WorkingwithSQLLiteinAsp.NETCoreWebAPI.Models;

namespace WorkingwithSQLLiteinAsp.NETCoreWebAPI.DataAccess
{
    public interface ITasksDataAccess
    {
        public Task<IEnumerable<TaskDetail>> GetTaskDetails();

        public Task<TaskDetail> GetTaskDetail(long id);

        public Task<TaskDetail> PostTaskDetail(TaskDetail taskDetail);

        public Task<TaskDetail> PutTaskDetail(long id, TaskDetail taskDetail);

        public Task DeleteTaskDetail(long id);
    }
}
