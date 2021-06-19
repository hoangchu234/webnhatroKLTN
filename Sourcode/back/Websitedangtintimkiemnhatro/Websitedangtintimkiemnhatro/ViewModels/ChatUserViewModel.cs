using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Websitedangtintimkiemnhatro.ViewModels
{
    public class ChatUserViewModel
    {
        public int IdSender { get; set; }
        public int IdReceiver { get; set; }
        public string HovaTen { get; set; }
        public string Image { get; set; }
        public string Messeger { get; set; }
        public DateTime Date { get; set; }
        public string Click { get; set; }
        public string Active { get; set; }
    }
}
