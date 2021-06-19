using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Websitedangtintimkiemnhatro.ViewModels
{
    public class CreateMessageRequest
    {
        public int SenderId { get; set; }
        public int ReceiverId { get; set; }
        public string Content { get; set; }
    }
}
