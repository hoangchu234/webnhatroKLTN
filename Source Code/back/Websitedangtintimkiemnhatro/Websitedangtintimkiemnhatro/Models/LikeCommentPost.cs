using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Websitedangtintimkiemnhatro.Models
{
    public class LikeCommentPost
    {
        [Key]
        public int Id { get; set; }
        public Boolean Like { get; set; }
        public int? IdPost { get; set; }
        public int? IdCommnent { get; set; }
        public User User { get; set; }
        [ForeignKey("UserId")]
        [Required]
        public int UserId { get; set; }
    }
}
