using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Websitedangtintimkiemnhatro.Models;

namespace Websitedangtintimkiemnhatro.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MailsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MailsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // api/Mails/SendMail
        [HttpGet]
        [Route("SendMail/{to}/{subject}/{body}")]
        public async Task<ActionResult<Object>> SendMail( string to, string subject, string body)
        {

            // Tạo nội dung Email
            MailMessage message = new MailMessage(
                from: "hoang24051999@gmail.com",
                to: to,
                subject: subject,
                body: body
            );
            message.BodyEncoding = System.Text.Encoding.UTF8;
            message.SubjectEncoding = System.Text.Encoding.UTF8;
            message.IsBodyHtml = true;

            message.ReplyToList.Add(new MailAddress("hoang24051999@gmail.com"));
            message.Sender = new MailAddress("hoang24051999@gmail.com");

            using var smtpClient = new SmtpClient("smtp.gmail.com");

            smtpClient.Port = 587;
            smtpClient.EnableSsl = true;
            smtpClient.Credentials = new NetworkCredential("hoang24051999@gmail.com", "Chu01635990015");

            try
            {
                await smtpClient.SendMailAsync(message);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }
    }
}
