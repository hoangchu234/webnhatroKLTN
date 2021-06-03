using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Websitedangtintimkiemnhatro.Models
{
    public class Conversation
    {
        [Key]
        public int Id { get; set; }
        public int UserIdOne { get; set; }
        public int UserIdTwo { get; set; }
        public ICollection<Messeger> Messegers { get; set; }
    }
}
