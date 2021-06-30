using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Websitedangtintimkiemnhatro.Models
{
    public class Reply
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Decription { get; set; }
        public bool IsSee { get; set; }
        public User User { get; set; }
        [ForeignKey("UserId")]
        [Required]
        public int UserId { get; set; }
    }
}
