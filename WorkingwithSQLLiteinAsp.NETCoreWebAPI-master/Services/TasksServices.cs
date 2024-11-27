using Microsoft.EntityFrameworkCore;
using WorkingwithSQLLiteinAsp.NETCoreWebAPI.DataAccess;
using WorkingwithSQLLiteinAsp.NETCoreWebAPI.Models;

namespace WorkingwithSQLLiteinAsp.NETCoreWebAPI.Services
{
    public class TasksServices:ITasksServices
    {
        private readonly ITasksDataAccess _tasksDataAccess;
        public TasksServices(ITasksDataAccess todoDataAccess)
        {
            _tasksDataAccess = todoDataAccess;
        }
        public async Task<IEnumerable<TaskDetail>> GetTaskDetails()
        {
            return await _tasksDataAccess.GetTaskDetails();
        }

        public async Task<TaskDetail> GetTaskDetail(long id)
        {
            return await _tasksDataAccess.GetTaskDetail(id);

        }
        public async Task<TaskDetail> PostTaskDetail(TaskDetail taskDetail)
        {
            try
            {
                var value = _tasksDataAccess.GetTaskDetails().Result.Where(x => x.Id == taskDetail.Id).FirstOrDefault();
                if(value!=null)
                {
                    throw new Exception("Id already exists");
                }
                else 
                {
                    return await _tasksDataAccess.PostTaskDetail(taskDetail);
                }

            }
            catch (Exception ex)
            {
                throw;
            }
           
        }

        public async Task<TaskDetail> PutTaskDetail(long id, TaskDetail taskDetail)
        {

            return await _tasksDataAccess.PutTaskDetail(id, taskDetail);
        }

        public async Task DeleteTaskDetail(long id)
        {
           await _tasksDataAccess.DeleteTaskDetail(id);
        }
    }
}
