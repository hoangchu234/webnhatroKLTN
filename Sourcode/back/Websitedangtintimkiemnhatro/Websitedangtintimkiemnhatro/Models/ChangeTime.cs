using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Websitedangtintimkiemnhatro.Models
{
    public class ChangeTime
    {
        [Key]
        public int Id { get; set; }
        public string ChangeTimeName { get; set; }
        public Time Time { get; set; }
        [ForeignKey("TimeId")]
        [Required]
        public int TimeId { get; set; }

    }
}
