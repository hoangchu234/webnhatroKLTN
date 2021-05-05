using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Websitedangtintimkiemnhatro.Models;

namespace Websitedangtintimkiemnhatro.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SmsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public SmsController(ApplicationDbContext context)
        {
            _context = context;
        }
        public IConfiguration Configuration { get; set; }
        public SmsController(IConfiguration config)
        {
            Configuration = config;
        }

        //[HttpPost]
        //public async Task<ActionResult<SMSUser> PostSMSUser(Models.SmsModel sendSmsModel)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        try
        //        {
        //            var VONAGE_API_KEY = Configuration["VONAGE_API_KEY"];
        //            var VONAGE_API_SECRET = Configuration["VONAGE_API_SECRET"];
        //            var credentials = Credentials.FromApiKeyAndSecret(VONAGE_API_KEY, VONAGE_API_SECRET);
        //            var client = new SmsClient(credentials);
        //            var request = new SendSmsRequest { To = sendSmsModel.To, From = sendSmsModel.From, Text = sendSmsModel.Text };
        //            var response = client.SendAnSms(request);
        //            ViewBag.MessageId = response.Messages[0].MessageId;
        //        }
        //        catch (VonageSmsResponseException ex)
        //        {
        //            ViewBag.Error = ex.Message;
        //        }
        //    }
        //    return View("Index");
        //}

        [HttpPost]
        public async Task<ActionResult<SMSUser>> PostSMSUser(SMSUser sendSmsModel)
        {
            var VONAGE_API_KEY = Configuration["AccountSid"];
            var VONAGE_API_SECRET = Configuration["AuthToken"];
            var credentials = Credentials.FromApiKeyAndSecret(VONAGE_API_KEY, VONAGE_API_SECRET);
            var request = new SendSmsRequest { To = sendSmsModel.To, From = sendSmsModel.From, Text = sendSmsModel.Text };
            var response = client.SendAnSms(request);

            _context.SMSUsers.Add(sendSmsModel);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (SMSUserExists(sendSmsModel.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return sendSmsModel;
        }
        private bool SMSUserExists(int id)
        {
            return _context.SMSUsers.Any(e => e.Id == id);
        }
    }
}
