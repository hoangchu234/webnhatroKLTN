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
    public class NotificationsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IHubContext<SignalrHub> _hubContext;

        public NotificationsController(ApplicationDbContext context, IHubContext<SignalrHub> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
        }

        // GET: api/Notifications/notificationcount  
        [HttpGet]
        [Route("notificationcount/{id}")]
        public async Task<ActionResult<NotificationCountResult>> GetNotificationCount(int id)
        {
            var count =  (from not in _context.Messegers
                         join a in _context.Conversations
                         on not.ConversationId equals a.Id
                         where not.JustSee == true && a.UserIdTwo == id
                         select not).CountAsync();
            NotificationCountResult result = new NotificationCountResult
            {
                Count = await count
            };
            return result;
        }

        // GET: api/Notifications/notificationresult  
        [Route("notificationresult/{id}")]
        [HttpGet]
        public async Task<ActionResult<List<NotificationResult>>> GetNotificationMessage(int id)
        {
            var results = from message in _context.Messegers
                          join user in _context.Users
                          on message.UserId equals user.Id
                          join a in _context.Conversations
                          on message.ConversationId equals a.Id
                          where message.JustSee == true && a.UserIdTwo == id
                          orderby message.Id descending
                          select new NotificationResult
                          {
                              Messeger = message.Message,
                              Sender = message.User.HovaTen,
                              Date = message.Date
                          };
            return await results.ToListAsync();
        }
    }
}
