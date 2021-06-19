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
        private readonly IHubContext<BroadcastHub, IHubClient> _hubContext;

        public NotificationsController(ApplicationDbContext context, IHubContext<BroadcastHub, IHubClient> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
        }

        // GET: api/Notifications/GetNotificationCount  
        [HttpGet]
        [Route("GetNotificationCount/{id}")]
        public async Task<ActionResult<NotificationCountResult>> GetNotificationCount(int id)
        {
            var nofti = _context.Notifications.Where(a => a.UserReceiver == id && a.SeeReceiver == false).ToList();
        
            NotificationCountResult result = new NotificationCountResult
            {
                Count = nofti.Count
            };
            return result;
        }

        // GET: api/Notifications/GetNotificationMessage  
        [Route("GetNotificationMessage/{id}")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NotificationResult>>> GetNotificationMessage(string id)
        {
            var nofti = _context.Notifications.Where(a => a.UserReceiver.ToString() == id).ToList();

            var nofti2 = _context.Notifications.Where(a => a.UserSender.ToString() == id).ToList();

            List<NotificationResult> final = new List<NotificationResult>();

            if (nofti != null)
            {
                DateTime aDateTime = DateTime.Now;
                var data1 = nofti.Select(a => new NotificationResult
                {
                    Id = a.Id,
                    UserId = _context.Messegers.Where(b => b.ConversationId == a.ConversationId).OrderByDescending(c => c.Date).FirstOrDefault().UserId,
                    MessegerId = _context.Messegers.Where(b => b.ConversationId == a.ConversationId).OrderByDescending(c => c.Date).FirstOrDefault().Id,
                    Messeger = _context.Messegers.Where(b => b.ConversationId == a.ConversationId).OrderByDescending(c => c.Date).FirstOrDefault().Message,
                    Sender = _context.Users.Where(b => b.Id == a.UserSender).FirstOrDefault().HovaTen,
                    Date = aDateTime.Subtract(_context.Messegers.Where(b => b.ConversationId == a.ConversationId).OrderByDescending(c => c.Date).FirstOrDefault().Date).Days,
                    Image = _context.Users.Where(b => b.Id == a.UserSender).FirstOrDefault().UserImage,
                    JustSee = a.SeeReceiver
                }).ToList();
                final.AddRange(data1);
            }

            if (nofti2 != null)
            {
                DateTime aDateTime = DateTime.Now;
                var data2 = nofti2.Select(a => new NotificationResult
                {
                    Id = a.Id,
                    UserId = _context.Messegers.Where(b => b.ConversationId == a.ConversationId).OrderByDescending(c => c.Date).FirstOrDefault().UserId,
                    MessegerId = _context.Messegers.Where(b => b.ConversationId == a.ConversationId).OrderByDescending(c => c.Date).FirstOrDefault().Id,
                    Messeger = _context.Messegers.Where(b => b.ConversationId == a.ConversationId).OrderByDescending(c => c.Date).FirstOrDefault().Message,
                    Sender = _context.Users.Where(b => b.Id == a.UserReceiver).FirstOrDefault().HovaTen,
                    Date = aDateTime.Subtract(_context.Messegers.Where(b => b.ConversationId == a.ConversationId).OrderByDescending(c => c.Date).FirstOrDefault().Date).Days,
                    Image = _context.Users.Where(b => b.Id == a.UserReceiver).FirstOrDefault().UserImage,
                    JustSee = a.SeeSender
                }).ToList();
                final.AddRange(data2);
            }

            return final;
        }

        // PUT: api/Notifications/PutNotification  
        [HttpPut]
        [Route("PutNotification/{id}")]
        public async Task<IActionResult> PutNotification(int id, NotificationResult notification)
        {
            var nofti = _context.Notifications.Where(a => a.UserReceiver == id && a.Id == notification.Id).FirstOrDefault();
            nofti.SeeReceiver = true;
            _context.Entry(nofti).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                await _hubContext.Clients.All.BroadcastMessage();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            return NoContent();
        }
    }
}
