﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Websitedangtintimkiemnhatro.Models;
using BC = BCrypt.Net.BCrypt;

namespace Websitedangtintimkiemnhatro.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EmployeesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Employees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            return await _context.Employees.Include(a => a.Account).ThenInclude(a => a.Role).Where(a => a.Account.RoleId != 1).ToListAsync();
        }

        // GET: api/Employees/EmployeeAccount
        [HttpGet]
        [Route("GetEmployeeAccount/{id}")]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployeeAccount(int id)
        {
            var employees = await _context.Employees.Where(a => a.AccountId == id).ToListAsync();

            if (employees == null)
            {
                return Content("Failse");
            }

            return employees;
        }

        // GET: api/Employees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            var employee = await _context.Employees.Include(a => a.Account).ThenInclude(a => a.Role).Where(a => a.Id == id).FirstOrDefaultAsync();

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }

        // PUT: api/Employees/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, Employee employee)
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

        // POST: api/Employees
        [HttpPost]
        public async Task<ActionResult<Account>> PostEmployee(Account account)
        {
            account.IsActive = true;
            account.RoleId = 2;
            account.IsHD = true;

            // hash password
            String passwordHash = BC.HashPassword(account.Password);
            account.Password = passwordHash;

            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();

            int id = account.Id;
            account.Employee.CreatedDate = DateTime.Now;
            account.Employee.LastLogOnDate = DateTime.Now;
            account.Employee.AccountId = id;

            _context.Employees.Add(account.Employee);

            return account;
        }

        // DELETE: api/Employees/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Employee>> DeleteEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return employee;
        }

        private bool EmployeeExists(int id)
        {
            return _context.Employees.Any(e => e.Id == id);
        }
    }
}
