using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Websitedangtintimkiemnhatro.Models
{
    public class Account
    {
        [Key]
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Phone { get; set; }
        public bool IsActive { get; set; }
        public bool IsHD { get; set; }
        public Role Role { get; set; }
        [ForeignKey("RoleId")]
        [Required]
        public int RoleId { get; set; }
        public Employee Employee { get; set; }
        public User User { get; set; }
    }
}
