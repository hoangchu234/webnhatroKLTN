using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Websitedangtintimkiemnhatro.Models
{
    public class InformComment
    {
        [Key]
        public int Id { get; set; }
        public int? IdUserReceiced { get; set; }
        public Boolean JustSee { get; set; }
        public Comment Comment { get; set; }
        [ForeignKey("CommentId")]
        [Required]
        public int CommentId { get; set; }
    }
}
