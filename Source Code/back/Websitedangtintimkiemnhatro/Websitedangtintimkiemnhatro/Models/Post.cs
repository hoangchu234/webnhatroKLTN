using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Websitedangtintimkiemnhatro.Models
{
    public class Post
    {
        [Key]
        public int Id { get; set; }
        public string PostUser { get; set; }
        public DateTime CreateDate { get; set; }
        public Boolean HiddenOrNotHidden { get; set; }
        public User User { get; set; }
        [ForeignKey("UserId")]
        [Required]
        public int UserId { get; set; }
        public ICollection<Comment> Comments { get; set; }
        public ICollection<ReportPost> ReportPosts { get; set; }
    }
}
