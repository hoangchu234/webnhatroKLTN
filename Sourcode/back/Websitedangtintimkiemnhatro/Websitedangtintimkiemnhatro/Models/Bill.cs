using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Websitedangtintimkiemnhatro.Models
{
    public class Bill
    {
        [Key]
        public int Id { get; set; }
        public string TimeChoice { get; set; }
        public int NumberDatePublish { get; set; }
        public float PayMoney { get; set; }
        public Motel Motel { get; set; }
        [ForeignKey("MotelId")]
        [Required]
        public int MotelId { get; set; }

    }
}
