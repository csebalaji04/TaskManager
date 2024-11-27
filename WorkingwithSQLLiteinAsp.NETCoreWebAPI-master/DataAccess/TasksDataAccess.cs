using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WorkingwithSQLLiteinAsp.NETCoreWebAPI.ApplicationDbContext;
using WorkingwithSQLLiteinAsp.NETCoreWebAPI.Models;

namespace WorkingwithSQLLiteinAsp.NETCoreWebAPI.DataAccess
{
    public class TasksDataAccess : ITasksDataAccess
    {
        private readonly AppDbContext _context;
        public TasksDataAccess(AppDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<TaskDetail>> GetTaskDetails()
        {
            return await _context.TaskDetail.ToListAsync();
        }

        public async Task<TaskDetail> GetTaskDetail(long id)
        {
            return await _context.TaskDetail.FindAsync(id);
        }

        public async Task<TaskDetail> PostTaskDetail(TaskDetail taskDetail)
        {
            _context.TaskDetail.Add(taskDetail);
            await _context.SaveChangesAsync();
            return taskDetail;
        }

        public async Task<TaskDetail> PutTaskDetail(long id, TaskDetail taskDetail)
        {

            _context.Entry(taskDetail).State = EntityState.Modified;
             await _context.SaveChangesAsync();
            return taskDetail;
        }

        public async Task DeleteTaskDetail(long id)
        {
            var taskDetail = await _context.TaskDetail.FindAsync(id);
            _context.TaskDetail.Remove(taskDetail);
            await _context.SaveChangesAsync();
        }
    }
}
