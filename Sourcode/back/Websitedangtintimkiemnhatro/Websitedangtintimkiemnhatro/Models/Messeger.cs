using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Websitedangtintimkiemnhatro.Models
{
    public class Messeger
    {
        [Key]
        public int Id { get; set; }
        public string Type { get; set; }
        public string Message { get; set; }
        public DateTime Date { get; set; }
        public Boolean JustSee { get; set; }
        public User User { get; set; }
        [ForeignKey("UserId")]
        [Required]
        public int UserId { get; set; }
        public Conversation Conversation { get; set; }
        [ForeignKey("ConversationId")]
        [Required]
        public int ConversationId { get; set; }
    }
}
