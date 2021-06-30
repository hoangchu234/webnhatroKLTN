using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Websitedangtintimkiemnhatro.Models
{
    public class Detail
    {
        [Key]
        public int Id { get; set; }
        public int NumberBath { get; set; }
        public int NumberLiving { get; set; }
        public string Director { get; set; }
        public Typeofnew Typeofnew { get; set; }
        [ForeignKey("TypeofnewId")]
        [Required]
        public int TypeofnewId { get; set; }
        public LiveType LiveType { get; set; }
        [ForeignKey("LiveTypeId")]
        [Required]
        public int LiveTypeId { get; set; }
        public Motel Motel { get; set; }
        [ForeignKey("MotelId")]
        [Required]
        public int MotelId { get; set; }
    }
}
