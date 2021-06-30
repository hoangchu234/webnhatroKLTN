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
        private readonly IHubContext<BroadcastHub, IHubClient> _hubContext;

        public MessegersController(ApplicationDbContext context, IHubContext<BroadcastHub, IHubClient> hubContext)
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
        [Route("GetConservationSend/{idSender}/{idReciver}")]
        public async Task<ActionResult<Conversation>> GetConservationSend(int idSender, int idReciver)
        {
            var conservation = _context.Conversations.Include(a => a.Messegers).Where(a => a.UserIdOne == idSender && a.UserIdTwo == idReciver).FirstOrDefault();
            if(conservation == null)
            {
                return null;
            }

            return conservation;
        }

        // GET: api/Messegers/5  
        [HttpGet]
        [Route("GetConservationReceive/{idSender}/{idReciver}")]
        public async Task<ActionResult<Conversation>> GetConservationReceive(int idSender, int idReciver)
        {
            var conservation = _context.Conversations.Include(a => a.Messegers).Where(a => a.UserIdOne == idReciver && a.UserIdTwo == idSender).FirstOrDefault();
            if (conservation == null)
            {
                return null;
            }

            return conservation;
        }

        // GET: api/Messegers/5  
        [HttpGet]
        [Route("CheckSenderOrReceiver/{idMain}/{idClick}")]
        public async Task<ActionResult<Object>> CheckSenderOrReceiver(int idMain, int idClick)
        {
            var conservationsender = _context.Conversations.Where(a => a.UserIdOne == idMain && a.UserIdTwo == idClick).FirstOrDefault();
            var conservationreceicer = _context.Conversations.Where(a => a.UserIdOne == idClick && a.UserIdTwo == idMain).FirstOrDefault();

            if (conservationsender != null)
            {
                return Content("Sender");
            }
            else if (conservationreceicer != null)
            {
                return Content("Receiver");
            }
            return Content("Error");
        }

        // POST: api/Messegers  
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754  
        [HttpPost]
        public async Task<ActionResult<Conversation>> PostMesseger(CreateMessageRequest request)
        {
            var id = 0;
            var consevation = _context.Conversations.Where(a => a.UserIdOne == request.SenderId && a.UserIdTwo == request.ReceiverId).FirstOrDefault();
            var consevation2 = _context.Conversations.Where(a => a.UserIdOne == request.ReceiverId && a.UserIdTwo == request.SenderId).FirstOrDefault();

            if (consevation == null)
            {
                if(consevation2 == null)
                {
                    Conversation conversation = new Conversation();
                    conversation.UserIdOne = request.SenderId;
                    conversation.UserIdTwo = request.ReceiverId;
                    _context.Conversations.Add(conversation);
                    await _context.SaveChangesAsync();

                    id = conversation.Id;
                }
                else
                {
                    id = consevation.Id;
                }
            }
            else
            {
                id = consevation.Id;
            }

            var notification = _context.Notifications.Where(a => a.UserSender == request.SenderId && a.UserReceiver == request.ReceiverId).FirstOrDefault();
            var notification2 = _context.Notifications.Where(a => a.UserSender == request.ReceiverId && a.UserReceiver == request.SenderId).FirstOrDefault();

            if (notification == null)
            {
                if(notification2 == null)
                {
                    Notification n = new Notification();
                    n.UserReceiver = request.ReceiverId;
                    n.SeeReceiver = false;

                    n.UserSender = request.SenderId;
                    n.SeeSender = true;
                    n.ConversationId = id;
                    _context.Notifications.Add(n);
                }
                else
                {
                    notification.SeeSender = false;
                    _context.Entry(notification).State = EntityState.Modified;
                }
            }
            else
            {
                notification.SeeReceiver = false;
                _context.Entry(notification).State = EntityState.Modified;
            }

            Messeger messeger = new Messeger();
            messeger.Message = request.Content;
            messeger.Date = DateTime.Now;
            messeger.ConversationId = id;
            messeger.UserId = request.SenderId;
            _context.Messegers.Add(messeger);

            try
            {
                await _context.SaveChangesAsync();
                await _hubContext.Clients.All.BroadcastMessage();
            }
            catch (DbUpdateException)
            {
                throw;
            }

            return Ok(new { Message = "Request complete!" });
        }


        // GET: api/Messegers/GetChatUser 
        [HttpGet]
        [Route("GetChatUser/{id}")]
        public async Task<ActionResult<List<ChatUserViewModel>>> GetChatUser(string id)
        {
            ///one sender two receiver
            var user = _context.Users.ToList();

            List<ChatUserViewModel> final = new List<ChatUserViewModel>();
            var conservation1 = _context.Conversations.Include(a => a.Messegers).Where(a => a.UserIdOne == Int32.Parse(id)).ToList();

            var conservation2 = _context.Conversations.Include(a => a.Messegers).Where(a => a.UserIdTwo == Int32.Parse(id)).ToList();

            if (conservation1 != null)
            {
                var data = conservation1.Select(a => new ChatUserViewModel
                {
                    IdSender = a.UserIdOne,
                    IdReceiver = a.UserIdTwo,
                    HovaTen = user.Where(b => b.Id == a.UserIdTwo).FirstOrDefault().HovaTen,
                    Image = user.Where(b => b.Id == a.UserIdTwo).FirstOrDefault().UserImage,
                    Messeger = a.Messegers.FirstOrDefault().Message,
                    Date = a.Messegers.FirstOrDefault().Date,
                    Click = a.Id.ToString(),
                    Active = ""
                }).ToList();
                final.AddRange(data);
            }


            if (conservation2 != null)
            {
                var data2 = conservation2.Select(a => new ChatUserViewModel
                {
                    IdSender = a.UserIdTwo,
                    IdReceiver = a.UserIdOne,
                    HovaTen = user.Where(b => b.Id == a.UserIdOne).FirstOrDefault().HovaTen,
                    Image = user.Where(b => b.Id == a.UserIdOne).FirstOrDefault().UserImage,
                    Messeger = a.Messegers.FirstOrDefault().Message,
                    Date = a.Messegers.FirstOrDefault().Date,
                    Click = a.Id.ToString()
                }).ToList();
                final.AddRange(data2);
            }
           

            return final;
        }
    }
}
