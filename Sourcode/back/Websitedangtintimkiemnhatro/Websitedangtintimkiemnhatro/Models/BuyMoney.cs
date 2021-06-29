using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Websitedangtintimkiemnhatro.Models
{
    public class BuyMoney
    {
        [Key]
        public int Id { get; set; }
        public string IdBuy { get; set; }
        public string Method { get; set; }
        public float NumberMoney { get; set; }
        public float Promote { get; set; }
        public float Receive { get; set; }
        public bool Status { get; set; }
        public string Note { get; set; }
        public User User { get; set; }
        [ForeignKey("UserId")]
        [Required]
        public int UserId { get; set; }
    }
}
