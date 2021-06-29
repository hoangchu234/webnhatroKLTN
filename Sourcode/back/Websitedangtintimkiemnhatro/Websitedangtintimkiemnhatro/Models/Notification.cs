using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Websitedangtintimkiemnhatro.Models
{
    public class Notification
    {
        [Key]
        public int Id { get; set; }
        public int UserReceiver { get; set; }
        public bool SeeReceiver { get; set; }
        public int UserSender { get; set; }
        public bool SeeSender { get; set; }
        public Conversation Conversation { get; set; }
        [ForeignKey("ConversationId")]
        [Required]
        public int ConversationId { get; set; }
    }
}
