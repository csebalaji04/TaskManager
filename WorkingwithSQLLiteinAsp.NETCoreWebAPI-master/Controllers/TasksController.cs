// Controllers/TodoController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WorkingwithSQLLiteinAsp.NETCoreWebAPI.ApplicationDbContext;
using WorkingwithSQLLiteinAsp.NETCoreWebAPI.DataAccess;
using WorkingwithSQLLiteinAsp.NETCoreWebAPI.Models;
using WorkingwithSQLLiteinAsp.NETCoreWebAPI.Services;

[ApiController]
[Route("api/[controller]/[Action]")]
public class TasksController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ITasksServices _tasksServices;

    public TasksController(AppDbContext context, ITasksServices todoServices)
    {
        _context = context;
        _tasksServices = todoServices;
    }

    // GET: api/Tasks
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskDetail>>> GetTaskDetails()
    {
        var value = await _tasksServices.GetTaskDetails();
        return Ok(value); // Wrap the value in an Ok response.
    }

    // GET: api/Tasks/5
    [HttpGet("{id}")]
    public async Task<ActionResult<TaskDetail>> GetTaskDetail(long id)
    {
        var value = await _tasksServices.GetTaskDetail(id);

        if(value == null)
        {
            return NotFound();
        }

        return Ok(value);
    }

    // POST: api/Tasks
    [HttpPost]
    public async Task<ActionResult<TaskDetail>> PostTaskDetail(TaskDetail taskDetail)
    {
        try
        {
            var value = await _tasksServices.PostTaskDetail(taskDetail);
            return Ok(value);
        }
        catch(Exception ex)
        {
            return BadRequest(ex.Message);
        }

       
    }

    // PUT: api/Tasks/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutTaskDetail(long id, TaskDetail taskDetail)
    {
        if(id != taskDetail.Id)
        {
            return BadRequest();
        }

        try
        {
            var value = await _tasksServices.PutTaskDetail(id, taskDetail);

            return Ok(value);
        }
        catch(Exception ex)
        {
            return NotFound();
        }
       
    }

    // DELETE: api/Tasks/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTaskDetail(long id)
    {
        await _tasksServices.DeleteTaskDetail(id);
        return NoContent();
    }
    
}
