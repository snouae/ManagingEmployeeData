using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EmployeeManagement.Data;
using EmployeeManagement.Models;

//Controller Declaration

[Route("api/[controller]")]
[ApiController]
public class EmployeesController : ControllerBase
{
    private readonly EmployeeContext _context;

    public EmployeesController(EmployeeContext context)
    {
        _context = context;
    }

    //Get All Employees
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
    {
        return await _context.Employees.ToListAsync();
    }

    //Get Employee by Id
    [HttpGet("{id}")]
    public async Task<ActionResult<Employee>> GetEmployee(Guid id)
    {
        var employee = await _context.Employees.FindAsync(id);

        if (employee == null)
        {
            return NotFound();
        }

        return employee;
    }

    //Create Employee
    [HttpPost]
    public async Task<ActionResult<Employee>> PostEmployee(Employee employee)
    {
        employee.Id = Guid.NewGuid();
        _context.Employees.Add(employee);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetEmployee), new { id = employee.Id }, employee);
    }

    //Update Employee
    [HttpPut("{id}")]
    public async Task<IActionResult> PutEmployee(Guid id, Employee employee)
    {
        if (id != employee.Id)
        {
            return BadRequest();
        }

        _context.Entry(employee).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!EmployeeExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    //Delete Employee
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEmployee(Guid id)
    {
        var employee = await _context.Employees.FindAsync(id);
        if (employee == null)
        {
            return NotFound();
        }

        _context.Employees.Remove(employee);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool EmployeeExists(Guid id)
    {
        return _context.Employees.Any(e => e.Id == id);
    }

    //Search Employee
    [HttpGet("search")]
    public async Task<ActionResult<IEnumerable<Employee>>> SearchEmployee(string name)
    {
        return await _context.Employees.Where(e => e.FirstName.Contains(name) || e.LastName.Contains(name)).ToListAsync();
    }


    //Search Employee by Department
    [HttpGet("search/department")]
    public async Task<ActionResult<IEnumerable<Employee>>> SearchEmployeeByDepartment(string department)
    {
        return await _context.Employees.Where(e => e.Department.Contains(department)).ToListAsync();
    }


    //Search Employee by Position
    [HttpGet("search/position")]
    public async Task<ActionResult<IEnumerable<Employee>>> SearchEmployeeByPosition(string position)
    {
        return await _context.Employees.Where(e => e.Position.Contains(position)).ToListAsync();
    }


}