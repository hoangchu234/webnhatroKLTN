using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Websitedangtintimkiemnhatro.Models
{
    public class ReportPost
    {
        [Key]
        public int Id { get; set; }
        public string Report { get; set; }
        public string? Write { get; set; }
        public Post Post { get; set; }
        [ForeignKey("PostId")]
        [Required]
        public int PostId { get; set; }
    }
}
