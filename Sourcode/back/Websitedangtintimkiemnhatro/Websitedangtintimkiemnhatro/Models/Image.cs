using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Websitedangtintimkiemnhatro.Models
{
    public class Image
    {
        [Key]
        public int Id { get; set; }
        public string ImageMotel { get; set; }
        public Motel Motel { get; set; }
        [ForeignKey("MotelId")]
        [Required]
        public int MotelId { get; set; }
    }
}
