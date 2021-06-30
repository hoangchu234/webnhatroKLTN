using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Websitedangtintimkiemnhatro.Models
{
    public class Comment
    {
        [Key]
        public int Id { get; set; }
        public string CommentUser { get; set; }
        public DateTime CreateDate { get; set; }
        public User User { get; set; }
        [ForeignKey("UserId")]
        [Required]
        public int UserId { get; set; }
        public Post Post { get; set; }
        [ForeignKey("PostId")]
        [Required]
        public int PostId { get; set; }

        public Comment ParentComment { get; set; }
        public int? ParentCommentId { get; set; }
        public ICollection<Comment> ChildComments { get; set; }
        public ICollection<InformComment> InformComments { get; set; }

    }
}
