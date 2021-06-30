using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Websitedangtintimkiemnhatro.ViewModels
{
    public class NotificationResult
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int MessegerId { get; set; }
        public string Messeger { get; set; }
        public string Sender { get; set; }
        public int Date { get; set; }
        public string Image { get; set; }
        public Boolean JustSee { get; set; }
    }
}
