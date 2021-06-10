using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Websitedangtintimkiemnhatro.Hubs;
using Websitedangtintimkiemnhatro.Models;
using Websitedangtintimkiemnhatro.ViewModels;

namespace Websitedangtintimkiemnhatro.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessegersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IHubContext<SignalrHub> _hubContext;

        public MessegersController(ApplicationDbContext context, IHubContext<SignalrHub> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
        }

        // GET: api/Messegers  
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Messeger>>> GetMessegers()
        {
            return await _context.Messegers.ToListAsync();
        }

        // GET: api/Messegers/5  
        [HttpGet]
        [Route("GetConservation/{idReciver}/{idSender}")]
        public async Task<ActionResult<IEnumerable<Messeger>>> GetConservation(int idReciver, int idSender)
        {
            var conservation = _context.Conversations.Where(a => a.UserIdOne == idReciver && a.UserIdTwo == idSender).FirstOrDefault();
            var messegers = await _context.Messegers.Where(a => a.ConversationId == conservation.Id).ToListAsync();
            if (messegers == null)
            {
                return NotFound();
            }

            return messegers;
        }

        // POST: api/Messegers  
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754  
        [HttpPost]
        public async Task<ActionResult<Messeger>> PostMesseger(CreateMessageRequest request)
        {
            Conversation conversation = new Conversation();
            conversation.UserIdOne = request.SenderId;
            conversation.UserIdTwo = request.ReceiverId;
            _context.Conversations.Add(conversation);
            await _context.SaveChangesAsync();

            Messeger messeger = new Messeger();
            messeger.Type = request.Type;
            messeger.Message = request.Content;
            messeger.Date = DateTime.Now;
            messeger.ConversationId = conversation.Id;
            messeger.UserId = request.SenderId;
            _context.Messegers.Add(messeger);

            try
            {
                await _context.SaveChangesAsync();
                await _hubContext.Clients.All.SendAsync("MessageReceived", messeger);
            }
            catch (DbUpdateException)
            {
                throw;
            }

            return Ok(new { Message = "Request complete!" });
        }

        //// DELETE: api/Employees/5  
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteEmployee(string id)
        //{
        //    var employee = await _context.Employee.FindAsync(id);
        //    if (employee == null)
        //    {
        //        return NotFound();
        //    }

        //    Notification notification = new Notification()
        //    {
        //        EmployeeName = employee.Name,
        //        TranType = "Delete"
        //    };

        //    _context.Employee.Remove(employee);
        //    _context.Notification.Add(notification);

        //    await _context.SaveChangesAsync();
        //    await _hubContext.Clients.All.BroadcastMessage();

        //    return NoContent();
        //}

        //private bool EmployeeExists(string id)
        //{
        //    return _context.Employee.Any(e => e.Id == id);
        //}
    }
}
