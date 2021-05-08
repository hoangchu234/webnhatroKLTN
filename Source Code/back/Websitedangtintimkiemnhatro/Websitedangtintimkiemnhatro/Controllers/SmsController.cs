using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Twilio;
using Twilio.Clients;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;
using Websitedangtintimkiemnhatro.Models;
using Websitedangtintimkiemnhatro.Services;

namespace Websitedangtintimkiemnhatro.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SmsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ITwilioRestClient _client;

        public SmsController(ApplicationDbContext context, ITwilioRestClient client)
        {
            _context = context;
            _client = client;
        }

        [HttpPost]
        public IActionResult SendSms(SMSoptions model)
        {
            string accountSid = Environment.GetEnvironmentVariable("AccountSid");
            string authToken = Environment.GetEnvironmentVariable("AuthToken");

            TwilioClient.Init(accountSid, authToken);
            var message = MessageResource.Create(
                body: "Join Earth's mightiest heroes. Like Kevin Bacon.",
                from: new Twilio.Types.PhoneNumber(model.From),
                to: new Twilio.Types.PhoneNumber(model.To)
            );

            return Ok(message.Sid);
        }

        //[HttpPost]
        //public async Task<ActionResult<SMSUser>> PostSMSUser(SMSUser sendSmsModel)
        //{
        //    string accountSid = Environment.GetEnvironmentVariable("AccountSid");
        //    string authToken = Environment.GetEnvironmentVariable("AuthToken");

        //    TwilioClient.Init(accountSid, authToken);

        //    var message = MessageResource.Create(
        //        from: new Twilio.Types.PhoneNumber(sendSmsModel.phone),
        //        body: sendSmsModel.sms,
        //        to: new Twilio.Types.PhoneNumber(sendSmsModel.phone)
        //    );

       
        //    _context.SMSUsers.Add(sendSmsModel);

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateException)
        //    {
        //        if (SMSUserExists(sendSmsModel.Id))
        //        {
        //            return Conflict();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return sendSmsModel;
        //}
        //private bool SMSUserExists(int id)
        //{
        //    return _context.SMSUsers.Any(e => e.Id == id);
        //}
    }
}
